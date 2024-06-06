import React, { useEffect, useState } from 'react';
import SpotList from '../SpotList';
import IconRibbon from '../IconRibbon';

export default function HomePage() {
  // Use state to store spots data
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    // Fetch spots data from your API endpoint
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the fetched data
        setSpots(data.spots); // Update spots state with the array of spots
      })
      .catch(error => console.error('Error fetching spots:', error)); // Log any fetch errors
  }, []);

  return (
    <div>
      <IconRibbon />
      <SpotList spots={spots} />
    </div>
  );
}
