import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots, updateCurrentImageIndex } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import { calculateAverageRating } from '../utils/';
import './SpotList.css';

export default function SpotList() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.spots));
    const reviews = useSelector(state => state.reviews);
    const history = useHistory();
    const fetchedSpotsRef = useRef(new Set());

    useEffect(() => {
        const fetchSpots = async () => {
            await dispatch(getSpots());
        };

        fetchSpots();
    }, [dispatch]);

    useEffect(() => {
        const fetchReviewsForSpots = async () => {
            const spotsToFetchReviews = spots.filter(spot => !fetchedSpotsRef.current.has(spot.id));

            if (spotsToFetchReviews.length > 0) {
                for (const spot of spotsToFetchReviews) {
                    await dispatch(getReviews(spot.id));
                    fetchedSpotsRef.current.add(spot.id);
                }
            }
        };

        if (spots.length > 0) {
            fetchReviewsForSpots();
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
                                <p className="spot-rating">{calculateAverageRating(reviews[spot.id])}</p>
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
