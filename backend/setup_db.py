from app import app
from db_instance import db
from db_models import User, Hotel, Bookmark

with app.app_context():
    db.drop_all()
    db.create_all()
    print("✅ Database and all tables created.")
