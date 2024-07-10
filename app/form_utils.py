import json
from flask import request, jsonify

def validate_and_parse_form():
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

    missing_fields = [field for field in ['name', 'user_id', 'address', 'city', 'state', 'description', 'price', 'num_bedrooms', 'num_bathrooms', 'max_guests'] if not request.form.get(field)]
    if missing_fields:
        return None, jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

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
        return None, jsonify({'error': f'Invalid value for a numeric field: {str(e)}'}), 400

    try:
        availability_data = json.loads(availability) if availability else []
    except json.JSONDecodeError as e:
        return None, jsonify({'error': 'Invalid JSON for availability'}), 400

    try:
        amenities_list = json.loads(amenities) if amenities else []
    except json.JSONDecodeError as e:
        return None, jsonify({'error': 'Invalid JSON for amenities'}), 400

    form_data = {
        'name': name,
        'user_id': user_id,
        'address': address,
        'city': city,
        'state': state,
        'description': description,
        'price': price,
        'num_bedrooms': num_bedrooms,
        'num_bathrooms': num_bathrooms,
        'max_guests': max_guests,
        'amenities': amenities_list,
        'house_rules': house_rules,
        'availability': availability_data,
        'latitude': latitude,
        'longitude': longitude,
        'rating': rating,
        'num_reviews': num_reviews
    }

    return form_data, None, None

def update_and_parse_form():
    name = request.form.get('name')
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

    missing_fields = [field for field in ['name', 'address', 'city', 'state', 'description', 'price', 'num_bedrooms', 'num_bathrooms', 'max_guests'] if not request.form.get(field)]
    if missing_fields:
        return None, jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

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
        return None, jsonify({'error': f'Invalid value for a numeric field: {str(e)}'}), 400

    try:
        availability_data = json.loads(availability) if availability else []
    except json.JSONDecodeError as e:
        return None, jsonify({'error': 'Invalid JSON for availability'}), 400

    try:
        amenities_list = json.loads(amenities) if amenities else []
    except json.JSONDecodeError as e:
        return None, jsonify({'error': 'Invalid JSON for amenities'}), 400

    form_data = {
        'name': name,
        'address': address,
        'city': city,
        'state': state,
        'description': description,
        'price': price,
        'num_bedrooms': num_bedrooms,
        'num_bathrooms': num_bathrooms,
        'max_guests': max_guests,
        'amenities': amenities_list,
        'house_rules': house_rules,
        'availability': availability_data,
        'latitude': latitude,
        'longitude': longitude,
        'rating': rating,
        'num_reviews': num_reviews
    }

    return form_data, None, None
