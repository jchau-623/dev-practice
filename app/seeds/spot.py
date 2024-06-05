from app.models import db, Spot


def spot_notes():
    spots = [
        Spot(
            name='',
            user_id = '1',
            address='',
            city='',
            state='',
            description='',
            price='',
        )
    ]
