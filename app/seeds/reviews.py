from app.models import db, Review

def seed_reviews():
    reviews = [
        Review(
            rating=5,
            comment='An amazing experience with breathtaking views!',
            spot_id=1,
            user_id=2
        ),
        Review(
            rating=4,
            comment='Very comfortable and clean. Highly recommend!',
            spot_id=1,
            user_id=3
        ),
        Review(
            rating=3,
            comment='The place was okay, but not as expected.',
            spot_id=2,
            user_id=1
        ),
        Review(
            rating=5,
            comment='Absolutely loved this spot! Will visit again.',
            spot_id=2,
            user_id=3
        ),
        Review(
            rating=4,
            comment='Great location and amenities, but a bit pricey.',
            spot_id=3,
            user_id=4
        ),
        Review(
            rating=2,
            comment='Not very clean and had some maintenance issues.',
            spot_id=3,
            user_id=5
        ),
        Review(
            rating=5,
            comment='Perfect place for a family vacation. Kids loved it!',
            spot_id=4,
            user_id=1
        ),
        Review(
            rating=3,
            comment='Good place but had some issues with the WiFi.',
            spot_id=4,
            user_id=5
        ),
        Review(
            rating=5,
            comment='The host was very accommodating and the place was spotless.',
            spot_id=5,
            user_id=1
        ),
        Review(
            rating=4,
            comment='Beautiful spot with amazing views. Will come again.',
            spot_id=5,
            user_id=2
        ),
        Review(
            rating=4,
            comment='Very quiet and serene. A great getaway.',
            spot_id=6,
            user_id=3
        ),
        Review(
            rating=3,
            comment='The place was decent but could use some upgrades.',
            spot_id=6,
            user_id=4
        ),
        Review(
            rating=5,
            comment='The best vacation spot I have ever visited!',
            spot_id=1,
            user_id=4
        ),
        Review(
            rating=4,
            comment='Loved the outdoor space and the amenities.',
            spot_id=2,
            user_id=5
        ),
        Review(
            rating=5,
            comment='Fantastic location and very cozy.',
            spot_id=3,
            user_id=1
        ),
        Review(
            rating=4,
            comment='Great for a weekend getaway. Very peaceful.',
            spot_id=4,
            user_id=2
        ),
        Review(
            rating=3,
            comment='Average experience. Expected more for the price.',
            spot_id=5,
            user_id=3
        ),
        Review(
            rating=5,
            comment='An unforgettable stay! Highly recommend.',
            spot_id=6,
            user_id=5
        ),
        Review(
            rating=4,
            comment='Lovely place with all the necessary amenities.',
            spot_id=1,
            user_id=3
        ),
        Review(
            rating=5,
            comment='Exceeded my expectations in every way.',
            spot_id=2,
            user_id=4
        ),
        Review(
            rating=2,
            comment='Not worth the price. Disappointed.',
            spot_id=3,
            user_id=2
        ),
        Review(
            rating=4,
            comment='Very spacious and well-decorated.',
            spot_id=4,
            user_id=5
        ),
        Review(
            rating=5,
            comment='The host was wonderful and very helpful.',
            spot_id=5,
            user_id=3
        ),
        Review(
            rating=3,
            comment='Good location but noisy neighborhood.',
            spot_id=6,
            user_id=1
        ),
        Review(
            rating=4,
            comment='Nice place with comfortable beds.',
            spot_id=1,
            user_id=5
        ),
        Review(
            rating=5,
            comment='I loved the design and the comfort.',
            spot_id=2,
            user_id=1
        ),
        Review(
            rating=4,
            comment='Great amenities and beautiful decor.',
            spot_id=3,
            user_id=4
        ),
        Review(
            rating=5,
            comment='A true gem! Will book again.',
            spot_id=4,
            user_id=3
        ),
        Review(
            rating=3,
            comment='Decent place but had some issues with cleanliness.',
            spot_id=5,
            user_id=4
        ),
        Review(
            rating=4,
            comment='Lovely area and very comfortable stay.',
            spot_id=6,
            user_id=2
        ),
        Review(
            rating=5,
            comment='Perfect for a relaxing holiday.',
            spot_id=1,
            user_id=2
        ),
        Review(
            rating=4,
            comment='Nice view and quiet neighborhood.',
            spot_id=2,
            user_id=3
        ),
        Review(
            rating=3,
            comment='Good amenities but needs some maintenance.',
            spot_id=3,
            user_id=5
        ),
        Review(
            rating=5,
            comment='Fantastic spot, will definitely return.',
            spot_id=4,
            user_id=1
        ),
        Review(
            rating=4,
            comment='Beautiful house with great features.',
            spot_id=5,
            user_id=2
        ),
        Review(
            rating=3,
            comment='Average stay, not much to highlight.',
            spot_id=6,
            user_id=3
        ),
        Review(
            rating=5,
            comment='A wonderful experience overall.',
            spot_id=1,
            user_id=4
        ),
    ]

    for review in reviews:
        db.session.add(review)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
