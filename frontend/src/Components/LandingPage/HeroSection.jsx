import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Menu01 from '@untitled-ui/icons-react/build/cjs/Menu01';
import HeroImage from '../../assets/heroImage.svg';

function HeroSection() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='container HeroSection d-flex flex-column'>
            <div className="navbar d-flex justify-content-around justify-content-sm-between py-4 py-lg-5">
                <div className="logo">
                    <Logo />
                </div>
                <div className="navLinks d-none d-lg-flex gap-3 gap-lg-5 text-gray-900 fs-1_125 fw-600 ">
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
            <div className="heroContent d-flex align-items-center justify-content-center justify-content-md-between">
                <div className="heroText text-center text-md-start d-flex flex-column col-8 col-md-4 z-1">
                    <div className="txt d-flex flex-column gap-2">
                        <div className="text-blue-900 fw-900 fs-1">
                            The <span className='text-orange-500'>Smart</span>
                            <br />
                            Choice For <span className='text-orange-500'>Future</span>
                        </div>
                        <div className="text-gray-500 fs-1_25">
                            Elearn is a global training provider based across the UK that specialises in accredited and bespoke training courses. We crush the...
                        </div>
                    </div>
                    
                </div>
                <div className="heroImg d-none d-md-flex justify-content-end col-7 z-0">
                    <img src={HeroImage} alt="" className="w-100" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection;