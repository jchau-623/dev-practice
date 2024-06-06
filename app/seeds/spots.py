from app.models import db, Spot
from faker import Faker

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
            image_url='http://ig-clone-bucket.s3.amazonaws.com/seeds/8120c8697c5d41f4a5ec4abf37c30c53.jpeg',
        ),
        Spot(
            name='Mountain Retreat',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='A cozy retreat in the mountains, perfect for nature lovers.',
            price=150.00,
            image_url='http://ig-clone-bucket.s3.amazonaws.com/seeds/8120c8697c5d41f4a5ec4abf37c30c53.jpeg',
        ),
        Spot(
            name='Urban Apartment',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='A modern apartment in the heart of the city.',
            price=250.00,
            image_url='http://ig-clone-bucket.s3.amazonaws.com/seeds/8120c8697c5d41f4a5ec4abf37c30c53.jpeg',
        ),
        Spot(
            name='Beachside Bungalow',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='A charming bungalow steps away from the beach.',
            price=300.00,
            image_url='http://ig-clone-bucket.s3.amazonaws.com/seeds/8120c8697c5d41f4a5ec4abf37c30c53.jpeg',
        ),
    ]
    for spot in spots:
        db.session.add(spot)
    db.session.commit()


def undo_spots():
    db.session.execute('TRUNCATE spots RESTART IDENTITY CASCADE;')
    db.session.commit()
