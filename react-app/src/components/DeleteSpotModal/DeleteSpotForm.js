import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeSpot } from '../../store/spots';
import './DeleteSpotModal.css';

export default function DeleteSpotForm({ handleClose, spotId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async () => {
        await dispatch(removeSpot(spotId));
        handleClose();
        history.push('/');
    };

    return (
        <div className="delete-spot-form">
            <p className="delete-form-message">Are you sure you want to delete this spot?</p>
            <div className="delete-form-buttons">
                <button onClick={handleDelete} className="delete-button">
                    Delete
                </button>
                <button onClick={handleClose} className="cancel-button">
                    Cancel
                </button>
            </div>
        </div>
    );
}
