from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Spot
from app.forms.spot_form import SpotForm
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)


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
    image_url = data['image_url']

    new_spot = Spot.query.get(spot_id)
    new_spot.name = name
    new_spot.address = address
    new_spot.city = city
    new_spot.state = state
    new_spot.description = description
    new_spot.price = price
    new_spot.image_url = image_url

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
    current_user_id = current_user.get_id()
    data = request.json
    form = SpotForm()
    image = form.image.data
    if 'image' not in request.files:
        return {'errors': 'image required'}, 400

    if not allowed_file(image.filename):
        return {'errors': 'file type not permitted'}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if 'url' not in upload:
        return upload, 400

    url = upload['url']
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        spot = Spot(
            user_id = data['user_id'],
            name = data['name'],
            address = data['address'],
            city = data['city'],
            state = data['state'],
            description = data['description'],
            price = data['price'],
            image_url = data['image_url']
        )
    db.session.add(spot)
    db.session.commit()

    return {'spot': spot.to_dict()}
