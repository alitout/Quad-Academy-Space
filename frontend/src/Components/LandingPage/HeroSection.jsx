import React, { useState } from 'react'
import HeroImage from '../../assets/heroImage.svg';

function HeroSection() {

    return (
        <div
            id='HeroSection'
            className='HeroSection container d-flex flex-column justify-content-between bg-white pb-md-5 pt-4 pt-md-5'
        >
            <div className="heroContent d-flex align-items-center justify-content-center justify-content-md-between flex-grow-1 py-4 py-md-0">
                <div className="heroText text-center text-md-start d-flex flex-column col-8 col-md-4 z-1">
                    <div className="txt d-flex flex-column gap-2">
                        <div className="text-blue-900 fw-900 fs-1">
                            The <span className='text-cyan-blue'>Smart</span>
                            <br />
                            Choice For <span className='text-cyan-blue'>Future</span>
                        </div>
                        <div className="text-gray-500 fs-1_25">
                            Elearn is a global training provider based across the UK that specialises in accredited and bespoke training courses. We crush the...
                        </div>
                    </div>
                </div>
                <div className="heroImg d-none d-md-flex justify-content-end col-7 z-0">
                    <img src={HeroImage} alt="" className=" py-5 w-100" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection;