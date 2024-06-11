from .db import db


class Spot(db.Model):
    __tablename__ = 'spots'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)  # Increased length for detailed descriptions
    price = db.Column(db.Float, nullable=False)
    image_urls = db.Column(db.ARRAY(db.String), nullable=False)
    num_bedrooms = db.Column(db.Integer, nullable=False)
    num_bathrooms = db.Column(db.Float, nullable=False)  # Using float to accommodate half baths
    max_guests = db.Column(db.Integer, nullable=False)
    amenities = db.Column(db.ARRAY(db.String), nullable=True)  # List of amenities
    house_rules = db.Column(db.Text, nullable=True)
    availability = db.Column(db.JSON, nullable=True)  # JSON to store availability calendar data
    latitude = db.Column(db.Float, nullable=True)  # For map location
    longitude = db.Column(db.Float, nullable=True)  # For map location
    rating = db.Column(db.Float, nullable=True)  # Average rating of the spot
    num_reviews = db.Column(db.Integer, nullable=True)  # Number of reviews

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
            'image_urls': self.image_urls,
            'num_bedrooms': self.num_bedrooms,
            'num_bathrooms': self.num_bathrooms,
            'max_guests': self.max_guests,
            'amenities': self.amenities,
            'house_rules': self.house_rules,
            'availability': self.availability,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'rating': self.rating,
            'num_reviews': self.num_reviews
        }
