from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, FieldList, FormField
from wtforms.validators import DataRequired, NumberRange
from wtforms.widgets import HiddenInput

class AvailabilityForm(FlaskForm):
    date = StringField('Date', validators=[DataRequired()])
    status = StringField('Status', validators=[DataRequired()])

class SpotForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    user_id = IntegerField('User ID', validators=[DataRequired()], widget=HiddenInput())
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired(), NumberRange(min=0)])
    image_urls = FieldList(StringField('Image URL', validators=[DataRequired()]), min_entries=1)
    num_bedrooms = IntegerField('Number of Bedrooms', validators=[DataRequired(), NumberRange(min=1)])
    num_bathrooms = FloatField('Number of Bathrooms', validators=[DataRequired(), NumberRange(min=0.5)])
    max_guests = IntegerField('Maximum Number of Guests', validators=[DataRequired(), NumberRange(min=1)])
    amenities = FieldList(StringField('Amenity'), min_entries=1)  # Allow adding multiple amenities
    house_rules = TextAreaField('House Rules')
    availability = FieldList(FormField(AvailabilityForm))  # Nested form for availability
    latitude = FloatField('Latitude', validators=[NumberRange(min=-90, max=90)])
    longitude = FloatField('Longitude', validators=[NumberRange(min=-180, max=180)])
    rating = FloatField('Rating', validators=[NumberRange(min=0, max=5)], default=0)
    num_reviews = IntegerField('Number of Reviews', validators=[NumberRange(min=0)], default=0)
