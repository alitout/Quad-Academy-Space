import React from 'react'
import logo from '../../assets/QuadAcademyLogo.png';

function Logo() {
    return (
        <div className='logo d-flex flex-row align-items-center justify-content-center m-auto gap-2 flex-nowrap'>
            <img src={logo} alt="Logo"  style={{maxWidth: '3.5rem'}}/>
            <div className="name fs-1_5 fw-700 text-black text-nowrap d-none d-lg-flex">
                Quad Academy
            </div>
        </div>
    )
}

export default Logo;
