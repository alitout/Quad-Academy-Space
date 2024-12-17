import React from 'react';
import IconLearn from '../../assets/iconLearn.svg';
import IconCareer from '../../assets/iconCareer.svg';
import IconCertificate from '../../assets/iconCertificate.svg';

function Highlights() {
    return (
        <div
            id='Highlights'
            className='Highlights '
        >
            <div className="container d-flex justify-content-center">
                <div className="highlights col-11 bg-md-pink rounded-4 d-flex flex-row gap-4 gap-md-5 flex-wrap justify-content-center py-4 px-3">
                    <div className="highlight learn d-flex flex-column flex-md-row col-12 col-lg-4 gap-3 flex-grow-1">
                        <img src={IconLearn} alt="Learn Icon" className="icon iconLearn" />
                        <div className="txt text-md-white d-flex flex-column">
                            <h5>Learn The Latest Skills</h5>
                            <div className="subText fw-400">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.</div>
                        </div>
                    </div>
                    <div className="highlight career d-flex flex-column flex-md-row col-12 col-lg-4 gap-3 flex-grow-1">
                        <img src={IconCareer} alt="Career Icon" className="icon iconCareer" />
                        <div className="txt text-md-white d-flex flex-column">
                            <h5>Get Ready For a Career</h5>
                            <div className="subText fw-400">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.</div>
                        </div>
                    </div>
                    <div className="highlight earnCertificate d-flex flex-column flex-md-row col-12 col-lg-4 gap-3 flex-grow-1">
                        <img src={IconCertificate} alt="Certificate Icon" className="icon iconCertificate" />
                        <div className="txt text-md-white d-flex flex-column">
                            <h5>Earn a Certificate</h5>
                            <div className="subText fw-400">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a BC, making it over 2000 years old.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Highlights;