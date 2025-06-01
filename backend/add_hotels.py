from db_instance import db
from db_models import Hotel
from app import app

with app.app_context():
    hotels = [
        # Dhaka Division
        Hotel(name="Hotel Sarina", location="Dhaka", description="Luxury hotel in Dhaka with rooftop pool.", star_rating=5, pool_available=True, price=8500),
        Hotel(name="The Westin Dhaka", location="Dhaka", description="Upscale hotel with fitness and pool.", star_rating=5, pool_available=True, price=12000),
        Hotel(name="Pan Pacific Sonargaon", location="Dhaka", description="Elegant stay with Bangladeshi hospitality.", star_rating=5, pool_available=True, price=11000),

        # Chittagong Division
        Hotel(name="Radisson Blu Chattogram", location="Chittagong", description="Modern hotel overlooking the Karnaphuli River.", star_rating=5, pool_available=True, price=10000),
        Hotel(name="Well Park Residence", location="Chittagong", description="Comfortable stay in Chittagong city.", star_rating=4, pool_available=False, price=4500),

        # Cox's Bazar
        Hotel(name="Sayeman Beach Resort", location="Cox's Bazar", description="Beachside resort with stunning views.", star_rating=5, pool_available=True, price=9000),
        Hotel(name="Hotel Sea Palace", location="Cox's Bazar", description="Popular seaside hotel with family amenities.", star_rating=4, pool_available=True, price=6500),

        # Kuakata
        Hotel(name="Kuakata Grand Hotel", location="Kuakata", description="Seaside retreat near the beach.", star_rating=4, pool_available=True, price=6000),
        Hotel(name="Hotel Graver Inn", location="Kuakata", description="Affordable stay with modern facilities.", star_rating=3, pool_available=False, price=3000),

        # Sylhet
        Hotel(name="Rose View Hotel", location="Sylhet", description="Premium hotel in Sylhet city.", star_rating=4, pool_available=True, price=7000),
        Hotel(name="Hotel Noorjahan Grand", location="Sylhet", description="Budget-friendly hotel with good service.", star_rating=3, pool_available=False, price=2500),

        # Khulna
        Hotel(name="Tiger Garden Hotel", location="Khulna", description="Centrally located hotel in Khulna.", star_rating=3, pool_available=False, price=3500),
        Hotel(name="Hotel City Inn", location="Khulna", description="Modern hotel with comfortable rooms.", star_rating=4, pool_available=True, price=5000),

        # Barishal
        Hotel(name="Hotel Grand Park", location="Barishal", description="Top hotel in Barishal with great views.", star_rating=4, pool_available=False, price=5500),
        Hotel(name="Hotel Athena International", location="Barishal", description="Decent budget hotel in town.", star_rating=3, pool_available=False, price=2800),

        # Rajshahi
        Hotel(name="Hotel Nice International", location="Rajshahi", description="Comfortable rooms in central Rajshahi.", star_rating=3, pool_available=False, price=3200),
        Hotel(name="Hotel Warisan", location="Rajshahi", description="Family-friendly stay near university area.", star_rating=4, pool_available=False, price=4200),

        # Rangpur
        Hotel(name="Hotel North View", location="Rangpur", description="Well-rated stay in Rangpur town.", star_rating=3, pool_available=False, price=3000),
        Hotel(name="Hotel Golden Tower", location="Rangpur", description="Nice hotel with basic amenities.", star_rating=4, pool_available=True, price=4000),

        # Mymensingh
        Hotel(name="Hotel Amir International", location="Mymensingh", description="Best choice for business travelers.", star_rating=4, pool_available=False, price=4800),
        Hotel(name="Hotel Mustafiz", location="Mymensingh", description="Simple stay at affordable price.", star_rating=3, pool_available=False, price=2200),

        # Extra entries for realism
        Hotel(name="Executive Inn", location="Dhaka", description="Business hotel in Uttara.", star_rating=3, pool_available=False, price=3500),
        Hotel(name="Hotel Tropical Daisy", location="Dhaka", description="Affordable boutique hotel in Gulshan.", star_rating=3, pool_available=False, price=3200),
        Hotel(name="Richmond Hotel & Suites", location="Dhaka", description="Close to Dhaka airport with shuttle service.", star_rating=4, pool_available=False, price=4800),
        Hotel(name="Hotel Lake Castle", location="Dhaka", description="Overlooking Gulshan Lake with modern comforts.", star_rating=4, pool_available=False, price=6000),
        Hotel(name="Platinum Grand", location="Dhaka", description="Grand comfort and conference facilities.", star_rating=4, pool_available=True, price=7200),
        Hotel(name="The Olives", location="Dhaka", description="Serviced apartments for extended stays.", star_rating=4, pool_available=False, price=6300),
        Hotel(name="Hotel De Castle", location="Dhaka", description="Castle-themed rooms in Banani.", star_rating=3, pool_available=False, price=3100),
        Hotel(name="Grand Palace Hotel", location="Sylhet", description="Elegant hotel in the tea capital of Bangladesh.", star_rating=5, pool_available=True, price=9500),
        Hotel(name="Hotel Star Pacific", location="Sylhet", description="Affordable stay with rooftop dining.", star_rating=4, pool_available=False, price=4200)
    ]

    inserted_count = 0
    for hotel in hotels:
        exists = Hotel.query.filter_by(name=hotel.name, location=hotel.location).first()
        if not exists:
            db.session.add(hotel)
            inserted_count += 1

    db.session.commit()
    print(f"✅ Inserted {inserted_count} new hotel(s).")
