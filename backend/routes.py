from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from db_instance import db
from db_models import User, Hotel, Bookmark
import json

api = Blueprint('api', __name__)

# ✅ Register
@api.route('/api/register', methods=['POST'])
def register():
    data = request.get_json(force=True)
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password are required.'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 409

    user = User(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 200

# ✅ Login
@api.route('/api/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password are required.'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({'token': token}), 200

# ✅ Get Hotels (with filters)
@api.route('/api/hotels', methods=['GET'])
def get_hotels():
    query = Hotel.query
    location = request.args.get('location')
    star_rating = request.args.get('star_rating')
    pool_available = request.args.get('pool_available')

    if location:
        query = query.filter(Hotel.location.ilike(f"%{location}%"))
    if star_rating:
        query = query.filter_by(star_rating=int(star_rating))
    if pool_available == 'yes':
        query = query.filter_by(pool_available=True)
    elif pool_available == 'no':
        query = query.filter_by(pool_available=False)

    hotels = query.all()
    return jsonify({
        'hotels': [{
            'id': h.id,
            'name': h.name,
            'location': h.location,
            'description': h.description,
            'star_rating': h.star_rating,
            'pool_available': h.pool_available,
            'price': h.price
        } for h in hotels]
    })

# ✅ Bookmark Hotel
@api.route('/api/bookmark', methods=['POST'])
@jwt_required()
def bookmark_hotel():
    user_id = int(get_jwt_identity())

    try:
        if request.is_json:
            data = request.get_json(force=True)
        else:
            data = json.loads(request.data)
    except Exception as e:
        print("Failed to parse request data:", e)
        return jsonify({'message': 'Invalid JSON format'}), 400

    if not data or 'hotel_id' not in data:
        print("Missing hotel_id in:", data)
        return jsonify({'message': 'Hotel ID required'}), 400

    hotel_id = data['hotel_id']

    if Bookmark.query.filter_by(user_id=user_id, hotel_id=hotel_id).first():
        return jsonify({'message': 'Already bookmarked'}), 409

    new_bookmark = Bookmark(user_id=user_id, hotel_id=hotel_id)
    db.session.add(new_bookmark)
    db.session.commit()
    return jsonify({'message': 'Hotel bookmarked'}), 201

# ✅ Get Bookmarks
@api.route('/api/bookmarks', methods=['GET'])
@jwt_required()
def get_bookmarks():
    user_id = int(get_jwt_identity())
    bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
    hotel_ids = [bm.hotel_id for bm in bookmarks]
    hotels = Hotel.query.filter(Hotel.id.in_(hotel_ids)).all()

    return jsonify({
        'bookmarked_hotels': [{
            'id': h.id,
            'name': h.name,
            'location': h.location,
            'description': h.description,
            'star_rating': h.star_rating,
            'pool_available': h.pool_available,
            'price': h.price
        } for h in hotels]
    })
