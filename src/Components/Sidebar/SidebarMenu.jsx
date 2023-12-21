import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
 
const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarMenu = ({ isLang, route, onClick, showAnimation, isOpen, setIsOpen }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);

  };

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen, isLang]);
  return (
    <>
      <div className="menu " onClick={toggleMenu} style={{ [isLang === 'en' ? 'paddingRight' : 'paddingLeft']: '20px' }} >
        <div className="menu_item">
          <span className={`link ${isMenuOpen ? 'link_text' : ''}`}>
            <div className="icon">{route.icon}</div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text"
                >
                  {isLang === 'ar' ? route.nameAr : route.nameEn}

                </motion.div>
              )}
            </AnimatePresence>
          </span>
        </div>
        {isOpen && (
          <motion.div
            className="angleDown flex justify-content-center align-items-center"
            animate={
              !isMenuOpen
                ? {
                  rotate: isLang === 'ar' ? 90 : -90,
                }
                : { rotate: 0 }
            }
          >
           
            <i className="pi pi-angle-down"></i>
          </motion.div>
        )}
      </div>{" "}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container "
          // style={{marginTop:'0.5px'}}
          >
            {route.subRoutes.map((subRoute, i) => {
            
              return (
                <motion.div variants={menuItemAnimation} key={i} custom={i}>
                  <NavLink to={subRoute.path} onClick={onClick} className="link" style={{ [isLang === 'ar' ? 'marginRight' : 'marginLeft']: '12px' }} >

                    <div className="icon">{subRoute.icon}</div>
                    <motion.div className="link_text " style={{ fontSize: 16 }}>{subRoute.name}
                      {isLang === 'ar' ? subRoute.nameAr : subRoute.nameEn} 
                    </motion.div>
                  </NavLink>
                </motion.div>
              )
            }
            )}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
