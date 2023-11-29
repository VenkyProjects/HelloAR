import React, { useState } from 'react';
import Login from '../src/components/login/index';
import VerifyOTP from './components/VerifyOTP';
import SongsList from './components/songsList/index';
import Axios from 'axios';

const App = () => {
  const [phoneNumberEntered, setPhoneNumberEntered] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [login,setLogin]=useState(false)
  const [songs, setSongs] = useState([]);
  const[requestId,SetRequestId]=useState()
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  console.log(requestId,phoneNumberEntered,'requestId');

  const handleVerifyOTP = async (otp) => {
    try {
      const response = await Axios.post(`https://dev.api.goongoonalo.com/v1/auth/verify_otp`, {
        phoneNumber: phoneNumberEntered,
        requestId:requestId?.data.requestId,
        otp: otp,
      });
      console.log(response)
      setOtpVerified(true);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOTP = () => {
    alert("Otp Sent Succesfully")
  };

  const handleAddSong = (formData) => {
    const newSong = {
      id: songs.length + 1,
      songname:formData?.songname,
      songurl:formData?.songurl,
      songsource:formData?.songsource,
      file:formData?.file
    };
    setSongs([...songs, newSong]);
  };

  return (
    <div>
      {!otpVerified && !login && (
        <Login setLogin={setLogin} SetRequestId={SetRequestId} setPhoneNumberEntered={setPhoneNumberEntered}/>
      )}
      {login && !otpVerified && (
        <VerifyOTP
          phoneNumber={phoneNumberEntered}
          handleVerifyOTP={handleVerifyOTP}
          handleResendOTP={handleResendOTP}
          setLogin={setLogin}
        />
      )}
      {otpVerified && (
        <>
          <SongsList songs={songs} handleAddSong={handleAddSong} setIsAddSongModalOpen={setIsAddSongModalOpen} isAddSongModalOpen={isAddSongModalOpen} setSongs={setSongs} setOtpVerified={setOtpVerified} setLogin={setLogin}/>
        </>
      )}
    </div>
  );
};

export default App;
