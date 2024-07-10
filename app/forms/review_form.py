from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, HiddenField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    comment = TextAreaField('Comment')
    spot_id = HiddenField('Spot ID', validators=[DataRequired()])
    user_id = HiddenField('User ID', validators=[DataRequired()])
