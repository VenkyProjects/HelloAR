import React, { useState, useEffect } from 'react';
import AddSongModal from '../AddSongModal';
import styles from './styles.module.css';

const SongsList = ({setSongs, songs, setIsAddSongModalOpen, isAddSongModalOpen, handleAddSong,setOtpVerified,setLogin }) => {
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const newIndex = currentSongIndex - 1;
    if (newIndex >= 0) {
      setCurrentSongIndex(newIndex);
      playCurrentSong();
    }
  };

  const handleNext = () => {
    const newIndex = currentSongIndex + 1;
    if (newIndex < songs.length) {
      setCurrentSongIndex(newIndex);
      playCurrentSong();
    }
  };

  const playCurrentSong = () => {
    const currentSong = songs[currentSongIndex];
    setCurrentSong(currentSong)
    if (currentSong) {
      audio.src = currentSong.songurl;
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  useEffect(() => {
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('durationchange', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('durationchange', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [audio]);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    audio.src = song?.songurl;
    audio.load();
    audio.play();
    setIsPlaying(true);
  };

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const handleDelete = (songId) => {
    const updatedSongs = songs.filter((song) => song.id !== songId);
    setSongs(updatedSongs);
  };
  const handleLogout=()=>{
    setOtpVerified(false)
    setLogin(false)
  }
  return (
    <div className={styles.top}>
      <div className={styles.container}>
        <div className={styles.first}>
          <div className={styles.logo}>Logo</div>
        </div>
        <div onClick={()=>handleLogout()} className={styles.logout}>
        <img style={{width:"30px",height:"30px"}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOVagr5XSeF5ZX8l6WVbNM_m4rLjAvL6OJw&usqp=CAU' alt='img'/>
          <p>Logout</p>
        </div>
      </div>
      
      <div className={styles.second}>
        <div className={styles.addsong}>
          <button className={styles.addButton} onClick={() => setIsAddSongModalOpen(true)}>
            Add Songs
          </button>
        </div>
        <AddSongModal isOpen={isAddSongModalOpen} onClose={() => setIsAddSongModalOpen(false)} onAddSong={handleAddSong} />
        <div className={styles.tableContainer}>
          <table className={styles.fullWidthTable}>
            <thead>
              <tr>
                <th>SONG NAME</th>
                <th>SOURCE</th>
                <th>ADDED ON</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td className={styles.firstdata}>
                    <img style={{width:"30px",height:"30px"}} src="https://static.vecteezy.com/system/resources/thumbnails/020/407/103/small/music-note-icon-line-isolated-on-white-background-black-flat-thin-icon-on-modern-outline-style-linear-symbol-and-editable-stroke-simple-and-pixel-perfect-stroke-illustration-vector.jpg" alt="img"/>
                    <div>{song.songname}</div>
                  </td>
                  <td>{song.songsource}</td>
                  <td>{formattedDate}</td>
                  <td onClick={() => handlePlaySong(song)}>
                    <img style={{width:"30px",height:"30px",cursor:'pointer'}} src="https://cdn-icons-png.flaticon.com/512/148/148744.png" alt="img"/>
                  </td>
                  <td>
                  <img onClick={()=>handleDelete(song.id)} style={{width:"30px",height:"30px",cursor:'pointer'}} src="https://as2.ftcdn.net/v2/jpg/03/06/79/01/1000_F_306790187_EkyDKfXPuLKZk2ANpWd5Taly3Jxt25L6.jpg" alt="img"/>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
        
        <div className={styles.audioControls}>
          <div className={styles.controlsWrapper}>
            <input type="range" value={(currentTime / duration) * 100 || 0} onChange={handleSeek} />
            <div className={styles.subpart}>
            {currentSong && (
              <div className={styles.currentSongInfo}>
                <img style={{width:"30px",height:"30px"}} src="https://static.vecteezy.com/system/resources/thumbnails/020/407/103/small/music-note-icon-line-isolated-on-white-background-black-flat-thin-icon-on-modern-outline-style-linear-symbol-and-editable-stroke-simple-and-pixel-perfect-stroke-illustration-vector.jpg" alt="img"/>
                <p>{currentSong.songname}</p>
              </div>
              
            )}
            <div className={styles.controls}>
              <button onClick={handlePrevious}>
              <img style={{width:"10px",height:"10px",cursor:'pointer'}} src="https://cdn0.iconfinder.com/data/icons/audio-and-video-outline-1/24/audio_-27-512.png" alt="img"/>
              </button>
              <button onClick={handlePlayPause}>{isPlaying ? 
              <img style={{width:"10px",height:"10px",cursor:'pointer'}} src="https://cdn0.iconfinder.com/data/icons/music-and-video-player/32/Music_And_Video_Player_Outline_Play-256.png" alt="img"/>
              : 
              <img style={{width:"10px",height:"10px",cursor:'pointer'}} src="https://cdn0.iconfinder.com/data/icons/music-and-video-player/32/Music_And_Video_Player_Outline_Pause-256.png" alt="img"/>
              }</button>
              <button onClick={handleNext}>
              <img style={{width:"10px",height:"10px",cursor:'pointer'}} src="https://cdn0.iconfinder.com/data/icons/music-and-video-player/32/Music_And_Video_Player_Outline_Next-06-256.png" alt="img"/>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SongsList;


