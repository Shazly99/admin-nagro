import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import Img from "constants/Img";
import { LocalizationContext } from "context/LangChange.js";
import './Sidebar.scss';
import SidebarMenu from "./SidebarMenu"; 
import useRoutes from "./useRoutes";

const Sidebar = ({ children }) => {
  let { isLang, isOpen, setIsOpen } = useContext(LocalizationContext)

  let { routes } = useRoutes()

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.4, when: "afterChildren" },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
      },
    },
  };


  return (
    <>
      <div className="main-container " dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
        <motion.div
          dir={isLang === 'ar' ? 'rtl' : 'ltr'}
          animate={{
            width: isOpen ? "250px" : "50px",
            background: '#000',
            transition: {
              duration: 0.7,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar  `}
        >
          <div className="side   " style={{ [isLang === 'ar' ? 'right' : 'left']: 0 }}>
            <div className="top_section  ">
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo mt-3"
                    key={1}
                  >
                    <Link to={'/'} style={{ cursor: 'pointer' }}>
                      <img loading="lazy" src={Img.logo} alt='logo' width={180} />
                    </Link>
                  </motion.div>
                )}
                <div className="bars mt-1">
                  {/* <Button className="p-menubar-button">  */}
                  {/* <i onClick={toggle} className="pi pi-bars  text-white"></i> */}
                  {/* </Button> */}
                </div>
              </AnimatePresence>
            </div>
            <section className={isLang === 'ar' ? 'routes routesAr' : 'routes'}   >
              {
                routes?.map((root, i) => {
                  if (root.subRoutes) {
                    return (
                      <SidebarMenu
                        key={i}
                        setIsOpen={setIsOpen}
                        route={root}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                        open={isOpen}
                        isLang={isLang}
                      />
                    );
                  }
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        transition: {
                          duration: 2,
                          damping: 10
                        }
                      }}
                    >
                      <NavLink to={root.path} key={i} className="link " >
                        <div className="icon" id={root.name} data-tooltip-content={isLang === 'ar' ? root.nameAr : root.nameEn}>
                          {root.icon}
                        </div>
                        <AnimatePresence>
                          {
                            isOpen &&
                            <>
                              <motion.div
                                variants={showAnimation
                                }
                                initial={"hidden"}
                                animate={"show"}
                                exit={"hidden"}
                                className="link_text"
                              >
                                {isLang === 'ar' ? root.nameAr : root.nameEn}
                              </motion.div>
                            </>
                          }
                        </AnimatePresence>
                      </NavLink>
                    </motion.div>
                  )
                })
              }
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Sidebar;