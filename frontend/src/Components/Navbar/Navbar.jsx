import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Menu01 from '@untitled-ui/icons-react/build/cjs/Menu01';


function Navbar() {

    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='container d-flex flex-column justify-content-between'>
            <div className="navbar d-flex justify-content-around justify-content-sm-between">
                <div className="logo">
                    <Logo />
                </div>
                <div className="navLinks d-none d-lg-flex gap-3 gap-lg-5 fs-1_125 fw-600 ">
                    <a href='#' className='navLink text-decoration-none text-gray-900'>
                        Home
                    </a>
                    <a href='#' className='navLink text-decoration-none text-gray-900'>
                        Programs
                    </a>
                    <a href='#' className='navLink text-decoration-none text-gray-900'>
                        Master Classes
                    </a>
                    <a href='#' className='navLink text-decoration-none text-gray-900'>
                        Community
                    </a>
                    <a href='#' className='navLink text-decoration-none text-gray-900'>
                        Academy Coffee Space
                    </a>
                </div>
                <div className="mobile-menu-button d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <Menu01 />
                </div>
                <div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-body">
                        <div className="d-flex flex-column align-items-center text-center gap-3 fs-1_125 fw-600">
                            <a href='#' className='navLink text-decoration-none text-gray-900'>
                                Home
                            </a>
                            <a href='#' className='navLink text-decoration-none text-gray-900'>
                                Programs
                            </a>
                            <a href='#' className='navLink text-decoration-none text-gray-900'>
                                Master Classes
                            </a>
                            <a href='#' className='navLink text-decoration-none text-gray-900'>
                                Community
                            </a>
                            <a href='#' className='navLink text-decoration-none text-gray-900'>
                                Academy Coffee Space
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Navbar;