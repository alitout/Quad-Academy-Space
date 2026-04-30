import React, { useState, useEffect } from 'react';
import { USER_UPDATE_BY_ID } from '../../../../externalApi/ExternalUrls';
import axiosInstance from '../../../../API/axiosInstance';

function UsersEdit({ user, onSaveSuccess }) {
    const [formData, setFormData] = useState({
        userID: '',
        username: '',
        email: '',
        fullName: '',
        password: '',
        role: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                userID: user.userID,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                password: '',
                role: user.role,
            });
            setErrors({});
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

        // clear field-specific and submit errors when user edits
        setErrors(prev => {
            const next = { ...prev };
            delete next[name];
            delete next.submit;
            return next;
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ["userID", "username", "email", "fullName"];

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
        if (!validateForm()) return;

        try {
            await axiosInstance.patch(USER_UPDATE_BY_ID(formData.userID), {
                ...formData,
            });
            onSaveSuccess();
        } catch (err) {
            console.error(err);

            // Prefer server-side validation errors if provided
            if (err.response && err.response.data) {
                const data = err.response.data;
                // If server returns a map of field errors, merge them
                if (typeof data === 'object' && !Array.isArray(data)) {
                    // Normalize keys if server nests errors (adjust as needed)
                    setErrors(prev => ({ ...prev, ...data }));
                } else {
                    setErrors(prev => ({ ...prev, submit: String(data) }));
                }
            } else {
                setErrors(prev => ({ ...prev, submit: 'Error updating program. Please try again.' }));
            }
        }
    };

    const requiredMark = <span style={{ color: 'red' }}> *</span>;

    return (
        <form onSubmit={handleSubmit}>
            {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

            <div className="mb-3">
                <label className="form-label">User ID</label>
                <input type="text" className="form-control" value={formData.userID} readOnly disabled />
            </div>

            {/* Username */}
            <div className="mb-3">
                <label className="form-label">Username{requiredMark}</label>
                <input
                    type="text"
                    name="username"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    value={formData.username}
                    onChange={handleChange}
                    readOnly
                    disabled
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
                <label className="form-label">Email{requiredMark}</label>
                <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Full Name */}
            <div className="mb-3">
                <label className="form-label">Full Name{requiredMark}</label>
                <input
                    type="text"
                    name="fullName"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                    value={formData.fullName}
                    onChange={handleChange}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Role */}
            <div className="mb-3">
                <label className="form-label">Role{requiredMark}</label>
                <select
                    name="role"
                    className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
            </div>

            <button type="submit" className="btn bg-pink text-white">
                Save Changes
            </button>
        </form>
    );
}

export default UsersEdit;
