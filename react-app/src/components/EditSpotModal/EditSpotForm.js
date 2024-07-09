import React, { useState } from 'react';

function EditSpotForm({ spot, handleClose }) {
  const [description, setDescription] = useState(spot.description);

  const handleSave = () => {
    console.log(`Saving spot: ${spot.name}, Description: ${description}`);
    handleClose();
  };

  return (
    <div>
      <h2>Edit {spot.name}</h2>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClose}>Close</button>
    </div>
  );
}

export default EditSpotForm;
