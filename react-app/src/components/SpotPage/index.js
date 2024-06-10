import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useParams, useHistory } from 'react-router-dom';
import './SpotPage.css';

export default function SpotPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots.spots);
    const spot = spots[spotId];
    const history = useHistory();

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

    return (
        <div className="spot-page">
            <div className="spot-header">
                <h1 className="name">{spot.name}</h1>
                <p className="address">{spot.address}, {spot.city}, {spot.state}</p>
                <div className="spot-images">
                    <div className="grid-item first-image">
                        <img src={spot.image_urls[0]} alt="Spot 1" />
                    </div>
                    {spot.image_urls.slice(1, 5).map((imageUrl, index) => (
                        <div key={index} className="grid-item square">
                            <img src={imageUrl} alt={`Spot ${index + 2}`} />
                        </div>
                    ))}
                    <button className="show-all-photos-button" onClick={handleShowAllPhotos}>
                        Show All Photos
                    </button>
                </div>
            </div>
            <div className="spot-info">
                <p className="description">{spot.description}</p>
                <p className="price">${spot.price} per night</p>
            </div>
        </div>
    );
}
