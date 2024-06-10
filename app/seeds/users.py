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
    db.session.execute(text('TRUNCATE users RESTART IDENTITY CASCADE;'))
    db.session.commit()
