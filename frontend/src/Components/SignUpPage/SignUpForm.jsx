import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../Components/Logo/Logo';
import { USER_REGISTER } from '../../externalApi/ExternalUrls';
import { FaEye, FaEyeSlash } from "react-icons/fa";


function SignUpPage() {
    const navigate = useNavigate();

    // State Variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const [failedToRegister, setFailedToRegister] = useState(null);
    const [registerSuccess, setRegisterSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    // Event handlers
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        setIsUsernameValid(true);
        setFailedToRegister(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsPasswordEmpty(false);
        setFailedToRegister(null);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setIsConfirmPasswordEmpty(false);
        setIsConfirmPasswordValid(true);
        setFailedToRegister(null);
    };

    // navigations
    const navigateToHome = () => {
        navigate('/');
    };

    const navigateToLogin = () => {
        navigate('/sign-in');
    }

    const register = async (e) => {
        e.preventDefault();
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const isUsernameValid = usernameRegex.test(username);
        const isPasswordEmpty = password.trim() === '';
        const isConfirmPasswordEmpty = confirmPassword.trim() === '';
        const isConfirmPasswordValid = password === confirmPassword;

        setIsUsernameValid(isUsernameValid);
        setIsPasswordEmpty(isPasswordEmpty);
        setIsConfirmPasswordEmpty(isConfirmPasswordEmpty);
        setIsConfirmPasswordValid(isConfirmPasswordValid);

        if (isUsernameValid && !isPasswordEmpty && isConfirmPasswordValid) {
            const registerRequest = {
                "username": username,
                "password": password
            };

            try {
                const response = await axios.post(USER_REGISTER, registerRequest);
                setRegisterSuccess("Registration successful! You can now log in.");
                navigate(`/dashboard`);

            } catch (error) {
                console.log(error);
                setFailedToRegister("Failed to register. Please check your credentials and try again.");
            }
        };
    };

    return (
        <div className='d-flex flex-column gap-5'>
            <Logo />
            {failedToRegister && (
                <div className="text-pink text-center">
                    {failedToRegister}
                </div>
            )}
            {registerSuccess && (
                <div className="text-green text-center">
                    {registerSuccess}
                </div>
            )}
            <div className='SignUpForm text-center d-flex flex-column align-items-center'>
                <form className="inputs d-flex flex-column col-12 gap-4 px-3">
                    <h2 className="fw-700 fs-2 text-white">Sign Up</h2>
                    <div className="d-flex flex-column gap-2">
                        <div className="input input-email d-flex flex-column gap-2">
                            <label className="text-black fs-3 fw-500 align-self-start">
                                Username
                            </label>
                            <input
                                autoComplete='off'
                                id='username'
                                type="text"
                                label="username"
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
                        <div className="input input-password d-flex flex-column gap-2 position-relative">
                            <label className="text-black fs-3 fw-500 align-self-start">
                                Password
                            </label>
                            <div className="password-wrapper position-relative">
                                <input
                                    id='password'
                                    type={showPassword ? "text" : "password"}
                                    label="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="pe-5" // space for the icon
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {isPasswordEmpty && (
                                <div className="text-pink align-self-start">
                                    Password can't be empty
                                </div>
                            )}
                        </div>

                        <div className="input input-confirm-password d-flex flex-column gap-2">
                            <label className="text-black fs-3 fw-500 align-self-start">
                                Confirm Password
                            </label>
                            <div className="password-wrapper position-relative">
                                <input
                                    id='confirmPassword'
                                    type={showPassword ? "text" : "password"}
                                    label="confirmPassword"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className="pe-5"
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {!isConfirmPasswordValid && (
                                <div className="text-pink align-self-start">
                                    Passwords do not match
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        className="Sign-up btn bg-pink fw-600 fs-1_125"
                        onClick={register}
                    >
                        Sign Up
                    </button>
                </form>
                <a className="backToLogin d-flex flex-row justify-content-center align-items-center text-decoration-none text-white px-3 fw-500"
                    onClick={navigateToLogin}
                    style={{ cursor: 'pointer' }}
                >
                    Back to Login
                </a>
                <a
                    className="backToHome d-flex flex-row justify-content-center align-items-center text-decoration-none text-white px-3 fw-500"
                    onClick={navigateToHome}
                    style={{ cursor: 'pointer' }}
                >
                    Back to Home
                </a>
            </div>
        </div>
    )
}

export default SignUpPage;
