import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews'
import './CreateReviewForm.css';

export default function CreateReviewForm({ spotId, handleClose }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", { spotId, rating, comment }); // Log form data
        const newReview = {
            spotId: parseInt(spotId), // Ensure spotId is an integer
            rating: parseInt(rating), // Ensure rating is an integer
            comment
        };
        try {
            await dispatch(createReview(newReview));
            console.log("Review created successfully");
            handleClose();
        } catch (error) {
            console.error("Error creating review:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <label>
                Rating:
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    required
                />
            </label>
            <label>
                Comment:
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
