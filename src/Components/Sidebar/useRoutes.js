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
            path: "/categories",
            nameAr: "الاقسام",
            nameEn: "Categories",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/products",
            nameAr: "المنتجات",
            nameEn: "Products",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/slider",
            nameEn: "Sliders",
            nameAr: "الصفحه الرئسيه",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/features",
            nameEn: "Features",
            nameAr: "الميزات",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/values",
            nameEn: "Our values",
            nameAr: "قيمنا",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/offers",
            nameEn: "Offers",
            nameAr: "عروض",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/qualities",
            nameEn: "Our Qualities",
            nameAr: "جودتنا",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/goals",
            nameEn: "Our Goals",
            nameAr: "هدفنـــا",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/about",
            nameEn: "About us",
            nameAr: "مــن نــحن ",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/clients",
            nameEn: "Clients",
            nameAr: "عمــلائــنا",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/services",
            nameEn: "Services",
            nameAr: "خدمــاتــنا",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/locations",
            nameEn: "Locations",
            nameAr: "المواقع",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },
        {
            path: "/contact-us",
            nameAr: "اتصــال",
            nameEn: "Contact Us",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
        },

        {
            nameAr: "الاعدادات   ",
            nameEn: "Settings ",
            icon: <LogoSvg.Dote className="logoSvg" style={{ width: 17 }} />,
       
            subRoutes: [
                {
                    path: "/settings/about_us",
                    nameAr: "مــن نــحن",
                    nameEn: "About us",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                    path: "/settings/our_clients",
                    nameAr: " عمــلائــنا  ",
                    nameEn: "Our clients",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                    path: "/settings/our_projects",
                    nameAr: "مشارعنا",
                    nameEn: "Our projects",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                {
                    path: "/settings/our_services",
                    nameAr: "خدماتنا",
                    nameEn: "Our services",
                    icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                },
                // {
                //   path: "/settings/blogs",
                //   nameAr: "مدوناتنا",
                //   nameEn: "blogs",
                //   icon: <LogoSvg.Dote className="logoSvg" style={{ width: 7 }} />,
                // },
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
