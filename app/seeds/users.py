from app.models import db, User
from sqlalchemy import text

def seed_users():
    users = [
        User(
            id=1,
            username='Demo',
            email='demo@aa.io',
            password='password',
        ),
        User(
            id=2,
            username='Alice',
            email='alice@example.com',
            password='password',
        ),
        User(
            id=3,
            username='Bob',
            email='bob@example.com',
            password='password',
        ),
        User(
            id=4,
            username='Charlie',
            email='charlie@example.com',
            password='password',
        ),
        User(
            id=5,
            username='Eve',
            email='eve@example.com',
            password='password',
        ),
    ]


# Adds a demo user, you can add other users here if you want
    for user in users:
        db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
