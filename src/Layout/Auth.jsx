import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
 
const Auth = () => {
 
    return (
        <>
            <div className="app__auth  " >
                <Outlet></Outlet>
            </div>
        </>
    )

}

export default Auth