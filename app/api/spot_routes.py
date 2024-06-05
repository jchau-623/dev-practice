from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Spot
from app.forms.spot_form import SpotForm

spot_routes = Blueprint('spots', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@spot_routes.route('/', methods=['GET'])
def get_spots():
    spots = Spot.query.all()
    return {'spots': [spot.to_dict() for spot in spots]}

@spot_routes.route('/', methods= ['PATCH'])
def edit_spot():
    data = request.json

    spot_id = data['spot_id']
    name = data['name']
    address = data['address']
    city = data['city']
    state = data['state']
    description = data['description']
    price = data['price']

    new_spot = Spot.query.get(spot_id)
    new_spot.name = name
    new_spot.address = address
    new_spot.city = city
    new_spot.state = state
    new_spot.description = description
    new_spot.price = price

    db.session.commit()
    return {'spot': new_spot.to_dict()}

@spot_routes.route('/', methods=['DELETE'])
def delete_spot():
    data = request.json
    spot_id = data['spot_id']
    spot = Spot.query.get(spot_id)

    db.session.delete(spot)
    db.session.commit()

    return {'deleted_spotId': spot_id}

@spot_routes.route('/', methods= ['POST'])
def add_spot():
    data = request.json
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        spot = Spot(
            user_id = data['user_id'],
            name = data['name'],
            address = data['address'],
            city = data['city'],
            state = data['state'],
            description = data['description'],
            price = data['price']
        )
    db.session.add(spot)
    db.session.commit()

    return {'spot': spot.to_dict()}
