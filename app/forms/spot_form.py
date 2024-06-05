from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField
from wtforms.validators import DataRequired
from app.models import Spot

class SpotForm(FlaskForm):
    name = StringField('name', validators=[DataRequired('Please include a name')])
    address = StringField('address', validators=[DataRequired('Please include an address')])
    city = StringField('city', validators=[DataRequired('Please include a city')])
    state = StringField('state', validators=[DataRequired('Please include a state')])
    description = StringField('description', validators=[DataRequired('Please include a description')])
    price = FloatField('price', validators=[DataRequired('Please include a price')])
    submit = SubmitField("submit")
    # notebook_id = StringField('Notebook_id', validators=DataRequired('Please include a notebook name'))
