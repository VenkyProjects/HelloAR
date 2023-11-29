import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styles from './styles.module.css'

const Login = ({ setLogin, SetRequestId }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  console.log(countries,'countries');

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await Axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await Axios.post('https://dev.api.goongoonalo.com/v1/auth/login', {
        phoneNumber: `${selectedCountry}${phoneNumber}`,
      });

      setLogin(true);
      SetRequestId(response);
      console.log(response, 'response123');
      // Handle the response, update state, etc.
    } catch (error) {
      // Handle errors
      console.error('Login error:', error);
    }
  };

  const handleInputChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleCountryChange = (e) => {
    console.log('Selected Country:', e.target.value);
    setSelectedCountry(e.target.value);
  };

  return (
    <div className={styles.top}>
      <div className={styles.heading}>Sign In</div>
      <div className={styles.sentence}>Please enter your mobile number to login.We will send an OTP to verify your mobile number.</div>
      <div>
      <label>
        <select onChange={handleCountryChange} value={selectedCountry}>
          {countries.map((country) => (
            <option key={country.cca2} value={`${country?.idd?.root}${country?.idd?.suffixes?.[0] || ''}`}>
              {country.flags && country.flags.png && (
                <img src={country.flags.png} alt={country?.name?.common || ''} />
              )}
              {country.name && country.name.common
                ? `${country.name.common} (${country?.idd?.root}${country?.idd?.suffixes?.[0] || ''})`
                : ''}
            </option>
          ))}
        </select>
      </label>
      <label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={handleInputChange}
        />
      </label>
      </div>
      <br />
      <button className={styles.signin} onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default Login;

