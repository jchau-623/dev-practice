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
        User(
            id=6,
            username='Frank',
            email='frank@example.com',
            password='password',
        ),
        User(
            id=7,
            username='Grace',
            email='grace@example.com',
            password='password',
        ),
        User(
            id=8,
            username='Hank',
            email='hank@example.com',
            password='password',
        ),
        User(
            id=9,
            username='Ivy',
            email='ivy@example.com',
            password='password',
        ),
        User(
            id=10,
            username='Jack',
            email='jack@example.com',
            password='password',
        ),
        User(
            id=11,
            username='Karen',
            email='karen@example.com',
            password='password',
        ),
        User(
            id=12,
            username='Leo',
            email='leo@example.com',
            password='password',
        ),
        User(
            id=13,
            username='Janesa',
            email='janesa@example.com',
            password='password',
        ),
        User(
            id=14,
            username='Lauren',
            email='lauren@example.com',
            password='password',
        ),
        User(
            id=15,
            username='Jay',
            email='Jay@example.com',
            password='password',
        ),
        User(
            id=16,
            username='River',
            email='River@example.com',
            password='password',
        ),
        User(
            id=17,
            username='Terence',
            email='Terence@example.com',
            password='password',
        ),
        User(
            id=18,
            username='Jasmine',
            email='Jasmine@example.com',
            password='password',
        ),
        User(
            id=19,
            username='Justin',
            email='Justin@example.com',
            password='password',
        ),
    ]


# Adds a demo user, you can add other users here if you want
    for user in users:
        db.session.add(user)
    db.session.commit()

    db.engine.execute("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users) + 1);")


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
