import React from 'react'
import HeroSection from '../Components/LandingPage/HeroSection';
import Highlights from '../Components/LandingPage/Highlights';
import Navbar from '../Components/Navbar/Navbar';
import MasterClasses from '../Components/LandingPage/MasterClasses';
import OurPrograms from '../Components/LandingPage/OurPrograms';

function LandingPage() {
    return (
        <div className=''>
            <Navbar />
            <HeroSection />
            <Highlights />
            <OurPrograms />
            <MasterClasses />
        </div>
    )
}

export default LandingPage;
