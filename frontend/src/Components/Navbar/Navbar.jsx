import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import Headroom from 'react-headroom';
import Logo from '../Logo/Logo';
import axios from 'axios';
import { VERIFY_TOKEN } from '../../externalApi/ExternalUrls';
import Loading from '../loading';

const ResponsiveNavbar = () => {
    const [show, setShow] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [bearerToken, setBearerToken] = useState(localStorage.getItem('bearerToken'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            // No token → isSignedIn = false
            if (!bearerToken) {
                setIsSignedIn(false);
                return;
            }

            try {
                const res = await axios.post(
                    VERIFY_TOKEN,
                    { token: bearerToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );


                const data = res.data;

                if (data.valid) {
                    // Valid token → isSignedIn = true
                    setIsSignedIn(true);
                } else {
                    // Invalid/expired token → isSignedIn = false + clear token
                    localStorage.removeItem('bearerToken');
                    setIsSignedIn(false);
                }
            } catch (err) {
                console.error('Error verifying token:', err);
                localStorage.removeItem('bearerToken');
            } finally {
                setLoading(false);
            }
        };
        verifyToken();

    }, [bearerToken]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Headroom style={{ zIndex: 1000, position: 'fixed', width: '100%' }}>
            <Navbar expand="lg" bg="white" variant="light" className="border-bottom border-1 border-secondary-subtle">
                <Container className="justify-content-around justify-content-sm-between p-0">
                    <Navbar.Brand href="#">
                        <Logo />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                        show={show} // Controls visibility based on state
                        onHide={handleClose} // Close the menu when offcanvas is dismissed
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                <Logo />
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className="justify-content-end align-items-center flex-grow-1 gap-3 gap-lg-5">
                                <Nav.Link
                                    active={false}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.hash = ''; // Update the hash
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        handleClose(); // Close the offcanvas menu
                                    }}
                                >
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    active={false}
                                    href="#programs"
                                    onClick={() => {
                                        document.getElementById('programs').scrollIntoView({ behavior: 'smooth' });
                                        handleClose();
                                    }}
                                >
                                    Programs
                                </Nav.Link>
                                <Nav.Link
                                    active={false}
                                    href="#master-classes"
                                    onClick={() => {
                                        document.getElementById('master-classes').scrollIntoView({ behavior: 'smooth' });
                                        handleClose();
                                    }}
                                >
                                    Master Classes
                                </Nav.Link>
                                <Nav.Link
                                    active={false}
                                    href="#community"
                                    onClick={() => {
                                        document.getElementById('community');
                                        handleClose();
                                    }}
                                >
                                    Community
                                </Nav.Link>
                                {!loading ? (
                                    isSignedIn ? (
                                        <Nav.Link
                                            active={false}
                                            href="/dashboard/profile"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = '/dashboard/profile';
                                                handleClose();
                                            }}
                                        >
                                            Dashboard
                                        </Nav.Link>
                                    ) : (
                                        <a
                                            className='btn bg-pink border-0 p-3 text-white fs-1_125 fw-600'
                                            href="/sign-in"
                                        >
                                            Sign in
                                        </a>
                                    )
                                ) : (
                                    <a
                                        className='btn bg-pink border-0 p-3 text-white fs-1_125 fw-600'
                                        href="/sign-in"
                                    >
                                        Sign in
                                    </a>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </Headroom>
    );
};

export default ResponsiveNavbar;
