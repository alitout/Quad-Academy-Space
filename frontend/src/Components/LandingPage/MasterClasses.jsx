import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../API/axiosInstance";
import { Carousel, Card, Button, Modal, Image } from "react-bootstrap";

import { MASTERCLASS_GET_ALL, ENROLLMENT_ENROLL_MASTERCLASS, ENROLLMENT_UNENROLL_MASTERCLASS } from "../../externalApi/ExternalUrls";

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

const resolveImageSrc = (image) => {
    if (!image) return ""
    const isRemote = /^https?:\/\//i.test(image)
    return isRemote ? image : ImageMap[image] || image
}

const MasterClasses = ({ userRole, enrolledClasses = [], setEnrolledClasses }) => {
    const [masterclasses, setMasterclasses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState({});

    const roleFromStorage = (() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            return user?.role || localStorage.getItem("role") || "";
        } catch {
            return localStorage.getItem("role") || "";
        }
    })();
    const role = userRole || roleFromStorage || "";

    // Format date to readable string
    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(MASTERCLASS_GET_ALL);
                setMasterclasses(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleShowModal = (masterclass) => {
        setSelectedClass(masterclass);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedClass(null);
        setShowModal(false);
    };

    const handleSelect = (selectedIndex) => {
        setCurrentIndex(selectedIndex);
    };

    const handleEnroll = async (masterclass) => {
        if (!masterclass?.masterClassID) {
            alert("Master class data not found. Please try again.");
            return;
        }

        setLoading(prev => ({ ...prev, [masterclass.masterClassID]: true }));

        try {
            const isEnrolled = enrolledClasses.includes(masterclass.masterClassID);
            if (isEnrolled) {
                await axiosInstance.post(ENROLLMENT_UNENROLL_MASTERCLASS, { masterClassID: masterclass.masterClassID });
                setEnrolledClasses(prev => prev.filter(id => id !== masterclass.masterClassID));
                alert("Unenrolled successfully");
            } else {
                await axiosInstance.post(ENROLLMENT_ENROLL_MASTERCLASS, { masterClassID: masterclass.masterClassID });
                setEnrolledClasses(prev => [...prev, masterclass.masterClassID]);
                alert("Enrolled successfully");
            }
        } catch (err) {
            console.error("Enrollment error:", err);
            alert(err.response?.data?.msg || "Enrollment failed. Please try again.");
        }

        setLoading(prev => ({ ...prev, [masterclass.masterClassID]: false }));
    };

    return (
        <div
            id='master-classes'
            className="MasterClasses pt-4 pt-md-5 pb-5">
            <div className='container py-3'>
                <div className="d-flex flex-column align-items-center">
                    <h2 className="title">
                        Master Classes
                    </h2>
                    <p className="subTitle">
                        Deliver deep insights, hands-on learning, and future-focused knowledge to accelerate your growth.
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
                    {masterclasses
                        .filter(masterclass => masterclass.isAvailable)
                        .map((masterclass, idx) => (
                            <Carousel.Item key={idx}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <div>
                                        <Card key={masterclass.id} style={{ maxWidth: "36rem", height: "23rem" }}>
                                            <Card.Img variant="top" src={resolveImageSrc(masterclass.image)} alt={masterclass.title || masterclass.image} />
                                            <Card.Body className="d-flex flex-column justify-content-between gap-3">
                                                <div>
                                                    <Card.Title>{masterclass.title}</Card.Title>
                                                    <Card.Text>{masterclass.brief}</Card.Text>
                                                </div>
                                                <div className="d-flex flex-row justify-content-between align-items-center gap-2">
                                                    {role === "user" && (
                                                        <Button
                                                            className={enrolledClasses.includes(masterclass.masterClassID) ? "functionButton bg-white btn text-pink border-pink flex-grow-1" : "btn bg-pink border-0 pt-1 flex-grow-1"}
                                                            onClick={() => handleEnroll(masterclass)}
                                                            disabled={loading[masterclass.masterClassID]}
                                                        >
                                                            {loading[masterclass.masterClassID] ? "Processing..." : enrolledClasses.includes(masterclass.masterClassID) ? "Unenroll" : "Enroll"}
                                                        </Button>
                                                    )}
                                                    <Button className="btn bg-pink border-0 pt-1 flex-grow-1" onClick={() => handleShowModal(masterclass)}>
                                                        Learn More
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
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
                                    src={resolveImageSrc(selectedClass.image)}
                                    alt={selectedClass.title}
                                    style={{ width: "100%", marginBottom: "1rem" }}
                                />
                                <p><strong>{selectedClass.brief}</strong></p>
                                <p>{selectedClass.full_description}</p>
                                <h5>Key Takeaways:</h5>
                                <ul>
                                    {selectedClass.key_takeaways?.map((takeaway, index) => (
                                        <li key={index}>{takeaway}</li>
                                    ))}
                                </ul>
                                <p><strong>Duration:</strong> {selectedClass.duration}</p>
                                <p><strong>Level:</strong> {selectedClass.level}</p>
                                <strong>Ideal For:</strong>
                                <ul>
                                    {selectedClass.idealFor?.map((person, index) => (
                                        <li key={index}>{person}</li>
                                    ))}
                                </ul>
                                <p><strong>Date:</strong> {formatDate(selectedClass.date)}</p>
                                <p><strong>Cost:</strong> ${selectedClass.cost}</p>
                            </Modal.Body>
                            <Modal.Footer className="d-flex flex-row justify-content-end">
                                {role === "user" && (
                                    <Button
                                        className={enrolledClasses.includes(selectedClass.masterClassID) ? "functionButton bg-white text-pink border-pink" : "btn bg-pink border-0 pt-1"}
                                        onClick={() => handleEnroll(selectedClass)}
                                        disabled={loading[selectedClass.masterClassID]}
                                    >
                                        {loading[selectedClass.masterClassID] ? "Processing..." : enrolledClasses.includes(selectedClass.masterClassID) ? "Unenroll" : "Enroll"}
                                    </Button>
                                )}

                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </>
                    )}
                </Modal>
            </div>
        </div >
    );
};

export default MasterClasses;
