import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../Logo/Logo';
import { USER_LOGIN } from '../../externalApi/ExternalUrls';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm({ onLoginSuccess }) {
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [isIdentifierValid, setIsIdentifierValid] = useState(true);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [failedToLogin, setFailedToLogin] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleIdentifierChange = (e) => {
        setIdentifier(e.target.value);
        setIsIdentifierValid(true);
        setFailedToLogin(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setIsPasswordEmpty(false);
        setFailedToLogin(null);
    };

    const navigateToHome = () => navigate('/');
    const navigateToSignUp = () => navigate('/sign-up');

    const login = async (e) => {
        e.preventDefault();

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validIdentifier = usernameRegex.test(identifier) || emailRegex.test(identifier);
        const emptyPassword = password.trim() === '';

        setIsIdentifierValid(validIdentifier);
        setIsPasswordEmpty(emptyPassword);
        if (!validIdentifier || emptyPassword) return;

        setLoading(true);
        const loginRequest = {
            username: identifier,
            email: identifier,
            password: password
        };
        try {
            const res = await axios.post(USER_LOGIN, loginRequest);
            if (res.data && res.data.bearerToken && res.data.refreshToken) {
                onLoginSuccess(res.data.bearerToken, res.data.refreshToken);
            } else {
                setFailedToLogin('Failed to login. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setFailedToLogin('Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="SignUpForm">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="card shadow-lg p-5" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                    <div className="text-center mb-4">
                        <Logo />
                        <h2 className="fw-bold mt-3">Sign In</h2>
                    </div>

                    {failedToLogin && <div className="alert alert-danger">{failedToLogin}</div>}

                    <form onSubmit={login} className="d-flex flex-column gap-3">
                        <div>
                            <label className="form-label fw-semibold">Email or Username</label>
                            <input
                                id="identifier"
                                name="identifier"
                                autoComplete="username"
                                type="text"
                                className={`form-control ${!isIdentifierValid ? 'is-invalid' : ''}`}
                                placeholder="email or username"
                                value={identifier}
                                onChange={handleIdentifierChange}
                            />
                            {!isIdentifierValid && <div className="invalid-feedback">Enter a valid username (alphanumeric) or email</div>}
                        </div>

                        <div>
                            <label className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${isPasswordEmpty ? 'is-invalid' : ''}`}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <span
                                    className="input-group-text"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {isPasswordEmpty && <div className="invalid-feedback d-block">Password can't be empty</div>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn bg-cyan-blue fw-bold mt-3"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <a
                            className="backToLogin text-decoration-none text-pink p-0"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {/* implement forgot password navigation if you have one */ }}
                        >
                            Forgot password?
                        </a>
                        <br />
                        <a
                            className="backToLogin text-decoration-none text-pink p-0"
                            style={{ cursor: 'pointer' }}
                            onClick={navigateToSignUp}
                        >
                            Don't have an account? Sign Up
                        </a>
                        <br />
                        <a
                            className="backToHome text-decoration-none text-pink p-0 ms-1"
                            style={{ cursor: 'pointer' }}
                            onClick={navigateToHome}
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
