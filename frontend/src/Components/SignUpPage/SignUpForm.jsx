import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../Components/Logo/Logo';
import { USER_REGISTER } from '../../externalApi/ExternalUrls';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUpPage() {
    const navigate = useNavigate();

    // form fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // UI / validation
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);

    const clearFieldError = (field) => {
        if (!errors[field]) return;
        setErrors(prev => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors = {};

        if (fullName.trim() === '') newErrors.fullName = "Full name can't be empty";
        if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address";
        if (!usernameRegex.test(username)) newErrors.username = "Username is not valid";
        if (password.trim() === '') newErrors.password = "Password can't be empty";
        if (confirmPassword.trim() === '') newErrors.confirmPassword = "Confirm password can't be empty";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSuccessMessage(null);
            return;
        }

        const registerRequest = {
            username,
            email,
            fullName,
            password
        };

        try {
            await axios.post(USER_REGISTER, registerRequest);
            setSuccessMessage("Registration successful! You can now log in.");
            setErrors({});
            // keep same behavior as original: navigate to profile after success
            navigate('/dashboard/profile');
        } catch (error) {
            console.error(error);
            setErrors({ api: "Failed to register. Please check your credentials and try again." });
            setSuccessMessage(null);
        }
    };

    return (
        <div className="SignUpForm">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="card shadow-lg p-5" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                    <div className="text-center mb-4">
                        <Logo />
                        <h2 className="fw-bold mt-3">Sign Up</h2>
                    </div>

                    {errors.api && <div className="alert alert-danger">{errors.api}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <form onSubmit={handleRegister} className="d-flex flex-column gap-3">
                        <div>
                            <label className="form-label fw-semibold">Full Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                placeholder="Full Name"
                                value={fullName}
                                onChange={e => { setFullName(e.target.value); clearFieldError('fullName'); setErrors(prev => { const p = { ...prev }; delete p.api; return p; }); }}
                            />
                            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                        </div>

                        <div>
                            <label className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="email@example.com"
                                value={email}
                                onChange={e => { setEmail(e.target.value); clearFieldError('email'); setErrors(prev => { const p = { ...prev }; delete p.api; return p; }); }}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="form-label fw-semibold">Username</label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                placeholder="Username"
                                value={username}
                                onChange={e => { setUsername(e.target.value); clearFieldError('username'); setErrors(prev => { const p = { ...prev }; delete p.api; return p; }); }}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>

                        <div>
                            <label className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); clearFieldError('password'); setErrors(prev => { const p = { ...prev }; delete p.api; return p; }); }}
                                />
                                <span
                                    className="input-group-text"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="form-label fw-semibold">Confirm Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={e => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); setErrors(prev => { const p = { ...prev }; delete p.api; return p; }); }}
                                />
                                <span
                                    className="input-group-text"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                            </div>
                        </div>

                        <button type="submit" className="btn bg-cyan-blue fw-bold mt-3">Sign Up</button>
                    </form>

                    <div className="text-center mt-3">
                        <a className="backToLogin text-decoration-none text-pink p-0" style={{ cursor: 'pointer' }} onClick={() => navigate('/sign-in')}>Back to Login</a> |
                        <a className="backToHome text-decoration-none text-pink p-0 ms-1" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
