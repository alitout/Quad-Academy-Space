import React, { useState } from 'react';
import { USER_ADD, USER_ADD_ADMIN } from '../../../../externalApi/ExternalUrls';
import axiosInstance from '../../../../API/axiosInstance';
import Eye from '@untitled-ui/icons-react/build/cjs/Eye'
import EyeOff from '@untitled-ui/icons-react/build/cjs/EyeOff'
import { Form } from 'react-bootstrap';

function UsersAdd({ onSaveSuccess }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullName: '',
        password: '',
    });


    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [createMode, setCreateMode] = useState('user');

    const handleModeChange = (mode) => {
        setCreateMode(mode);
        setFormData(prev => ({ ...prev, role: mode }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear field error as user edits
        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
        if (apiError) setApiError('');
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ["username", "email", "fullName", "password"];

        requiredFields.forEach(field => {
            if (!formData[field]?.toString().trim()) {
                newErrors[field] = "This field is required.";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');
        if (!validateForm()) return;

        setSubmitting(true);
        try {
            const endpoint = formData.role === 'admin' ? USER_ADD_ADMIN : USER_ADD;
            await axiosInstance.post(endpoint, formData);
            setSubmitting(false);
            setFormData({
                username: '',
                email: '',
                fullName: '',
                password: '',
            });
            setErrors({});
            onSaveSuccess();
        } catch (err) {
            setSubmitting(false);
            const resp = err?.response?.data;
            const errorMessage = resp?.msg || resp?.message || (typeof resp === 'string' ? resp : 'Error adding user.');
            setApiError(errorMessage);
        }
    };

    const requiredMark = <span style={{ color: 'red' }}> *</span>;

    return (
        <form onSubmit={handleSubmit}>
            {apiError && <div className="alert alert-danger" role="alert">{apiError}</div>}

            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                    type="text"
                    name="username"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span
                        className="input-group-text"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </span>
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                </div>
            </div>

            <Form.Group className="mb-3">
                <Form.Label>Create as</Form.Label>
                <div>
                    <Form.Check
                        inline
                        type="radio"
                        label="User"
                        name="createMode"
                        value="user"
                        checked={createMode === 'user'}
                        onChange={() => handleModeChange('user')}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label="Admin"
                        name="createMode"
                        value="admin"
                        checked={createMode === 'admin'}
                        onChange={() => handleModeChange('admin')}
                    />
                </div>
                {errors.role && <div className="invalid-feedback d-block">{errors.role}</div>}
            </Form.Group>

            <button type="submit" className="btn bg-pink text-white" disabled={submitting}>
                {submitting ? 'Saving...' : 'Add User'}
            </button>
        </form>
    );
}

export default UsersAdd;
