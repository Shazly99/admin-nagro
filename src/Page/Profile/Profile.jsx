import axios from 'axios';
import Img from "constants/Img";

import { LocalizationContext } from 'context/LangChange';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu'; // 1. Import the Menu
import { Skeleton } from 'primereact/skeleton';
import { useContext, useEffect, useRef, useState } from 'react';
import UpdateInfo from './UpdateInfo';
import UpdatePassword from './UpdatePassword';
import './profile.scss';

const Profile = () => {

    let { isLang } = useContext(LocalizationContext);
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [isLaoding, setIsLaoding] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);

    const fetchProfileData = async () => {
        const url = `${process.env.REACT_APP_API_URL}/auth/profile`;
        let data = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
            },
        });
        setData(data?.data?.data);

        console.log(data);
        if (data?.status === 200) {
            setTimeout(() => {
                setIsLaoding(true)
            }, 200);
        }
    }

    useEffect(() => {
        fetchProfileData();
    }, [])
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const menuItems = [
        {
            label: 'Update Info',
            command: () => {
                setVisible(true)
            },
        },

        {
            label: 'Update Password',
            command: () => {
                setVisiblePassword(true)
            },

        },
    ];
    const onAvatarClick = (event) => {
        menuRef.current.show(event);
        setShowMenu(!showMenu);
    };
    return (
        <>

            <div className='card app__profile__picture my-5'>
                <div className="card flex justify-content-center gap-2 ">
                    <div className="relative">
                        {
                            isLaoding ?
                                <>
                                    {
                                        data?.image ?
                                            <Image className='border-round' src={data?.image} alt="Image" width="250" preview /> :
                                            <img src={Img.DefaultImage} alt="" srcset="" />
                                    }
                                </> :
                                <Skeleton size="250px"></Skeleton>
                        }
                        <div className='absolute btn_gapAr z-5' style={{ bottom: '-5px', right: '-5px' }} >
                            {isLaoding && <Button icon="pi pi-user-edit" aria-label="Notification" onClick={onAvatarClick} />}
                        </div>
                    </div>
                </div>

                <Menu
                    ref={menuRef}
                    model={menuItems}
                    popup
                    onHide={() => setShowMenu(false)}
                    id="popup_menu"
                    style={{ display: showMenu ? 'block' : 'none' }}
                    className='mt-2'
                />
                <UpdateInfo isLang={isLang} fetchProfileData={fetchProfileData} visible={visible} setVisible={setVisible} data={data} />
                <UpdatePassword isLang={isLang} visiblePassword={visiblePassword} setVisiblePassword={setVisiblePassword} />

                <div className="grid  mt-5  w-11  m-auto">
                    <div className="lg:col-6 md:col-12 sm:col-12 mt-2 input__Col ">
                        {
                            isLaoding ?
                                <label htmlFor="integer" className="font-bold block mb-2">
                                    {isLang === "en" ? 'Name' : 'الاســـم'}
                                </label> :
                                <Skeleton width="5rem" className="mb-3"></Skeleton>

                        }
                        {isLaoding ? <InputText id="integer" value={data?.name} type="text" className="w-full  p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}
                    </div>
                    <div className="lg:col-6 md:col-12 sm:col-12   mt-2 input__Col">

                        {
                            isLaoding ?
                                <label htmlFor="email" className="font-bold block mb-2">
                                    {isLang === "en" ? 'Email' : 'بريد الالكتروني'}
                                </label> :
                                <Skeleton width="5rem" className="mb-3"></Skeleton>
                        }
                        {isLaoding ? <InputText id="email" value={data?.email} type="email" className="w-full  p-inputtext-sm" /> : <Skeleton width="100%" height="3rem"></Skeleton>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
