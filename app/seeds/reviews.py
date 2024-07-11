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
            user_id=6
        ),
        Review(
            rating=3,
            comment='Good place but had some issues with the WiFi.',
            spot_id=4,
            user_id=7
        ),
        Review(
            rating=5,
            comment='The host was very accommodating and the place was spotless.',
            spot_id=5,
            user_id=8
        ),
        Review(
            rating=4,
            comment='Beautiful spot with amazing views. Will come again.',
            spot_id=5,
            user_id=9
        ),
        Review(
            rating=4,
            comment='Very quiet and serene. A great getaway.',
            spot_id=6,
            user_id=10
        ),
        Review(
            rating=3,
            comment='The place was decent but could use some upgrades.',
            spot_id=6,
            user_id=11
        ),
        Review(
            rating=5,
            comment='The best vacation spot I have ever visited!',
            spot_id=1,
            user_id=12
        ),
        Review(
            rating=4,
            comment='Loved the outdoor space and the amenities.',
            spot_id=2,
            user_id=10
        ),
        Review(
            rating=5,
            comment='Fantastic location and very cozy.',
            spot_id=3,
            user_id=11
        ),
        Review(
            rating=4,
            comment='Great for a weekend getaway. Very peaceful.',
            spot_id=4,
            user_id=9
        ),
        Review(
            rating=3,
            comment='Average experience. Expected more for the price.',
            spot_id=5,
            user_id=8
        ),
        Review(
            rating=5,
            comment='An unforgettable stay! Highly recommend.',
            spot_id=6,
            user_id=7
        ),
        Review(
            rating=4,
            comment='Lovely place with all the necessary amenities.',
            spot_id=1,
            user_id=6
        ),
        Review(
            rating=5,
            comment='Exceeded my expectations in every way.',
            spot_id=2,
            user_id=5
        ),
        Review(
            rating=2,
            comment='Not worth the price. Disappointed.',
            spot_id=3,
            user_id=4
        ),
        Review(
            rating=4,
            comment='Very spacious and well-decorated.',
            spot_id=4,
            user_id=3
        ),
        Review(
            rating=5,
            comment='The host was wonderful and very helpful.',
            spot_id=5,
            user_id=2
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
            user_id=11
        ),
        Review(
            rating=5,
            comment='I loved the design and the comfort.',
            spot_id=2,
            user_id=10
        ),
        Review(
            rating=4,
            comment='Great amenities and beautiful decor.',
            spot_id=3,
            user_id=9
        ),
        Review(
            rating=5,
            comment='A true gem! Will book again.',
            spot_id=4,
            user_id=8
        ),
        Review(
            rating=3,
            comment='Decent place but had some issues with cleanliness.',
            spot_id=5,
            user_id=7
        ),
        Review(
            rating=4,
            comment='Lovely area and very comfortable stay.',
            spot_id=6,
            user_id=6
        ),
        Review(
            rating=5,
            comment='Perfect for a relaxing holiday.',
            spot_id=1,
            user_id=5
        ),
        Review(
            rating=4,
            comment='Nice view and quiet neighborhood.',
            spot_id=2,
            user_id=4
        ),
        Review(
            rating=3,
            comment='Good amenities but needs some maintenance.',
            spot_id=3,
            user_id=3
        ),
        Review(
            rating=5,
            comment='Fantastic spot, will definitely return.',
            spot_id=4,
            user_id=2
        ),
        Review(
            rating=4,
            comment='Beautiful house with great features.',
            spot_id=5,
            user_id=1
        ),
        Review(
            rating=3,
            comment='Average stay, not much to highlight.',
            spot_id=6,
            user_id=12
        ),
        Review(
            rating=5,
            comment='A wonderful experience overall.',
            spot_id=1,
            user_id=10
        ),
        Review(
            rating=4,
            comment='Great spot for a family vacation!',
            spot_id=2,
            user_id=11
        ),
        Review(
            rating=5,
            comment='The place was beautiful and well-maintained.',
            spot_id=3,
            user_id=12
        ),
        Review(
            rating=4,
            comment='Lovely and peaceful retreat.',
            spot_id=4,
            user_id=9
        ),
        Review(
            rating=5,
            comment='Could not have asked for a better stay!',
            spot_id=5,
            user_id=8
        ),
        Review(
            rating=3,
            comment='The place was okay, nothing special.',
            spot_id=6,
            user_id=7
        ),
        Review(
            rating=4,
            comment='Really enjoyed our stay here.',
            spot_id=1,
            user_id=6
        ),
        Review(
            rating=5,
            comment='Highly recommend this spot for a relaxing getaway.',
            spot_id=2,
            user_id=5
        ),
        Review(
            rating=4,
            comment='Good value for the price.',
            spot_id=3,
            user_id=4
        ),
        Review(
            rating=5,
            comment='A wonderful place with great amenities.',
            spot_id=4,
            user_id=3
        ),
        Review(
            rating=4,
            comment='Very comfortable and welcoming.',
            spot_id=5,
            user_id=2
        ),
        Review(
            rating=3,
            comment='An average experience overall.',
            spot_id=6,
            user_id=1
        ),
        Review(
            rating=5,
            comment='Perfect spot for a weekend getaway!',
            spot_id=1,
            user_id=14
        ),
        Review(
            rating=4,
            comment='Nice place with a beautiful view.',
            spot_id=2,
            user_id=13
        ),
        Review(
            rating=5,
            comment='Loved everything about this spot!',
            spot_id=3,
            user_id=16
        ),
        Review(
            rating=4,
            comment='Great location and very peaceful.',
            spot_id=4,
            user_id=15
        ),
        Review(
            rating=3,
            comment='Decent stay, nothing extraordinary.',
            spot_id=5,
            user_id=18
        ),
        Review(
            rating=5,
            comment='Wonderful spot with all the amenities.',
            spot_id=6,
            user_id=17
        ),
        Review(
            rating=4,
            comment='Really enjoyed the stay, very comfortable.',
            spot_id=1,
            user_id=18
        ),
        Review(
            rating=5,
            comment='A lovely place with great views.',
            spot_id=2,
            user_id=19
        ),
        Review(
            rating=4,
            comment='Good value for the price, would stay again.',
            spot_id=3,
            user_id=17
        ),
        Review(
            rating=5,
            comment='A perfect getaway spot, highly recommend.',
            spot_id=4,
            user_id=16
        ),
        Review(
            rating=4,
            comment='Very clean and comfortable, great stay.',
            spot_id=5,
            user_id=15
        ),
        Review(
            rating=3,
            comment='The stay was okay, could have been better.',
            spot_id=6,
            user_id=14
        ),
        Review(
            rating=5,
            comment='The best place I have stayed at so far.',
            spot_id=1,
            user_id=13
        ),
        Review(
            rating=4,
            comment='Great stay, will visit again.',
            spot_id=2,
            user_id=12
        ),
    ]

    for review in reviews:
        db.session.add(review)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
