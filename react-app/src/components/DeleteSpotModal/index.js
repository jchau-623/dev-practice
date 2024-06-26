import React from 'react';
import { Modal } from '../../context/Modal';
import DeleteSpotForm from './DeleteSpotForm';
import './DeleteSpotModal.css';

export default function DeleteSpotModal({ show, handleClose, spotId }) {
    return (
        <>
            {show && (
                <Modal onClose={handleClose}>
                    <div className="delete-form-container">
                        <button onClick={handleClose} className="close-btn-delete">&times;</button>
                        <div className="delete-form-header">
                            <h2>Delete Spot</h2>
                        </div>
                        <DeleteSpotForm handleClose={handleClose} spotId={spotId} />
                    </div>
                </Modal>
            )}
        </>
    );
}
