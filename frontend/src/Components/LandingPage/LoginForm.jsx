import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Logo/Logo';

function LoginForm() {
    const navigate = useNavigate();

    // State Variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [failedToLogin, setFailedToLogin] = useState(null);

    // Event handlers
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setIsUsernameValid(true);
        setFailedToLogin(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsPasswordEmpty(false);
        setFailedToLogin(null);
    };

    // navigations
    const navigateToHome = () => {
        navigate('/');
    };

    const login = async (e) => {
        e.preventDefault();
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const isUsernameValid = usernameRegex.test(username);
        const isPasswordEmpty = password.trim() === '';

        setIsUsernameValid(isUsernameValid);
        setIsPasswordEmpty(isPasswordEmpty);

        if (isUsernameValid && !isPasswordEmpty) {
            const loginRequest = {
                "Username": username,
                "UserPassword": password
            };

            try {
                
                navigate(`/dashboard`);

            } catch (error) {
                console.log(error);
                setFailedToLogin("Failed to login. Please check your credentials and try again.");
            }
        };
    };

    return (
        <div className='d-flex flex-column gap-5'>
            <Logo />
            <div className='LoginForm text-center d-flex flex-column align-items-center'>
                <form className="inputs d-flex flex-column col-12 gap-4 px-3">
                    <div className="d-flex flex-column">
                        <div className="input input-email d-flex flex-column mb-1_25 gap-2">
                            <label className="text-black fs-3 fw-500 align-self-start">
                                Username
                            </label>
                            <input
                                autoComplete='off'
                                id='username'
                                type="text"
                                label="username"
                                for="username"
                                placeholder="username"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            {!isUsernameValid && (
                                <div className="text-pink align-self-start">
                                    Username is not valid
                                </div>
                            )}
                        </div>
                        <div className="input input-password d-flex flex-column gap-2">
                            <label className="text-black fs-3 fw-500 align-self-start">
                                Password
                            </label>
                            <input
                                id='password'
                                type="password"
                                label="password"
                                for="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {isPasswordEmpty && (
                                <div className="text-pink align-self-start">
                                    Password can't be empty
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        className="Sign-in btn bg-pink fw-600 fs-1_125"
                        onClick={login}
                    >
                        Login
                    </button>
                    <a
                    className="forgotPassword d-flex flex-row justify-content-center align-items-center text-decoration-none text-white px-3 fw-500"
                    style={{ cursor: 'pointer' }}
                >
                    Forgot password?
                </a>
                </form>
                <a
                    className="backToLogin d-flex flex-row justify-content-center align-items-center text-decoration-none text-white px-3 fw-500"
                    onClick={navigateToHome}
                    style={{ cursor: 'pointer' }}
                >
                    Back to Home
                </a>
            </div>
        </div>
    )
}

export default LoginForm
