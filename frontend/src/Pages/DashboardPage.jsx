import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { VERIFY_TOKEN } from '../externalApi/ExternalUrls';
import Loading from '../Components/loading';
import NavigationsMenu from '../Components/Dashboard/NavigationsMenu';
import Logo from '../Components/Logo/Logo';

// untitled ui icons
import Menu01 from '@untitled-ui/icons-react/build/cjs/Menu01';
import DashboardItem from '../Components/Dashboard/DashboardItem';


function DashboardPage() {
    const navigate = useNavigate();

    // State Variables
    const [bearerToken, setBearerToken] = useState(localStorage.getItem('bearerToken') || null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            // No token → go to sign-in page
            if (!bearerToken) {
                navigate('/sign-in');
            }

            try {
                const res = await axios.post(
                    VERIFY_TOKEN,
                    { token: bearerToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (!res.data.valid) {
                    localStorage.removeItem('bearerToken');
                    setBearerToken(null);
                    navigate('/sign-in');
                    return;
                }

                setLoading(false);
            } catch (err) {
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem('bearerToken');
                    setBearerToken(null);
                    navigate('/sign-in');
                    return;
                }

                setLoading(false);
            }
        };

        verifyToken();
    }, [bearerToken, navigate]);

    // Toggle Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <div className='dashboardPage d-flex'>
                <div className="flex-fill d-none d-md-flex">
                    <div className="border-end" style={{ width: '16rem' }}>
                        <NavigationsMenu />
                    </div>
                    <div className="dashboardPage container flex-fill" style={{ maxHeight: '100vh', maxWidth: 'calc(100vw - 16rem)' }}>
                        <DashboardItem />
                    </div>
                </div>
            </div>
            <div>
                <div className="d-flex flex-column w-100 d-md-none">
                    <div className="header border-bottom d-flex justify-content-between w-100 py-3 px-4">
                        <div className="align-self-center">
                            {/* offcanvas on mobile view md and smaller */}
                            <button className="btn bg-pink" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                <Menu01 />
                            </button>
                            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" style={{ maxWidth: '16rem' }}>
                                <div className="offcanvas-body p-0">
                                    <NavigationsMenu toggleMenu={toggleMenu} />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <Logo />
                        </div>
                    </div>
                    <div className='dashboardPage container my-4'>
                        <DashboardItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
