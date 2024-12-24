import React, { useState } from 'react'
import programsData from '../../data/jsons/programs.json';
import { Button, Modal, Card, Image } from 'react-bootstrap';

import mediaProduction from '../../data/images/programs/media-production.jpg';
import marketingCommunications from '../../data/images/programs/marketing-communications.jpg';
import graphicDesign from '../../data/images/programs/graphic-design.jpg';
import digitalPhotography from '../../data/images/programs/digital-photography.jpg';
import webDevelopment from '../../data/images/programs/web-development.jpg';


const ImageMap = {
    "media-production": mediaProduction,
    "marketing-communications": marketingCommunications,
    "graphic-design": graphicDesign,
    "digital-photography": digitalPhotography,
    "web-developement": webDevelopment,
}

const ProgramCard = ({ title, brief, full_description, image, date, cost }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);

    return (
        <>
            <Card
                onClick={handleShow}
                className="mb-4 program-card"
                style={{ width: "21rem", position: "relative" }}
            >
                <Card.Img variant="top" src={ImageMap[image]} alt={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className="text-muted">{brief}</Card.Text>
                    <p className="text-muted">
                        <strong>Date:</strong> {date}
                    </p>
                    <p className="text-muted">
                        <strong>Cost:</strong> ${cost}
                    </p>
                </Card.Body>

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
                    <Button variant="primary" onClick={handleShow}>
                        View Details
                    </Button>
                </div>
            </Card>

            {/* Modal for Details */}
            <Modal show={showPopup} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image
                        src={ImageMap[image]}
                        alt={image}
                        className="mb-3"
                        style={{ width: "100%", borderRadius: "8px" }}
                    />
                    <p><strong>{brief}</strong></p>
                    <p>{full_description}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Cost:</strong> ${cost}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

function OurPrograms() {

    const [programs, setPrograms] = useState(programsData);

    return (
        <div
            id='programs'
            className="ourPrograms bg-gray-100 py-4 py-md-5">
            <div className='container my-3'>
                <div className="d-flex flex-column align-items-center">
                    <h2 className="title">
                        Our Programs
                    </h2>
                    <p className="subTitle">
                        Lorem ipsum dolor sit, amet consectetur adipisicing.
                    </p>
                </div>

                {/* Gallery */}
                <div className="row">
                    {programs.map((program) => (
                        <div className="col-md-4 d-flex justify-content-center" key={program.id}>
                            <ProgramCard
                                {...program}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OurPrograms;
