import React, { useEffect, useState } from 'react';
import SpotList from '../SpotList';
import IconRibbon from '../IconRibbon';

export default function HomePage() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => {
        setSpots(data.spots);
      })
      .catch(error => console.error('Error fetching spots:', error));
  }, []);

  return (
    <div>
      <IconRibbon />
      <SpotList spots={spots} />
    </div>
  );
}
