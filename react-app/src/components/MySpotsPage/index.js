import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import './MySpots.css';
import NavBar from '../NavBar';

export default function MySpotsPage() {
  const dispatch = useDispatch();
  const user = useSelector(({ session }) => session.user);
  const spots = useSelector(({ spots }) =>
    Object.values(spots.spots).filter(spot => spot.ownerId === user.id)
  );

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
      <div className="my-listings-container">
        <NavBar />
      <h1>My Listings</h1>
      {spots.length > 0 ? (
        spots.map(spot => (
          <div key={spot.id} className="listing-item">
            <h2>{spot.name}</h2>
            <p>{spot.description}</p>
          </div>
        ))
      ) : (
        <p>You have no listings yet.</p>
      )}
    </div>
  );
}
