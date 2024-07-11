from flask import Blueprint, request, jsonify
from app.models import db, Review, Spot
from app.forms.review_form import ReviewForm
from app.form_utils import validate_and_parse_form, update_and_parse_form

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/create', methods=['POST'])
def create_review():
    print("Received request to create review")  # Log the request
    form = ReviewForm()
    form_data = request.get_json()  # Parse JSON data
    form.process(data=form_data)  # Populate the form with the parsed data
    form_data, error_response, status_code = validate_and_parse_form(form)
    if error_response:
        print("Form validation failed:", error_response.get_data(as_text=True))  # Log validation errors
        return error_response, status_code

    spot = Spot.query.get(form_data['spot_id'])
    if spot.user_id == form_data['user_id']:
        return jsonify({'error': 'You cannot review your own spot.'}), 403

    new_review = Review(
        rating=form_data['rating'],
        comment=form_data['comment'],
        spot_id=form_data['spot_id'],
        user_id=form_data['user_id'],
    )

    try:
        db.session.add(new_review)
        db.session.commit()
        print("Review created successfully:", new_review.to_dict())  # Log successful creation
        return jsonify(new_review.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        print("Error creating review:", str(e))  # Log exceptions
        return jsonify({'error': str(e)}), 500

@review_routes.route('/<int:id>', methods=['GET'])
def get_review(id):
    review = Review.query.get(id)
    if review:
        return jsonify(review.to_dict())
    return jsonify({'error': 'Review not found'}), 404

@review_routes.route('/', methods=['GET'])
def get_all_reviews():
    spot_id = request.args.get('spot_id')
    if spot_id:
        reviews = Review.query.filter_by(spot_id=spot_id).all()
    else:
        reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews])

@review_routes.route('/<int:id>', methods=['PUT'])
def update_review(id):
    review = Review.query.get(id)
    if not review:
        return jsonify({'error': 'Review not found'}), 404

    form = ReviewForm()
    form_data, error_response, status_code = update_and_parse_form(form)
    if error_response:
        return error_response, status_code

    if form_data['rating'] is not None:
        review.rating = form_data['rating']
    if form_data['comment'] is not None:
        review.comment = form_data['comment']

    try:
        db.session.commit()
        return jsonify(review.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review deleted successfully'})
    return jsonify({'error': 'Review not found'}), 404
