import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import Img from "constants/Img";
import { LocalizationContext } from "context/LangChange.js";
import './Sidebar.scss';
import useRoutes from "./useRoutes";
const SidebarSM = ({ children }) => {

  let { isLang , isOpen,   setIsOpen } = useContext(LocalizationContext);
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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsOpen(false); 
      }else{
        setIsOpen(true);
      }
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <>
      <div className=" main-container_nav  " dir={isLang === 'ar' ? 'rtl' : 'ltr'}>
        <motion.div
          dir={isLang === 'ar' ? 'rtl' : 'ltr'}
          animate={{
            width: isOpen ? "250px" : "0px",
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
                    <Link to={'/'}  onClick={()=>setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
                      <img loading="lazy" src={Img.logo} alt='logo' width={129} height={78} />
                    </Link>
                  </motion.div>
                )}
         
              </AnimatePresence>
            </div>
            <section className={isLang === 'ar' ? 'routes routesAr' : 'routes'}   >
              {
                routes?.map((root, i) => { 
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
                      <NavLink to={root.path} onClick={()=>setIsOpen(!isOpen)} key={i} className="link " >
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

export default SidebarSM;