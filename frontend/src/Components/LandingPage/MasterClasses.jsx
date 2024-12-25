import React, { useState, useEffect } from "react";
import masterclasses from "../../data/jsons/masterClasses.json";
import { Carousel, Card, Button, Modal, Image } from "react-bootstrap";

import contentCamp from "../../data/images/master-classes/content-camp.jpg";
import publicSpeaking from "../../data/images/master-classes/public-speaking.jpg";
import socialMediaSecuity from "../../data/images/master-classes/social-media-security.jpg";
import AIinContentCreation from "../../data/images/master-classes/ai-in-content-creation.jpg";

const ImageMap = {
    "content-camp": contentCamp,
    "public-speaking": publicSpeaking,
    "social-media-security": socialMediaSecuity,
    "ai-in-content-creation": AIinContentCreation,
};

const MasterClasses = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle modal opening
    const handleShowModal = (masterclass) => {
        setSelectedClass(masterclass);
        setShowModal(true);
    };

    // Handle modal closing
    const handleCloseModal = () => {
        setSelectedClass(null);
        setShowModal(false);
    };

    // Handle carousel navigation
    const handleSelect = (selectedIndex) => {
        setCurrentIndex(selectedIndex);
    };

    return (
        <div
            id='master-classes'
            className="MasterClasses py-4 py-md-5">
            <div className='container py-3'>
                <div className="d-flex flex-column align-items-center">
                    <h2 className="title">
                        Master Classes
                    </h2>
                    <p className="subTitle">
                        Lorem Ipsum is simply dummy text of the printing.
                    </p>
                </div>

                <Carousel
                    activeIndex={currentIndex}
                    onSelect={handleSelect}
                    indicators={true}
                    controls={true}
                    interval={5000}
                    nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
                    prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}>
                    {masterclasses.map((masterclass, idx) => (
                        <Carousel.Item key={idx}>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Card key={masterclass.id} style={{ width: "36rem", height: "23rem" }}>
                                    <Card.Img variant="top" src={ImageMap[masterclass.image]} alt={masterclass.image} />
                                    <Card.Body className="d-flex flex-column justify-content-between">
                                        <div>
                                            <Card.Title>{masterclass.title}</Card.Title>
                                            <Card.Text>{masterclass.short_description}</Card.Text>
                                        </div>
                                        <Button className="btn bg-pink border-0 pt-1" onClick={() => handleShowModal(masterclass)}>
                                            Learn More
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Carousel.Item>
                    ))}

                </Carousel>

                {/* Modal for detailed view */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    {selectedClass && (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedClass.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Image
                                    src={ImageMap[selectedClass.image]}
                                    alt={selectedClass.title}
                                    style={{ width: "100%",  marginBottom: "1rem" }}
                                />
                                <p><strong>{selectedClass.short_description}</strong></p>
                                <p>{selectedClass.description}</p>
                                <h5>Key Takeaways:</h5>
                                <ul>
                                    {selectedClass.key_takeaways.map((takeaway, index) => (
                                        <li key={index}>{takeaway}</li>
                                    ))}
                                </ul>
                                <p><strong>Duration:</strong> {selectedClass.duration}</p>
                                <p><strong>Level:</strong> {selectedClass.level}</p>
                                <strong>Ideal For:</strong>
                                <ul>
                                    {selectedClass.ideal_for.map((person, index) => (
                                        <li key={index}>{person}</li>
                                    ))}
                                </ul>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default MasterClasses;
