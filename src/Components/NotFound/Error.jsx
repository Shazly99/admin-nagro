import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

const Error = () => {
    return (
        <>
            <div className="app__error">
                <Player
                    // src="https://assets3.lottiefiles.com/packages/lf20_ZJR0xnKKys.json"
                    src='https://assets9.lottiefiles.com/packages/lf20_aaesnvcw.json'
                    autoplay
                    loop
                />
            </div>
        </>
    )
}

export default Error