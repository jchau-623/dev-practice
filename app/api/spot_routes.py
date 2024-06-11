from flask import Blueprint, request, jsonify
from app.models import db, Spot
from app.forms import SpotForm

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('/create', methods=['POST'])
def create_spot():
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        availability_data = []
        for entry in form.availability.entries:
            availability_data.append({
                "date": entry.data['date'],
                "status": entry.data['status']
            })
        new_spot = Spot(
            name=form.name.data,
            user_id=form.user_id.data,
            address=form.address.data,
            city=form.city.data,
            state=form.state.data,
            description=form.description.data,
            price=form.price.data,
            image_urls=form.image_urls.data,
            num_bedrooms=form.num_bedrooms.data,
            num_bathrooms=form.num_bathrooms.data,
            max_guests=form.max_guests.data,
            amenities=form.amenities.data,
            house_rules=form.house_rules.data,
            availability=availability_data,
            latitude=form.latitude.data,
            longitude=form.longitude.data,
            rating=form.rating.data,
            num_reviews=form.num_reviews.data
        )
        db.session.add(new_spot)
        db.session.commit()
        return jsonify(new_spot.to_dict()), 201
    return jsonify(form.errors), 400

@spot_routes.route('/<int:id>', methods=['GET'])
def get_spot(id):
    spot = Spot.query.get(id)
    if spot:
        return jsonify(spot.to_dict())
    return jsonify({'error': 'Spot not found'}), 404

@spot_routes.route('/', methods=['GET'])
def get_all_spots():
    spots = Spot.query.all()
    return jsonify([spot.to_dict() for spot in spots])

@spot_routes.route('/<int:id>', methods=['PUT'])
def update_spot(id):
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    spot = Spot.query.get(id)
    if spot and form.validate_on_submit():
        availability_data = []
        for entry in form.availability.entries:
            availability_data.append({
                "date": entry.data['date'],
                "status": entry.data['status']
            })
        spot.name = form.name.data
        spot.user_id = form.user_id.data
        spot.address = form.address.data
        spot.city = form.city.data
        spot.state = form.state.data
        spot.description = form.description.data
        spot.price = form.price.data
        spot.image_urls = form.image_urls.data
        spot.num_bedrooms = form.num_bedrooms.data
        spot.num_bathrooms = form.num_bathrooms.data
        spot.max_guests = form.max_guests.data
        spot.amenities = form.amenities.data
        spot.house_rules = form.house_rules.data
        spot.availability = availability_data
        spot.latitude = form.latitude.data
        spot.longitude = form.longitude.data
        spot.rating = form.rating.data
        spot.num_reviews = form.num_reviews.data

        db.session.commit()
        return jsonify(spot.to_dict())
    return jsonify(form.errors), 400

@spot_routes.route('/<int:id>', methods=['DELETE'])
def delete_spot(id):
    spot = Spot.query.get(id)
    if spot:
        db.session.delete(spot)
        db.session.commit()
        return jsonify({'message': 'Spot deleted successfully'})
    return jsonify({'error': 'Spot not found'}), 404
