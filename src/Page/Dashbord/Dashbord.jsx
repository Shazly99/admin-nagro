import React, { useContext } from 'react';
import './Dashboard.scss'; 
import { LocalizationContext } from '../../context/LangChange';
function Dashboard() { 
    let { isLang } = useContext(LocalizationContext);

    return (
        <>

            <div className="welcome__page   bg-body  " style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
                <div className="title_Dynamic   border-round shadow  rounded-3">
                    <h3> {isLang==="en"?'Dashboard Nagro  ':'Dashboard Nagro  '}   </h3>
                </div>
            </div>

        </>
    )
}

export default Dashboard