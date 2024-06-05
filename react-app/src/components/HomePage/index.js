import React, { useEffect, useState } from 'react';
import SpotList from '../SpotList';

export default function HomePage() {
  // Use state to store spots data
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // Fetch spots data from your API endpoint
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => setSpots(data));
  }, []);

  return (
    <div>
      <SpotList spots={spots} />
    </div>
  );
}
