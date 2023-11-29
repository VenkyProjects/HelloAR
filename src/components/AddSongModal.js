// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import styles from './styles.module.css'

// Modal.setAppElement('#root');

// const AddSongModal = ({ isOpen, onClose, onAddSong }) => {
//   const [songName, setSongName] = useState('');
//   const [songUrl, setSongUrl] = useState('');
//   const [songSource, setSongSource] = useState('');
//   const [thumbnail, setThumbnail] = useState('');
//   const[file,setFile]=useState(null)

//   const handleAddSong = () => {
//     // Validate input fields before adding the song
//     if (songName && songUrl && songSource) {
//       const newSong = {
//         name: songName,
//         url: songUrl,
//         source: songSource,
//         thumbnail: thumbnail,
//       };

//       onAddSong(newSong);
//       // Clear input fields after adding the song
//       setSongName('');
//       setSongUrl('');
//       setSongSource('');
//       setThumbnail('');
//       onClose(); // Close the modal
//     } else {
//       // Handle validation errors
//       alert('Please fill in all the required fields.');
//     }
//   };
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Add Song Modal"
//     >
//         <div className={styles.modal_header}>
//             <p>Add Song</p>
//         <span className={styles.close} onClick={onClose}>&times;</span>
//         </div>
//       <div className={styles.form_row}>
//         <label>Song Name</label>
//         <input placeholder='Song Name' type="text" value={songName} onChange={(e) => setSongName(e.target.value)} />
//       </div>
//       <div className={styles.form_row}>
//         <label>Song URL</label>
//         <input placeholder='Song URL' type="text" value={songUrl} onChange={(e) => setSongUrl(e.target.value)} />
//       </div>
//       <div className={styles.form_row}>
//         <label>Song Source</label>
//         <input placeholder='Song Source' type="text" value={songSource} onChange={(e) => setSongSource(e.target.value)} />
//       </div>
//       <div className={styles.form_row}>
//         <label>Thumbnail URL</label>
//         {/* <input type="file-upload" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} /> */}
//         <input type="file" onChange={handleFileChange} />
//       </div>
//       <div className={styles.form_row}>
//         <button onClick={handleAddSong}>Add</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </Modal>
//   );
// };

// export default AddSongModal;
import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.css'

Modal.setAppElement('#root');

const AddSongModal = ({ isOpen, onClose, onAddSong }) => {
  const [formData, setFormData] = useState({
    songname: '',
    songurl: '',
    songsource: '',
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: selectedFile,
    }));
  };

  const handleAddSong = (e) => {
    e.preventDefault();

    // Validate input fields before adding the song
    if (formData.songname && formData.songurl && formData.songsource && formData.file) {
      onAddSong(formData);
      // Clear form data after adding the song
      setFormData({
        songname: '',
        songurl: '',
        songsource: '',
        file: null,
      });
      onClose(); // Close the modal
    } else {
      alert('Please fill in all the required fields.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Song Modal"
      className={styles.modal}
    >
      <div className={styles.modal_header}>
        <div className={styles.addsong}>Add Song</div>
        <span className={styles.close} onClick={onClose}>&times;</span>
      </div>
      <form className={styles.form} onSubmit={handleAddSong}>
        <div className={styles.form_row}>
          <label>Song Name*</label>
          <input
            placeholder='Song Name'
            type="text"
            name="songname"
            value={formData.songname}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form_row}>
          <label>Song URL*</label>
          <input
            placeholder='Song URL'
            type="text"
            name="songurl"
            value={formData.songurl}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form_row}>
          <label>Song Source*</label>
          <input
            placeholder='Song Source'
            type="text"
            name="songsource"
            value={formData.songsource}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.form_row}>
          <label>Upload File*</label>
          <input className={styles.fileInput} name="file" type="file" onChange={handleFileChange} />
        </div>
        <div className={styles.modal_footer}>
            <button className={styles.cancelbutton} type="button" onClick={onClose}>Cancel</button>
            <button className={styles.addbutton} type="submit">Add</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSongModal;

