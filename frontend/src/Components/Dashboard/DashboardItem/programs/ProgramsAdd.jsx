import React, { useState } from 'react';
import { PROGRAM_ADD } from '../../../../externalApi/ExternalUrls';
import axiosInstance from '../../../../API/axiosInstance';

function ProgramsAdd({ onSaveSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        brief: '',
        full_description: '',
        date: '',
        cost: '',
        image: '',
        isAvailable: true,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ["title", "brief", "full_description", "date", "cost", "image"];

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
            await axiosInstance.post(PROGRAM_ADD, formData);
            onSaveSuccess();
        } catch (err) {
            console.error(err);
            alert('Error adding program.');
        }
    };

    const requiredMark = <span style={{ color: 'red' }}> *</span>;

    return (
        <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
                <label className="form-label">Title{requiredMark}</label>
                <input
                    type="text"
                    name="title"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Brief */}
            <div className="mb-3">
                <label className="form-label">Brief{requiredMark}</label>
                <textarea
                    name="brief"
                    className={`form-control ${errors.brief ? 'is-invalid' : ''}`}
                    value={formData.brief}
                    onChange={handleChange}
                ></textarea>
                {errors.brief && <div className="invalid-feedback">{errors.brief}</div>}
            </div>

            {/* Full Description */}
            <div className="mb-3">
                <label className="form-label">Full Description{requiredMark}</label>
                <textarea
                    name="full_description"
                    className={`form-control ${errors.full_description ? 'is-invalid' : ''}`}
                    value={formData.full_description}
                    onChange={handleChange}
                ></textarea>
                {errors.full_description && <div className="invalid-feedback">{errors.full_description}</div>}
            </div>

            {/* Date */}
            <div className="mb-3">
                <label className="form-label">Date{requiredMark}</label>
                <input
                    type="date"
                    name="date"
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    value={formData.date}
                    onChange={handleChange}
                />
                {errors.date && <div className="invalid-feedback">{errors.date}</div>}
            </div>

            {/* Cost */}
            <div className="mb-3">
                <label className="form-label">Cost{requiredMark}</label>
                <input
                    type="number"
                    name="cost"
                    className={`form-control ${errors.cost ? 'is-invalid' : ''}`}
                    value={formData.cost}
                    onChange={handleChange}
                />
                {errors.cost && <div className="invalid-feedback">{errors.cost}</div>}
            </div>

            {/* Image */}
            <div className="mb-3">
                <label className="form-label">Image URL{requiredMark}</label>
                <input
                    type="text"
                    name="image"
                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                    value={formData.image}
                    onChange={handleChange}
                />
                {errors.image && <div className="invalid-feedback">{errors.image}</div>}
            </div>

            {/* Availability */}
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    name="isAvailable"
                    className="form-check-input"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                />
                <label className="form-check-label">Is Available</label>
            </div>

            <button type="submit" className="btn bg-pink text-white">
                Add Program
            </button>
        </form>
    );
}

export default ProgramsAdd;
