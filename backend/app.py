from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from db_instance import db
from routes import api

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Configure your SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotels.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'super-secret-key'  
app.config['PROPAGATE_EXCEPTIONS'] = True  

# Initialize DB and JWT
db.init_app(app)
jwt = JWTManager(app)

# Register your blueprint
app.register_blueprint(api)

# Automatically create tables on first run
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    @app.errorhandler(422)
    def handle_unprocessable_entity(err):
        return {'message': 'Invalid input. Make sure your JSON is correct.'}, 422
    app.run(debug=True)
