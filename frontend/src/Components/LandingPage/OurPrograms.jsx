import React, { useState, useEffect } from 'react'
import { Button, Modal, Card, Image } from 'react-bootstrap'
import axios from 'axios'
import axiosInstance from '../../API/axiosInstance'
import { PROGRAM_GET_ALL, ENROLLMENT_ENROLL_PROGRAM, ENROLLMENT_UNENROLL_PROGRAM } from '../../externalApi/ExternalUrls'

import mediaProduction from '../../data/images/programs/media-production.jpg'
import marketingCommunications from '../../data/images/programs/marketing-communications.jpg'
import graphicDesign from '../../data/images/programs/graphic-design.jpg'
import digitalPhotography from '../../data/images/programs/digital-photography.jpg'
import webDevelopment from '../../data/images/programs/web-development.jpg'

const ImageMap = {
    "media-production": mediaProduction,
    "marketing-communications": marketingCommunications,
    "graphic-design": graphicDesign,
    "digital-photography": digitalPhotography,
    "web-developement": webDevelopment,
}

const resolveImageSrc = (image) => {
    if (!image) return ""
    const isRemote = /^https?:\/\//i.test(image)
    return isRemote ? image : ImageMap[image] || image
}

const ProgramCard = ({ programID, title, brief, full_description, image, date, cost, userRole, enrolledPrograms = [], updateEnrolledPrograms }) => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const roleFromStorage = (() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            return user?.role || localStorage.getItem("role") || ""
        } catch {
            return localStorage.getItem("role") || ""
        }
    })()
    const role = userRole || roleFromStorage || ""

    // Format date to readable string 
    const formattedDate = date
        ? (() => {
            const d = new Date(date)
            const day = String(d.getDate()).padStart(2, '0')
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const year = d.getFullYear()
            return `${day}-${month}-${year}`
        })()
        : ""

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const handleEnroll = async () => {
        if (!programID) {
            alert("Program data not found. Please try again.")
            return
        }

        setLoading(true)

        try {
            const isEnrolled = enrolledPrograms.includes(programID)
            if (isEnrolled) {
                await axiosInstance.post(ENROLLMENT_UNENROLL_PROGRAM, { programID })
                updateEnrolledPrograms(prev => prev.filter(id => id !== programID))
                alert("Unenrolled successfully")
            } else {
                await axiosInstance.post(ENROLLMENT_ENROLL_PROGRAM, { programID })
                updateEnrolledPrograms(prev => [...prev, programID])
                alert("Enrolled successfully")
            }
        } catch (err) {
            console.error("Enrollment error:", err)
            alert(err.response?.data?.msg || "Enrollment failed. Please try again.")
        }

        setLoading(false)
    }

    // Single object for program data 
    const currentProgram = { title, brief, full_description, image, date, cost }

    return (
        <>
            <Card
                onClick={handleShowModal}
                className="mb-4 program-card"
                style={{ width: "21rem", position: "relative" }}
            >
                <Card.Img variant="top" src={resolveImageSrc(image)} alt={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-muted">{brief}</Card.Text>
                    <p className="text-muted">
                        <strong>Date:</strong> {formattedDate}
                    </p>
                    <p className="text-muted">
                        <strong>Cost:</strong> ${cost}
                    </p>
                </Card.Body>

                {role === "user" && (
                    <Card.Footer style={{ position: 'relative', zIndex: 2, background: '#fff', borderTop: '1px solid rgba(0,0,0,.125)' }}>
                        <div className="d-flex justify-content-center w-100">
                            <Button
                                className={enrolledPrograms.includes(programID) ? "functionButton bg-white text-pink border-pink flex-grow-1" : "btn bg-pink border-0 pt-1 flex-grow-1"}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEnroll()
                                }}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : enrolledPrograms.includes(programID) ? "Unenroll" : "Enroll"}
                            </Button>
                        </div>
                    </Card.Footer>
                )}

                {/* Hover Button */}
                <div
                    className="hover-overlay d-flex align-items-center justify-content-center"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                >
                    <Button
                        variant="primary"
                        className="border-0"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleShowModal()
                        }}
                    >
                        View Details
                    </Button>
                </div>
            </Card>

            {/* Modal for Details */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image
                        src={resolveImageSrc(image)}
                        alt={image}
                        className="mb-3"
                        style={{ width: "100%", borderRadius: "8px" }}
                    />
                    <p><strong>{brief}</strong></p>
                    <p>{full_description}</p>
                    <p><strong>Date:</strong> {formattedDate}</p>
                    <p><strong>Cost:</strong> ${cost}</p>
                </Modal.Body>
                <Modal.Footer className="d-flex flex-row justify-content-end">
                    {role === "user" && (
                        <Button
                            className={enrolledPrograms.includes(programID) ? "functionButton bg-white text-pink border-pink" : "btn bg-pink border-0 pt-1"}
                            onClick={handleEnroll}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : enrolledPrograms.includes(programID) ? "Unenroll" : "Enroll"}
                        </Button>
                    )}
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function OurPrograms({ enrolledPrograms = [], setEnrolledPrograms }) {
    const [programs, setPrograms] = useState([])

    React.useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await axios.get(PROGRAM_GET_ALL)
                setPrograms(res.data)
            } catch (error) {
                console.error('Error fetching programs:', error)
            }
        }

        fetchPrograms()
    }, [])

    return (
        <div id='programs' className="ourPrograms bg-gray-100 py-4 py-md-5">
            <div className='container my-3'>
                <div className="d-flex flex-column align-items-center">
                    <h2 className="title">Our Programs</h2>
                    <p className="subTitle">
                        Designed to build practical skills, unlock creativity, and prepare learners for success.
                    </p>
                </div>

                {/* Gallery */}
                <div className="row">
                    {programs
                        .filter(program => program.isAvailable)
                        .map((program) => (
                            <div className="col-md-4 d-flex justify-content-center" key={program.id}>
                                <ProgramCard
                                    {...program}
                                    enrolledPrograms={enrolledPrograms}
                                    updateEnrolledPrograms={setEnrolledPrograms}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default OurPrograms
