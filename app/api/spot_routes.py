from flask import Blueprint, request, jsonify
from app.models import db, Spot
from app.forms.spot_form import SpotForm
from app.form_utils import validate_and_parse_form, update_and_parse_form
from werkzeug.utils import secure_filename
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
import traceback

spot_routes = Blueprint('spots', __name__)
# TODO fix create spot route (issues with backend)
@spot_routes.route('/create', methods=['POST'])
def create_spot():
    try:
        print('Received request to create a spot')
        form = SpotForm()

        # Manually add the CSRF token to the form
        form['csrf_token'].data = request.cookies['csrf_token']

        if not form.validate_on_submit():
            print(f'Form validation errors: {form.errors}')
            return jsonify({'errors': form.errors}), 400

        print(f'Form data: {form.data}')

        image_files = request.files.getlist('image_urls')
        if not image_files:
            print('No image files provided')
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
                    print(f'File upload failed: {upload_response}')
                    return jsonify(upload_response), 400
            else:
                print(f'Invalid file type: {image.filename}')
                return jsonify({'error': 'Invalid file type'}), 400

        print(f'Image URLs: {image_url_paths}')

        # Manually add image URLs to the form data
        form.data['image_urls'] = image_url_paths

        new_spot = Spot(
            name=form.data['name'],
            user_id=form.data['user_id'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            description=form.data['description'],
            price=form.data['price'],
            image_urls=image_url_paths,
            num_bedrooms=form.data['num_bedrooms'],
            num_bathrooms=form.data['num_bathrooms'],
            max_guests=form.data['max_guests'],
            amenities=form.data['amenities'],
            house_rules=form.data['house_rules'],
            availability=form.data['availability'],
            latitude=form.data['latitude'],
            longitude=form.data['longitude'],
        )

        try:
            db.session.add(new_spot)
            db.session.commit()
            print('New spot created successfully')
            return jsonify(new_spot.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            print(f'Database error: {str(e)}')
            return jsonify({'error': str(e)}), 500
    except Exception as e:
        traceback.print_exc()
        print(f'Unhandled error: {str(e)}')
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

        form = SpotForm()
        form_data, error_response, status_code = update_and_parse_form(form)
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

        spot.name = form_data.get('name', spot.name)
        spot.address = form_data.get('address', spot.address)
        spot.city = form_data.get('city', spot.city)
        spot.state = form_data.get('state', spot.state)
        spot.description = form_data.get('description', spot.description)
        spot.price = form_data.get('price', spot.price)
        spot.num_bedrooms = form_data.get('num_bedrooms', spot.num_bedrooms)
        spot.num_bathrooms = form_data.get('num_bathrooms', spot.num_bathrooms)
        spot.max_guests = form_data.get('max_guests', spot.max_guests)
        spot.amenities = form_data.get('amenities', spot.amenities)
        spot.house_rules = form_data.get('house_rules', spot.house_rules)
        spot.availability = form_data.get('availability', spot.availability)
        spot.latitude = form_data.get('latitude', spot.latitude)
        spot.longitude = form_data.get('longitude', spot.longitude)

        db.session.commit()
        return jsonify(spot.to_dict())
    except Exception as e:
        db.session.rollback()
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
