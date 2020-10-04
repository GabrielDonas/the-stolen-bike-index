import React from 'react'
import '../assets/loader.css';


const LoadingPage = () => {
    return (
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingPage
