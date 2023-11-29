import React, { useState } from 'react';

const AddSong = ({ handleAddSong }) => {
  const [newSong, setNewSong] = useState('');

  const handleInputChange = (e) => {
    setNewSong(e.target.value);
  };

  return (
    <div>
      <h2>Add a Song</h2>
      <input
        type="text"
        placeholder="Enter the song title"
        value={newSong}
        onChange={handleInputChange}
      />
      <button onClick={() => handleAddSong(newSong)}>Add Song</button>
    </div>
  );
};

export default AddSong;
