import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useParams } from 'react-router-dom';
import './SpotPage.css';

export default function SpotPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    useEffect(() => {
        if (spotId) {
            dispatch(getSpots(spotId));
        }
    }, [dispatch, spotId]);

    if (!spot) {
        return <div>Loading...</div>;
    }

    const images = spot.images || [];

    return (
        <div className="spot-page">
            <div className="spot-header">
                <h1 className="name">{spot.name}</h1>
                <p className="address">{spot.address}, {spot.city}, {spot.state}</p>
                <img src={spot.image_url} alt={spot.name} />
            </div>
            <div className="spot-grid">
                {images.map((image, index) => (
                    <div key={index} className={`grid-item grid-item-${index}`}>
                        <img src={image.url} alt={`Spot ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className="spot-info">
                <p className="description">{spot.description}</p>
                <p className="price">${spot.price} per night</p>
            </div>
        </div>
    );
}
