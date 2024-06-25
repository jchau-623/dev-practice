import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots, removeSpot } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import './SpotPage.css';

export default function SpotPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots.spots);
    const spot = spots[spotId];
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!spot) {
            dispatch(getSpots());
        }
    }, [dispatch, spotId, spot]);

    if (!spot) {
        return <div>Loading...</div>;
    }

    const handleShowAllPhotos = () => {
        history.push(`/spots/${spotId}/photos`);
    };

    const handleDeleteSpot = () => {
        dispatch(removeSpot(spotId)).then(() => {
            history.push('/');
        });
    };

    return (
        <div className="spot-page">
            <div className="spot-header">
                <h1 className="name">{spot.name}</h1>
                <p className="address">{spot.address}, {spot.city}, {spot.state}</p>
                {currentUser && currentUser.id === spot.user_id && (
                    <button onClick={handleDeleteSpot} className="delete-button">Delete Spot</button>
                )}
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
                <p className="description">{spot.description}</p>
                <p className="details">
                    {spot.max_guests} Guests &bull; {spot.num_bedrooms} Bedrooms &bull; {spot.num_bathrooms} Bathrooms
                </p>
                <p className="rating">
                    <i className="fas fa-star"></i> {spot.rating} ({spot.num_reviews} Reviews)
                </p>
            </div>
        </div>
    );
}
