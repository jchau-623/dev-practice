import React from 'react';
import './PhotoModal.css';

export default function PhotoModal({ imageUrl, onClose }) {
    return (
        <div className="photo-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <img src={imageUrl} alt="Spot" />
            </div>
        </div>
    );
}
