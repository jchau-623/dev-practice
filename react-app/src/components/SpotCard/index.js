import React from 'react';

export default function SpotCard({ spot }) {
  return (
    <div className="spot-card">
      <div className="spot-details">
        <div className="name">{spot.name}</div>
        <div className="address">{spot.address}, {spot.city}, {spot.state}</div>
        <div className="description">{spot.description}</div>
        <div className="price">${spot.price} per night</div>
      </div>
    </div>
  );
}
