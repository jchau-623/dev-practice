import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import './SpotList.css';

export default function SpotList() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const handleSpotClick = (spot) => {
        history.push(`/spots/${spot.id}`);
    };

    return (
        <div className="spot-list">
            {spots.map(spot => (
                <div key={spot.id} className="spot-card" onClick={() => handleSpotClick(spot)}>
                    <img src={spot.image_url} alt="Spot" className="spot-image" />
                    <div className="spot-info">
                        <h3 className="spot-name">{spot.name}</h3>
                        <p className="spot-description">{spot.description}</p>
                        <p className="spot-price">${spot.price} per night</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
