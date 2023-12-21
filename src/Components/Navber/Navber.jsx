import { LocalizationContext } from 'context/LangChange';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { TieredMenu } from 'primereact/tieredmenu';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Navber.scss';


const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
]

function Navber() {
  let { LogOut, isOpen, setIsOpen, isLang, setIsLang, Profile } = useContext(LocalizationContext);

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  const handleLanguageChange = async (newLanguage) => {
    setIsLang(newLanguage);
  }
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr';
  }, [currentLanguage, t])

  const onAvatarClick = (event) => {
    menuRef.current.show(event);
    setShowMenu(!showMenu);
  };
  const items = [
    {
      label: isLang === 'en' ? 'Change Lang' : 'تغير اللغة',
      icon: 'pi pi-fw pi-globe ',
      items: [
        {
          label: 'عربيه',
          icon: isLang === 'ar' ? 'pi pi-fw  pi-check' : ' ',
          command: () => {
            handleLanguageChange('ar')
            i18next.changeLanguage('ar')
          },

        },
        {
          label: 'English',
          icon: isLang === 'en' ? 'pi pi-fw  pi-check' : ' ',
          command: () => {
            handleLanguageChange('en')
            i18next.changeLanguage('en')
          },

        },
      ]
    },
  ];

  const start = <Button rounded severity="warning" style={{ width: '35px', height: '35px' }} outlined text raised className='mr-2 ml-2' onClick={() => setIsOpen(!isOpen)} icon="pi pi-bars" size='small' />
  const end = <Avatar onClick={onAvatarClick} label={Profile?.UserName?.charAt(0)?.toUpperCase()} size="mediam" style={{ backgroundColor: '#C4AB73', color: '#ffffff' }} />

  const menuItems = [

    {
      label: <Link to="/profile"> {isLang === 'en' ? 'Profile' : 'الملف الشخصي'}</Link>,

      icon: 'pi pi-fw pi-user',
      command: () => {
        // LogOut();

      },
    },

    {
      label: <Link to="/admin/login"> {isLang === 'en' ? 'Logout' : 'تسجيل خروج  '}</Link>,
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        LogOut();
      },

    },
    {
      label: isLang === 'en' ? 'Change Lang' : 'تغير اللغة',
      icon: 'pi pi-fw pi-globe ',
      items: [
        {
          label: 'عربيه',
          icon: isLang === 'ar' ? 'pi pi-fw  pi-check' : ' ',
          command: () => handleLanguageChange('ar'),

        },
        {
          label: 'English',
          icon: isLang === 'en' ? 'pi pi-fw  pi-check' : ' ',
          command: () => handleLanguageChange('en'),

        },
      ]
    },
    { separator: true },
    {
      template: (item, options) => {
        return (
          <button onClick={(e) => options.onClick(e)} className={'w-full p-link flex align-items-center px-3 pb-3 pt-3'}>
            <Avatar image={Profile?.image} className="mr-2" shape="circle" />
            <div className="flex flex-column align">
              <span className="font-bold">{Profile?.name}</span>
              <span className="text-sm">{Profile?.email}</span>
            </div>
          </button>
        )
      }

    },
  ];
  return (
    <div className=" shadow-1 navbar-primereact w-full" dir={isLang == "en" ? 'ltr' : 'rtl'}>
      <Menubar model={items} end={<div className="p-menu-list	">{end}</div>} start={start} />
      <TieredMenu
        ref={menuRef}
        model={menuItems}
        popup
        onHide={() => setShowMenu(false)}
        id="popup_menu"
        style={{ display: showMenu ? 'block' : 'none' }}
        className='mt-2'
      />
    </div>
  )

}

export default Navber