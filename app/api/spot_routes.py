from flask import Blueprint, request, jsonify
from app.models import db, Spot
from sqlalchemy import func
from app.forms import SpotForm
from werkzeug.utils import secure_filename
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)
import os
import json

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('/create', methods=['POST'])
def create_spot():
    # Log the incoming form data and files for debugging
    print("Form data:", request.form)
    print("Files:", request.files)

    # Use request.form to get form data
    name = request.form.get('name')
    user_id = request.form.get('user_id')
    address = request.form.get('address')
    city = request.form.get('city')
    state = request.form.get('state')
    description = request.form.get('description')
    price = request.form.get('price')
    num_bedrooms = request.form.get('num_bedrooms')
    num_bathrooms = request.form.get('num_bathrooms')
    max_guests = request.form.get('max_guests')
    amenities = request.form.get('amenities')
    house_rules = request.form.get('house_rules')
    availability = request.form.get('availability')
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')
    rating = request.form.get('rating')
    num_reviews = request.form.get('num_reviews')

    # Handle missing required fields
    missing_fields = [field for field in ['name', 'user_id', 'address', 'city', 'state', 'description', 'price', 'num_bedrooms', 'num_bathrooms', 'max_guests'] if not request.form.get(field)]
    if missing_fields:
        print(f"Missing required fields: {missing_fields}")
        return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

    # Validate and parse numeric fields
    try:
        price = float(price)
        num_bedrooms = int(num_bedrooms)
        num_bathrooms = float(num_bathrooms)
        max_guests = int(max_guests)
        latitude = float(latitude) if latitude else None
        longitude = float(longitude) if longitude else None
        rating = float(rating) if rating else None
        num_reviews = int(num_reviews) if num_reviews else None
    except ValueError as e:
        print(f"Invalid value for a numeric field: {e}")
        return jsonify({'error': f'Invalid value for a numeric field: {str(e)}'}), 400

    # Handle file upload
    image_files = request.files.getlist('image_urls')
    if not image_files:
        print("No image files found")
        return jsonify({'error': 'Image is required'}), 400

    image_url_paths = []
    for image in image_files:
        if allowed_file(image.filename):
            unique_filename = get_unique_filename(image.filename)
            image.filename = unique_filename
            upload_response = upload_file_to_s3(image)
            if "url" in upload_response:
                image_url_paths.append(upload_response["url"])
            else:
                print(f"Error uploading file to S3: {upload_response}")
                return jsonify(upload_response), 400  # If there's an error in upload, return it
        else:
            print(f"Invalid file type: {image.filename}")
            return jsonify({'error': 'Invalid file type'}), 400

    # Process availability
    try:
        availability_data = json.loads(availability) if availability else []
    except json.JSONDecodeError as e:
        print(f"Invalid JSON for availability: {e}")
        return jsonify({'error': 'Invalid JSON for availability'}), 400

    try:
        amenities_list = json.loads(amenities) if amenities else []
    except json.JSONDecodeError as e:
        print(f"Invalid JSON for amenities: {e}")
        return jsonify({'error': 'Invalid JSON for amenities'}), 400

    new_spot = Spot(
        name=name,
        user_id=user_id,
        address=address,
        city=city,
        state=state,
        description=description,
        price=price,
        image_urls=image_url_paths,
        num_bedrooms=num_bedrooms,
        num_bathrooms=num_bathrooms,
        max_guests=max_guests,
        amenities=amenities_list,
        house_rules=house_rules,
        availability=availability_data,
        latitude=latitude,
        longitude=longitude,
        rating=rating,
        num_reviews=num_reviews
    )

    try:
        db.session.add(new_spot)
        db.session.commit()
        return jsonify(new_spot.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error committing to database: {e}")
        return jsonify({'error': str(e)}), 500

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
