import { useEffect } from 'react';

import LogoSvg from "constants/LogoSvg";

const useRoutes = () => {
    useEffect(() => {
        localStorage.getItem('IDBrand')

    }, [])

    const routes = [
        {
            path: "",
            nameEn: "Dashboard",
            nameAr: "لوحة القيادة",
            icon: <LogoSvg.Dashboard className="logoSvg" style={{ width: 17 }} />,
        },
 
      
        {
            path: "/about",
            nameEn: "About us",
            nameAr: "مــن نــحن ",
            icon: <LogoSvg.Aboutus className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/why-us",
            nameEn: "Why us",
            nameAr: "لماذا نحن",
            icon: <LogoSvg.Home className="logoSvg" style={{ width: 17 }} />,
        },

        {
            path: "/contributors",
            nameEn: "Contributors",
            nameAr: "المساهمين",
            icon: <i className='pi pi-users'></i>,
        },

        {
            path: "/services",
            nameEn: "Services",
            nameAr: "خدماتنا",
            icon: <LogoSvg.Service className="logoSvg" style={{ width: 17 }} />,
            
        },
        {
            path: "/blogs",
            nameEn: "Blogs",
            nameAr: "الاخبار و المقالات",
            icon: <LogoSvg.Blogs className="logoSvg" style={{ width: 17 }} />,
            
        },

        {
            path: "/books",
            nameEn: "Books",
            nameAr: " مؤلفاتنا",
            icon: <LogoSvg.Blogs className="logoSvg" style={{ width: 17 }} />,
        },
 
        {
            path: "/clients",
            nameEn: "Clients",
            nameAr: "عملائنا",
            icon: <LogoSvg.Clients className="logoSvg" style={{ width: 17 }} />,
            
        },
 
     
        {
            path: "/contact-us",
            nameAr: "اتصــال",
            nameEn: "Contact Us",
            icon: <LogoSvg.Contact className="logoSvg" style={{ width: 17 }} />,
        },

        {
            nameAr: "الاعدادات",
            nameEn: "Settings ",
            icon: <LogoSvg.Projects className="logoSvg" style={{ width: 17 }} />,
       
            subRoutes: [
                {
                    path: "/settings/about_us",
                    nameAr: "مــن نــحن",
                    nameEn: "About us",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },

                {
                    path: "/settings/home_slider",
                    nameAr: "الرئيسية",
                    nameEn: "Home slider",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                    path: "/settings/our_clients",
                    nameAr: " عمــلائــنا  ",
                    nameEn: "Our clients",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                    path: "/settings/why_us",
                    nameAr: "لماذا نحن",
                    nameEn: "Why us",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                    path: "/settings/our_services",
                    nameAr: "خدماتنا",
                    nameEn: "Our services",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                  path: "/settings/blogs",
                  nameAr: "الاخبار و المقالات",
                  nameEn: "Our Blogs",
                  icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                    path: "/settings/footer",
                    nameAr: "نهاية الصفحه",
                    nameEn: "Footer",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
            ],
        },
    ];
    return {
        routes
    }
}


export default useRoutes;
