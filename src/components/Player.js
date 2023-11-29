import React from 'react';

const Player = ({ currentSong, handlePlayPause, handlePrevious, handleNext, handleSeek }) => {
  return (
    <div>
      <h2>Player</h2>
      <p>Now Playing: {currentSong?.title}</p>
      <button onClick={handlePlayPause}>Play/Pause</button>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <input type="range" min="0" max="100" onChange={handleSeek} />
    </div>
  );
};

export default Player;
