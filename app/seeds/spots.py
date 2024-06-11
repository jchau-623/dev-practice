from app.models import db, Spot
from faker import Faker
from sqlalchemy import text

fake = Faker()

def seed_spots():
    spots = [
        Spot(
            name='Lakeview Expanse',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='A beautiful house with a stunning lake view.',
            price=200.00,
            image_urls=[
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test1.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test2.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test3.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test4.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test5.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test6.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test7.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test8.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/1test9.webp',
            ],
            num_bedrooms=3,
            num_bathrooms=2.5,
            max_guests=6,
            amenities=['WiFi', 'Air conditioning', 'Kitchen', 'Washer', 'Dryer'],
            house_rules='No smoking. No pets. No parties or events.',
            availability={
                "2023-06-01": "available",
                "2023-06-02": "booked",
                "2023-06-03": "available",
                # Add more dates as needed
            },
            latitude=37.7749,
            longitude=-122.4194,
            rating=4.8,
            num_reviews=120
        ),
        Spot(
            name='Mountain Retreat',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='A cozy retreat in the mountains, perfect for nature lovers.',
            price=150.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/2test1.webp'],
            num_bedrooms=2,
            num_bathrooms=1.0,
            max_guests=4,
            amenities=['Fireplace', 'WiFi', 'Hot tub', 'Kitchen'],
            house_rules='No smoking. Pets allowed.',
            availability={
                "2023-06-01": "booked",
                "2023-06-02": "available",
                "2023-06-03": "booked",
                # Add more dates as needed
            },
            latitude=39.7392,
            longitude=-104.9903,
            rating=4.6,
            num_reviews=75
        ),
        Spot(
            name='Urban Apartment',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='A modern apartment in the heart of the city.',
            price=250.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/3test1.webp'],
            num_bedrooms=1,
            num_bathrooms=1.0,
            max_guests=2,
            amenities=['WiFi', 'Air conditioning', 'Kitchen', 'Gym'],
            house_rules='No smoking. No pets. Quiet hours after 10 PM.',
            availability={
                "2023-06-01": "available",
                "2023-06-02": "available",
                "2023-06-03": "booked",
                # Add more dates as needed
            },
            latitude=34.0522,
            longitude=-118.2437,
            rating=4.9,
            num_reviews=150
        ),
        Spot(
            name='Beachside Bungalow',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='A charming bungalow steps away from the beach.',
            price=300.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/4test1.webp'],
            num_bedrooms=2,
            num_bathrooms=2.0,
            max_guests=5,
            amenities=['Beachfront', 'WiFi', 'Air conditioning', 'Kitchen', 'Outdoor shower'],
            house_rules='No smoking. No parties or events.',
            availability={
                "2023-06-01": "available",
                "2023-06-02": "booked",
                "2023-06-03": "available",
                # Add more dates as needed
            },
            latitude=36.7783,
            longitude=-119.4179,
            rating=4.7,
            num_reviews=85
        ),
    ]

    for spot in spots:
        db.session.add(spot)
    db.session.commit()

def undo_spots():
    db.session.execute(text('TRUNCATE spots RESTART IDENTITY CASCADE;'))
    db.session.commit()
