import React from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './CreateReviewForm';
import './CreateReviewModal.css';

export default function CreateReviewModal({ show, handleClose, spotId }) {
    return (
        <>
            {show && (
                <Modal onClose={handleClose}>
                    <div className="create-review-modal-container">
                    <button onClick={handleClose} className="close-btn-create-modal">&times;</button>
                        <div className="create-review-form-header">
                            <h2>Create a Review</h2>
                        </div>
                        <CreateReviewForm spotId={spotId} handleClose={handleClose} />
                    </div>
                </Modal>
            )}
        </>
    );
}
