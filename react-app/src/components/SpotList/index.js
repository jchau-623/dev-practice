import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots, updateCurrentImageIndex } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './SpotList.css';

export default function SpotList () {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.spots)); // Updated to access spots from state.spots.spots
    const currentImageIndices = useSelector(state => state.spots.currentImageIndices); // Added to access currentImageIndices from state.spots
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const handleSpotClick = (spot) => {
        history.push(`/spots/${spot.id}`);
    };

    const handleArrowClick = (e, direction, spotId) => {
        e.stopPropagation();
        const currentIndex = currentImageIndices[spotId] || 0; // Updated to retrieve currentImageIndex for the specific spot
        const spot = spots.find(spot => spot.id === spotId);
        if (direction === 'prev') {
            dispatch(updateCurrentImageIndex(spotId, currentIndex === 0 ? spot.image_urls.length - 1 : currentIndex - 1));
        } else {
            dispatch(updateCurrentImageIndex(spotId, (currentIndex + 1) % spot.image_urls.length));
        }
    };

    return (
        <div className="spot-list">
            {spots.map((spot, index) => (
                <div key={spot.id} className="spot-card" onClick={() => handleSpotClick(spot)}>
                    <div className="spot-image-container">
                        <img src={spot.image_urls[currentImageIndices[spot.id] || 0]} alt="Spot" className="spot-image" />
                        <button className="arrow left-arrow" onClick={(e) => handleArrowClick(e, 'prev', spot.id)}>&lt;</button>
                        <button className="arrow right-arrow" onClick={(e) => handleArrowClick(e, 'next', spot.id)}>&gt;</button>
                    </div>
                    <div className="spot-info">
                        <div className="spotinfo-header">
                            <h3 className="spot-name">{spot.name}</h3>
                            <div className="rating">
                                <i className="fas fa-star"></i>
                                <p className="spot-rating">{spot.rating}</p>
                            </div>
                        </div>
                        <p className="spot-description">{spot.description.length > 50 ? spot.description.slice(0, 50) + '...' : spot.description}</p>
                        <p className="spot-price">${spot.price} per night</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
