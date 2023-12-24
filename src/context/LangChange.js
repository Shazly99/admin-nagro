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
    if (localStorage.getItem('tokenNagro')) {
      const url = `${process.env.REACT_APP_API_URL}/auth/profile`;
      let { data } = await axios.get(url, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('tokenNagro'),
        }
      })
      console.log(data?.data);
      setProfile(data?.data);
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