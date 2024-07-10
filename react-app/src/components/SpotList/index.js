import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots, updateCurrentImageIndex } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import './SpotList.css';

export default function SpotList() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.spots));
    const reviews = useSelector(state => state.reviews);
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    useEffect(() => {
        if (spots.length > 0) {
            spots.forEach(spot => {
                dispatch(getReviews(spot.id));
            });
        }
    }, [dispatch, spots]);

    const handleSpotClick = (spot) => {
        history.push(`/spots/${spot.id}`);
    };

    const handleArrowClick = (e, direction, spotId) => {
        e.stopPropagation();
        const spot = spots.find(spot => spot.id === spotId);
        const currentIndex = spot.currentImageIndex || 0;
        if (direction === 'prev') {
            dispatch(updateCurrentImageIndex(spotId, currentIndex === 0 ? spot.image_urls.length - 1 : currentIndex - 1));
        } else {
            dispatch(updateCurrentImageIndex(spotId, (currentIndex + 1) % spot.image_urls.length));
        }
    };

    const calculateAverageRating = (spotId) => {
        const spotReviews = reviews[spotId] || [];
        if (spotReviews.length === 0) return null;
        const totalRating = spotReviews.reduce((total, review) => total + review.rating, 0);
        return (totalRating / spotReviews.length).toFixed(1);
    };

    return (
        <div className="spot-list">
            {spots.map((spot) => (
                <div key={spot.id} className="spot-card" onClick={() => handleSpotClick(spot)}>
                    <div className="spot-image-container">
                        <img src={spot.image_urls[spot.currentImageIndex || 0]} alt="Spot" className="spot-image" />
                        <button className="arrow left-arrow" onClick={(e) => handleArrowClick(e, 'prev', spot.id)}>&lt;</button>
                        <button className="arrow right-arrow" onClick={(e) => handleArrowClick(e, 'next', spot.id)}>&gt;</button>
                    </div>
                    <div className="spot-info">
                        <div className="spotinfo-header">
                            <h3 className="spot-name">{spot.name.length > 27 ? spot.name.slice(0, 27) + '...' : spot.name}</h3>
                            <div className="rating">
                                <i className="fas fa-star"></i>
                                <p className="spot-rating">{calculateAverageRating(spot.id) || 'No reviews yet'}</p>
                            </div>
                        </div>
                        <div className="spot-hosted">Hosted by: {spot.username}</div>
                        <div className="spot-price">${spot.price} per night</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
