import React from 'react'
import HeroSection from '../Components/LandingPage/HeroSection';
import Highlights from '../Components/LandingPage/Highlights';
import Navbar from '../Components/Navbar/Navbar';

function LandingPage() {
    return (
        <div className=''>
            <div className="Navbar bg-beige-100">
                <Navbar />
            </div>
            <div className="HeroSection bg-beige-100 pb-md-5">
                <HeroSection />
            </div>
            <div className="Highlights bg-beige-100">
                <Highlights />
            </div>
        </div>
    )
}

export default LandingPage;
