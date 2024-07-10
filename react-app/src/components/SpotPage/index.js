import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import { useParams, useHistory } from 'react-router-dom';
import DeleteSpotModal from '../DeleteSpotModal';
import './SpotPage.css';

export default function SpotPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots.spots);
    const spot = spots[spotId];
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews[spotId] || []);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (!spot) {
            dispatch(getSpots());
        }
        dispatch(getReviews(spotId));
    }, [dispatch, spotId, spot]);

    if (!spot) {
        return <div>Loading...</div>;
    }

    const handleShowAllPhotos = () => {
        history.push(`/spots/${spotId}/photos`);
    };

    const handleDeleteSpot = () => {
        setShowDeleteModal(true);
    };

    const calculateAverageRating = (reviews) => {
        if (reviews.length === 0) return null;
        const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    return (
        <div className="spot-page">
            <div className="spot-header">
                <div className="spot-title">
                    <h1 className="name">{spot.name}</h1>
                    {currentUser && currentUser.id === spot.user_id && (
                        <button onClick={handleDeleteSpot} className="spot-page-delete-button">Delete Spot</button>
                    )}
                    <DeleteSpotModal
                        show={showDeleteModal}
                        handleClose={() => setShowDeleteModal(false)}
                        spotId={spotId}
                    />
                </div>
                <p className="address">{spot.address}, {spot.city}, {spot.state}</p>
                <div className="spot-images">
                    <div onClick={handleShowAllPhotos} className="grid-item first-image">
                        <img src={spot.image_urls[0]} alt="Spot 1" />
                    </div>
                    {spot.image_urls.slice(1, 5).map((imageUrl, index) => (
                        <div onClick={handleShowAllPhotos} key={index} className="grid-item square">
                            <img src={imageUrl} alt={`Spot ${index + 2}`} />
                        </div>
                    ))}
                    <div className="show-all-photos-button">
                        <div className="ellipsis-icon">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <button onClick={handleShowAllPhotos}>Show All Photos</button>
                    </div>
                </div>
            </div>
            <div className="spotpage-info">
                <p className='description'>Hosted by: {spot.username}</p>
                <p className="description">{spot.description}</p>
                <p className="details">
                    {spot.max_guests} Guests &bull; {spot.num_bedrooms} Bedrooms &bull; {spot.num_bathrooms} Bathrooms
                </p>
                <p className="rating">
                    <i className="fas fa-star"></i> {calculateAverageRating(reviews)} ({reviews.length} Reviews)
                </p>
            </div>
        </div>
    );
}
