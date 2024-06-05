import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spots';

export default function SpotList() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    return (
        <div>
            {spots.map(spot => (
                <div key={spot.id}>
                    <h3>{spot.name}</h3>
                    <p>{spot.description}</p>
                    <p>{spot.price}</p>
                </div>
            ))}
        </div>
    );
}
