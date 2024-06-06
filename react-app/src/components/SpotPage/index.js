import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useParams } from 'react-router-dom';

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

    return (
        <div className="spot-card">
            <div className="spot-details">
                <div className="name">{spot.name}</div>
                <div className="address">{spot.address}, {spot.city}, {spot.state}</div>
                <div className="description">{spot.description}</div>
                <div className="price">${spot.price} per night</div>
                <div className="image">
                    <img src={spot.image_url} alt={spot.name} />
                </div>
            </div>
        </div>
    );
}
