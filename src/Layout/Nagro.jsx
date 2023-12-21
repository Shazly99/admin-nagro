 


import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarSM from 'Components/Sidebar/SidebarSM';
import { LocalizationContext } from 'context/LangChange';
import Component from 'constants/Component';

function Nagro() {
  let { isOpen ,isLang} = useContext(LocalizationContext);

  useEffect(() => {
   

   }, [isOpen])
  return (
    <>
      <div className="vender "  >
        <div className='flex'> 
          <Component.Sidebar />
          <SidebarSM/>
          <motion.div 
            className='adminLayout'
            animate={{
              width: isOpen ? `calc( 100% - 250px)` : `calc( 100% - 50px )`,
              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
          >
            <main className='w-full   h-screen   m-0 p-0 '>
              <Component.Navber />
               <div className='p-2 '  >  
                <Outlet></Outlet>
               </div>  
            </main>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Nagro
