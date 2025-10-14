import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { routeMap } from '../../Routes/Routes';
import axios from 'axios';
import { USER_GETSELF } from '../../externalApi/ExternalUrls';

// untitled ui icons
import GraduationHat02 from '@untitled-ui/icons-react/build/cjs/GraduationHat02';
import Lightbulb04 from '@untitled-ui/icons-react/build/cjs/Lightbulb04';
import XClose from '@untitled-ui/icons-react/build/cjs/XClose';
import ImageUser from '@untitled-ui/icons-react/build/cjs/ImageUser';
import LogOut01 from '@untitled-ui/icons-react/build/cjs/LogOut01';

const menuStructure = {
    "Programs": ["programs"],
    "Master Classes": ["masterclasses"],
}

const pageCodeIcons = {
    "Programs": GraduationHat02,
    "Master Classes": Lightbulb04,
}

function NavigationsMenu({ toggleMenu }) {
    const navigate = useNavigate();
    const location = useLocation();

    const bearerToken = localStorage.getItem('bearerToken');
    const auth = `Bearer ${bearerToken}`;

    // State Variables
    const [activeItem, setActiveItem] = useState('Profile');
    const [name, setName] = useState('');
    const [route, setRoute] = useState('');

    const handleItemClick = (item) => {
        setActiveItem(item);
        const newRoute = routeMap[item];
        setRoute(newRoute);

        if (item === 'Logout') {
            localStorage.clear();
            navigate('/sign-in');
            return;
        }

        if (newRoute) {
            navigate(`/dashboard/${newRoute}`);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!bearerToken) {
                    navigate('/sign-in');
                    return;
                }

                const res = await axios.get(USER_GETSELF, {
                    headers: {
                        Authorization: auth
                    }
                });

                setName(res.data.username);
            } catch (error) {
                console.error("Error fetching user data:", error);
                localStorage.clear();
                navigate('/sign-in');
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const currentRoute = pathParts[2];
        const item = Object.keys(routeMap).find(key => routeMap[key] === currentRoute);

        if (item) {
            setActiveItem(item);
            setRoute(routeMap[item]);
        }
    }, [location]);

    return (
        <div
            className='d-flex flex-column flex-grow-1 align-items-stretch border-start fixed bg-white'
            style={{ height: '100vh' }}
        >
            {name &&
                <div className="">
                    <div className='d-flex justify-content-center align-items-center fs-3 fw-700 text-center p-3 py-4 '>
                        <div className='flex-grow-1'>
                            {name}
                        </div>
                        <div
                            className='uiIcon ps-2 text-reset d-flex d-md-none'
                            data-bs-dismiss="offcanvas"
                            onClick={toggleMenu}
                        >
                            {React.createElement(XClose, { width: '1.5rem', height: '1.5rem' })}
                        </div>
                    </div>
                    <div
                        className="bg-cyan-blue"
                        style={{ height: '0.75rem' }}
                    >
                    </div>
                </div>
            }
            <div className='d-flex flex-column flex-fill justify-content-between'>
                <div>
                    {menuStructure && Object.keys(menuStructure).map((item) => (
                        <div
                            key={item}
                            className={`fs-5 fw-500 d-flex justify-content-start align-items-center py-1 m-2 ${activeItem === item ? 'activePage' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className='uiIcon ps-2 align-self-center me-2'>
                                {pageCodeIcons[item] && React.createElement(pageCodeIcons[item], { width: '1.5rem', height: '1.5rem' })}
                            </div>
                            <div className="text-center">
                                {item}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='border-top'>
                    <div
                        className={`fs-5 fw-500 d-flex justify-content-start align-items-center py-1 m-2 ${activeItem === 'Profile' ? 'activePage' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleItemClick('Profile')}
                    >
                        <div className='uiIcon ps-2 me-2'>
                            {React.createElement(ImageUser, { width: '1.5rem', height: '1.5rem' })}
                        </div>
                        Profile
                    </div>
                    <div
                        className={`fs-5 fw-500 d-flex justify-content-start align-items-center py-1 m-2 ${activeItem === 'Logout' ? 'activePage' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleItemClick('Logout')}
                    >
                        <div className='uiIcon ps-2 me-2'>
                            {React.createElement(LogOut01, { width: '1.5rem', height: '1.5rem' })}
                        </div>
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavigationsMenu
