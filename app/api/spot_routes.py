from flask import Blueprint, request, jsonify
from app.models import db, Spot
from sqlalchemy import func
from app.forms import SpotForm
from werkzeug.utils import secure_filename
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from app.form_utils import validate_and_parse_form
import traceback

spot_routes = Blueprint('spots', __name__)

@spot_routes.route('/create', methods=['POST'])
def create_spot():
    try:
        print("Form data:", request.form)
        print("Files:", request.files)

        form_data, error_response, status_code = validate_and_parse_form()
        if error_response:
            return error_response, status_code

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
                    return jsonify(upload_response), 400
            else:
                print(f"Invalid file type: {image.filename}")
                return jsonify({'error': 'Invalid file type'}), 400

        new_spot = Spot(
            name=form_data['name'],
            user_id=form_data['user_id'],
            address=form_data['address'],
            city=form_data['city'],
            state=form_data['state'],
            description=form_data['description'],
            price=form_data['price'],
            image_urls=image_url_paths,
            num_bedrooms=form_data['num_bedrooms'],
            num_bathrooms=form_data['num_bathrooms'],
            max_guests=form_data['max_guests'],
            amenities=form_data['amenities'],
            house_rules=form_data['house_rules'],
            availability=form_data['availability'],
            latitude=form_data['latitude'],
            longitude=form_data['longitude'],
            rating=form_data['rating'],
            num_reviews=form_data['num_reviews']
        )

        try:
            db.session.add(new_spot)
            db.session.commit()
            return jsonify(new_spot.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f"Error committing to database: {e}")
            return jsonify({'error': str(e)}), 500
    except Exception as e:
        print(f"Unhandled exception: {e}")
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

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
    try:
        spot = Spot.query.get(id)
        if not spot:
            return jsonify({'error': 'Spot not found'}), 404

        form_data, error_response, status_code = validate_and_parse_form()
        if error_response:
            return error_response, status_code

        # Handle image uploads if present
        image_files = request.files.getlist('image_urls')
        if image_files:
            image_url_paths = []
            for image in image_files:
                if allowed_file(image.filename):
                    unique_filename = get_unique_filename(image.filename)
                    image.filename = unique_filename
                    upload_response = upload_file_to_s3(image)
                    if "url" in upload_response:
                        image_url_paths.append(upload_response["url"])
                    else:
                        return jsonify(upload_response), 400
                else:
                    return jsonify({'error': 'Invalid file type'}), 400
            spot.image_urls = image_url_paths

        # Update spot fields
        spot.name = form_data['name']
        spot.user_id = form_data['user_id']
        spot.address = form_data['address']
        spot.city = form_data['city']
        spot.state = form_data['state']
        spot.description = form_data['description']
        spot.price = form_data['price']
        spot.num_bedrooms = form_data['num_bedrooms']
        spot.num_bathrooms = form_data['num_bathrooms']
        spot.max_guests = form_data['max_guests']
        spot.amenities = form_data['amenities']
        spot.house_rules = form_data['house_rules']
        spot.availability = form_data['availability']
        spot.latitude = form_data['latitude']
        spot.longitude = form_data['longitude']
        spot.rating = form_data['rating']
        spot.num_reviews = form_data['num_reviews']

        db.session.commit()
        return jsonify(spot.to_dict())
    except Exception as e:
        db.session.rollback()
        print(f"Error updating spot: {e}")
        traceback.print_exc()
        return jsonify({'error': 'Internal Server Error'}), 500

@spot_routes.route('/<int:id>', methods=['DELETE'])
def delete_spot(id):
    spot = Spot.query.get(id)
    if spot:
        db.session.delete(spot)
        db.session.commit()
        return jsonify({'message': 'Spot deleted successfully'})
    return jsonify({'error': 'Spot not found'}), 404
