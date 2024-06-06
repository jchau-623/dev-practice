import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useHistory } from 'react-router-dom';

export default function SpotList() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const handleSpotClick = (spot) => {
        // Redirect to the spot page
        history.push(`/spots/${spot.id}`); // Navigate to the spot page with the spot's ID
    };

    return (
        <div>
            {spots.map(spot => (
                <div key={spot.id} onClick={() => handleSpotClick(spot)}>
                    <h3>{spot.name}</h3>
                    <p>{spot.description}</p>
                    <p>${spot.price}</p>
                    <img src={spot.image_url} alt="Spot" />
                </div>
            ))}
        </div>
    );
}
