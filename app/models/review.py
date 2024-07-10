from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    spot_id = db.Column(db.Integer, db.ForeignKey('spots.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    spot = db.relationship('Spot', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'comment': self.comment,
            'spot_id': self.spot_id,
            'user_id': self.user_id,
            'username': self.user.username,
        }
