import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PROGRAM_UPDATE_BY_ID } from '../../../../externalApi/ExternalUrls';
import { Form } from 'react-bootstrap';

function ProgramEdit({ program, onSaveSuccess }) {
    const [formData, setFormData] = useState({
        programID: '',
        title: '',
        brief: '',
        full_description: '',
        date: '',
        cost: '',
        image: '',
        isAvailable: true,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (program) {
            setFormData({
                programID: program.programID,
                title: program.title,
                brief: program.brief,
                full_description: program.full_description,
                date: program.date ? program.date.split('T')[0] : '',
                cost: program.cost,
                image: program.image,
                isAvailable: program.isAvailable,
            });
        }
    }, [program]);

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
            await axios.patch(PROGRAM_UPDATE_BY_ID(formData.programID), {
                ...formData,
                isAvailable: formData.isAvailable === true || formData.isAvailable === "true",
            });
            onSaveSuccess();
        } catch (err) {
            console.error(err);
            alert('Error updating program.');
        }
    };

    const requiredMark = <span style={{ color: 'red' }}> *</span>;

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Program ID</label>
                <input type="text" className="form-control" value={formData.programID} readOnly />
            </div>

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
                <Form.Check
                    type="checkbox"
                    label="Is Available"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                />
            </div>

            <button type="submit" className="btn bg-pink text-white">
                Save Changes
            </button>
        </form>
    );
}

export default ProgramEdit;
