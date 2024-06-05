from .db import db


class Spot(db.Model):
    __tablename__ = 'spots'

    id  = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    description= db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    # TODO set up AWS

    user = db.relationship('User', back_populates='spots')

    def to_dict(self):

        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'description': self.description,
            'price': self.price,
        }


    def test(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'description': self.description,
            'price': self.price,
        }
