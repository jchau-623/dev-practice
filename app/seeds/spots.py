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
            description='Welcome to The Good Place - our newly renovated lakefront home with  spectacular panoramic water views from the moment you walk in!  .',
            price=400.00,
            image_urls=[
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview1.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview2.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview3.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview4.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview5.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview6.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview7.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview8.webp',
                'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/lakeview9.webp',
            ],
            num_bedrooms=5,
            num_bathrooms=7,
            max_guests=12,
            amenities=['Lakeview, WiFi', 'Air conditioning', 'Kitchen', 'Washer', 'Dryer'],
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
            description='A serene retreat perched on a bluff at the top of Blue Mountain. Amidst unforgettable views and wildlife on your private 4 acres, you can enjoy soaking in a wood-fired hot tub, cozy up to a fire, and explore nearby hiking trails and wineries.  The perfect place to unwind and reconnect to each other and the outdoors. Welcome to Doah House.',
            price=450.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain1.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain2.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain3.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain4.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain5.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain6.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain7.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain8.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain9.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain10.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain11.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain12.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain13.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain14.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain15.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain16.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain17.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain18.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain19.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain20.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain21.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain22.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain23.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/mountain24.webp',
                        ],
            num_bedrooms=1,
            num_bathrooms=2.0,
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
            description='Local spots to visit include the Vanderbilt Mansion and Planetarium, Caumsett State Park Preserve, Del Vino Vineyards, Paramount Theatre, Downtown Huntington, Northport Main Street shops and restaurants, and more!',
            price=600.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city1.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city2.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city3.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city4.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city5.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city6.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city7.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city8.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city9.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city10.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city11.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city12.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city13.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city14.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city15.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/city16.webp',
                        ],
            num_bedrooms=1,
            num_bathrooms=1.5,
            max_guests=4,
            amenities=['Harbor view, Beach access - Beachfront, WiFi', 'Air conditioning', 'Kitchen', 'Free parking'],
            house_rules='No smoking. No pets. Quiet hours after 10 PM.',
            availability={
                "2023-06-01": "available",
                "2023-06-02": "available",
                "2023-06-03": "booked",
                # Add more dates as needed
            },
            latitude=34.0522,
            longitude=-118.2437,
            rating=4.93,
            num_reviews=123
        ),
        Spot(
            name='Beachside Mansion',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='Escape to our glamorous Westhampton oceanfront beach house, where the mesmerizing views from each room can be seen from all around the house. Our passion is to become Your Home Away From Home.',
            price=1450.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach1.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach2.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach3.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach4.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach5.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach6.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach7.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach8.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach9.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach10.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach11.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach12.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach13.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/beach14.webp',
                        ],
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
        Spot(
            name='*Heated Pool Open* Garrison Modern 5B hottub sauna',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='Secluded, luxurious 5Br/3.5Bth home an hour from NYC, nested on a 9-acre property with the Appalachian trail running through. Modern-rustic design, floor-to-ceiling windows, custom kitchen, state-of-the-art appliances, balconies. Dip in the heated pool (seasonal) or the hot tub, sauna, dine alfresco from the BBQ and watch the stars. Guests can enjoy morning coffee on the private deck or evening cocoa in front of the wood-burning fireplace or the fire pit, outside, overlooking a private pond.',
            price=1400.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern1.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern2.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern3.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern4.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern5.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern6.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern7.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern8.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern9.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern10.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern11.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern12.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern13.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern14.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern15.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern16.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern17.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern18.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern19.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern20.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern21.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern22.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern23.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/modern24.webp'
                        ],
            num_bedrooms=5,
            num_bathrooms=7.0,
            max_guests=14,
            amenities=['Waterfront, Wifi, Private outdoor pool, Kitchen, Free parking, TV, Washer, Dryer'],
            house_rules='No smoking. No parties or events.',
            availability={
                "2023-06-01": "available",
                "2023-06-02": "booked",
                "2023-06-03": "available",
                # Add more dates as needed
            },
            latitude=37.7512,
            longitude=-104.4129,
            rating=4.98,
            num_reviews=119
        ),
             Spot(
            name='Designer Dream',
            user_id=1,
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            description='This architectural wonder with panoramic views and circular design offers seamless integration with nature. Inside, the main level offers open concept living, sunken lounge  and dining for 10, with radiant heat  & central air to ensure  your comfort. ',
            price=950.00,
            image_urls=['https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design1.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design2.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design3.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design4.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design5.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design6.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design7.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design8.webp',
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design9.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design10.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design11.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design12.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design13.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design14.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design15.webp'
                        'https://airbnbclone-bucket.s3.amazonaws.com/airbnb/design16.webp'
                        ],
            num_bedrooms=4,
            num_bathrooms=4.0,
            max_guests=8,
            amenities=['55 inch TV with Disney+, Wifi, Dedicated workspace, Kitchen, Free parking, TV, Washer, Dryer'],
            house_rules='No smoking. No parties or events.',
            availability={
                "2023-06-01": "available",
                "2023-06-02": "booked",
                "2023-06-03": "available",
                # Add more dates as needed
            },
            latitude=23.1232,
            longitude=-432.123,
            rating=4.91,
            num_reviews=11
        ),
    ]

    for spot in spots:
        db.session.add(spot)
    db.session.commit()

def undo_spots():
    db.session.execute(text('TRUNCATE spots RESTART IDENTITY CASCADE;'))
    db.session.commit()
