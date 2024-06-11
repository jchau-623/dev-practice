import React from 'react';
import './PhotoModal.css';

export default function PhotoModal({ imageUrl, onClose }) {
    return (
        <div className="photo-modal">
            <button className="close-btn-photo" onClick={onClose}>
                X Close
            </button>
            <div className="modal-content">
                <img src={imageUrl} alt="Spot" />
            </div>
        </div>
    );
}
