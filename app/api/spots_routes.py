from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Notebook, Note
from app.forms.notebook_form import NotebookForm

spots_routes = Blueprint('spots', __name__)

@spots_routes.route('/', methods=['DELETE'])
def delete_spot():
    data = request.json
    spot_id = data['spot_id']
    spots = Spot.query.filter(Spot.spot_id == spot_id)
    for spot in spots:
        db.session.delete(spot)
        db.session.commit()

    spot = Spot.query.get(spot_id)

    db.session.delete(spot)
    db.session.commit()

    return {'deleted_spotId': spot_id}
