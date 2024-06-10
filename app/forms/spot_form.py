from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField, MultipleFileField
from wtforms.validators import DataRequired
from app.models import Spot

class SpotForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired('Please include a name')])
    address = StringField('Address', validators=[DataRequired('Please include an address')])
    city = StringField('City', validators=[DataRequired('Please include a city')])
    state = StringField('State', validators=[DataRequired('Please include a state')])
    description = StringField('Description', validators=[DataRequired('Please include a description')])
    price = FloatField('Price', validators=[DataRequired('Please include a price')])
    image_urls = MultipleFileField('Image URLs')
    submit = SubmitField("Submit")
