import React, { useState } from 'react';
import styles from '../components/login/styles.module.css'

const VerifyOTP = ({phoneNumber,handleVerifyOTP,handleResendOTP,setLogin}) => {
  const [otp, setOtp] = useState('');

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleChange=()=>{
    setLogin(false)
  }
  return (
    <div className={styles.top}>
        <div className={styles.heading}>OTP Verification</div>
        <div className={styles.sentence}>We have sent and OTP to {phoneNumber}. Please enter the code received to verify.</div>
        <div>
            <input className={styles.common} type="text" value={otp} onChange={handleInputChange} />
        </div>
        <button className={styles.signin} onClick={() => handleVerifyOTP(otp)}>Verify</button>
        <div style={{cursor:"pointer",marginBottom:'10px'}} onClick={()=>handleResendOTP()}>Resend OTP</div>
        <div style={{cursor:"pointer"}} onClick={()=>handleChange()}>Use another number</div>
    </div>
  );
};

export default VerifyOTP;
