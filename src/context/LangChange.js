import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
export const LocalizationContext = createContext([])

function LangChange({ children }) {

  const [isLang, setIsLang] = useState(Cookies.get('i18next'));
  const [isOpen, setIsOpen] = useState(true);
  const [Profile, setProfile] = useState(true);
  const [userLocationMap, setLoctionMap] = useState(null);


  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    Cookies.set('i18next', isLang)
  }, [isLang])

  async function LogOut() {
    localStorage.removeItem("tokenNagro");
  }
  async function getdata() {
    if (localStorage.getItem('IDUser')) {
      const url = `${process.env.REACT_APP_API_URL}/users/profile/${localStorage.getItem('IDUser')}`;
      let { data } = await axios.get(url, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
        }
      })
      setProfile(data?.Response);
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  const [markers, setMarkers] = useState([]);
  return (
    <LocalizationContext.Provider value={{
      userLocationMap,
      setLoctionMap,
      isLang,
      setIsLang,
      isOpen,
      setIsOpen,
      toggle,
      Profile,
      LogOut,
      markers, setMarkers
    }}>
      {children}
    </LocalizationContext.Provider>
  )
}

export default LangChange