import React, { useState, useEffect } from 'react'
import axiosInstance from '../API/axiosInstance'
import { ENROLLMENT_GET_USER } from '../externalApi/ExternalUrls'
import HeroSection from '../Components/LandingPage/HeroSection';
import Highlights from '../Components/LandingPage/Highlights';
import Navbar from '../Components/Navbar/Navbar';
import MasterClasses from '../Components/LandingPage/MasterClasses';
import OurPrograms from '../Components/LandingPage/OurPrograms';
import Footer from '../Components/LandingPage/Footer';
import Loading from '../Components/loading';

function LandingPage() {
    const [enrolledPrograms, setEnrolledPrograms] = useState([])
    const [enrolledMasterClasses, setEnrolledMasterClasses] = useState([])
    const [loadingEnrollment, setLoadingEnrollment] = useState(true)
    const [enrollmentError, setEnrollmentError] = useState(null)

    useEffect(() => {
        const fetchEnrollmentData = async () => {
            const token = localStorage.getItem('bearerToken')
            if (!token) {
                setLoadingEnrollment(false)
                return
            }

            try {
                const res = await axiosInstance.get(ENROLLMENT_GET_USER)
                setEnrolledPrograms(res.data.programs?.map(pgm => pgm.programID) || [])
                setEnrolledMasterClasses(res.data.masterClasses?.map(mc => mc.masterClassID) || [])
            } catch (err) {
                console.warn('No logged-in user or failed enrollment fetch, continuing without enrollments', err)
            } finally {
                setLoadingEnrollment(false)
            }
        }

        fetchEnrollmentData()
    }, [])

    if (loadingEnrollment) {
        return (
            <div className=''>
                <Navbar />
                <div className='container py-5'>
                    <Loading />
                </div>
                <Footer />
            </div>
        )
    }

    if (enrollmentError) {
        return (
            <div className=''>
                <Navbar />
                <div className='container py-5'>
                    <p className='text-danger'>{enrollmentError}</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className=''>
            <Navbar />
            <HeroSection />
            <Highlights />
            <OurPrograms
                enrolledPrograms={enrolledPrograms}
                setEnrolledPrograms={setEnrolledPrograms}
            />
            <MasterClasses
                enrolledClasses={enrolledMasterClasses}
                setEnrolledClasses={setEnrolledMasterClasses}
            />
            <Footer />
        </div>
    )
}

export default LandingPage;
