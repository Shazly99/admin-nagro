import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import OurAbout from './OurAbout';
import OurBlogs from './OurBlogs';
import OurClients from './OurClients';
import OurFooter from './OurFooter';
import OurProjects from './OurProjects';
import OurServices from './OurServices';
import { LocalizationContext } from 'context/LangChange';
import HomeSlider from './HomeSlider';

const Settings = () => {
    let { isLang } = useContext(LocalizationContext);

    let { section } = useParams();
    const [data, setData] = useState('')
    const [isLaoding, setIsLaoding] = useState(false);
    const toast = useRef(null);


    const fetchDataSections = async () => {
        const url = `${process.env.REACT_APP_API_URL}/settings/get-data?section=${section}`;
        let data = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('tokenNagro'),
            },
        });
        setData(data?.data?.data);
        if (data?.status === 200) {
            setTimeout(() => {
                setIsLaoding(true)
            }, 200);
        }
    }
    useEffect(() => {
        fetchDataSections();
    }, [section])

    return (
        <>
            <Toast ref={toast} position={isLang === "en" ? 'top-right' : 'top-left'} />

            {
                section === 'about_us' &&
                <>
                    <OurAbout toast={toast} isLaoding={isLaoding} data={data} section={section} setIsLaoding={setIsLaoding} />
                </>
            }

            {
                section === 'home_slider' &&
                <>
                    <HomeSlider toast={toast} isLaoding={isLaoding} data={data} section={section} setIsLaoding={setIsLaoding} />
                </>
            }
            {
                section === 'our_clients' &&
                <>
                    <OurClients toast={toast} isLaoding={isLaoding} data={data} section={section} setIsLaoding={setIsLaoding} />
                </>
            }
            {
                section === 'why_us' &&
                <>
                    <OurProjects toast={toast} isLaoding={isLaoding} data={data} section={section} setIsLaoding={setIsLaoding} />
                </>
            }

            {
                section === 'our_services' &&
                <>
                    <OurServices toast={toast} isLaoding={isLaoding} data={data} section={section} setIsLaoding={setIsLaoding} />
                </>
            }

            {
                section === 'blogs' &&
                <>
                    <OurBlogs toast={toast} isLaoding={isLaoding} data={data} section={section} setIsLaoding={setIsLaoding} />
                </>
            }

            {
                section === 'footer' &&
                <>
                    <OurFooter toast={toast} isLaoding={isLaoding} data={data} section={section} setIsLaoding={setIsLaoding} />
                </>
            }
        </>
    )
}

export default Settings
