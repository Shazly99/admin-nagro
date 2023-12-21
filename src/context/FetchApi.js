import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const FetchApi = createContext([]);

function FetchApiContext({ children }) {
  const [Profile, setProfile] = useState(true);
 
 
 


  // const [country, setCountry] = useState([]);  
  // async function fetchCountry() {
  //   let { data } = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/countries`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
  //       },
  //     }
  //   );
  //   setCountry(data?.Response);
  // }
  const fetchProfile = async () => {
    const url = `${process.env.REACT_APP_API_URL}/auth/profile`;
    let data = await axios.get(url,       {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
      },
    });
    setProfile(data?.data);
  }
  useEffect(() => {

    fetchProfile()

  }, [])

  return (
    <>
      <FetchApi.Provider
        value={{
          Profile, fetchProfile
        }}
      >
        {children}
      </FetchApi.Provider>
    </>
  );
}

export default FetchApiContext;
