import json
from flask import request, jsonify

def validate_and_parse_form(form):
    if form.validate_on_submit():
        print('Form validation successful')
        return form.data, None, 200
    print(f'Form validation errors: {form.errors}')
    return None, jsonify({'errors': form.errors}), 400

def update_and_parse_form(form):
    if form.validate():
        return form.data, None, 200
    return None, jsonify({'errors': form.errors}), 400
