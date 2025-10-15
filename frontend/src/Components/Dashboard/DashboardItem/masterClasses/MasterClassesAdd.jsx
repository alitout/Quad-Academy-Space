import React, { useState } from 'react';
import axios from 'axios';
import { MASTERCLASS_ADD } from '../../../../externalApi/ExternalUrls';
import { Form } from 'react-bootstrap';

import Trash01 from '@untitled-ui/icons-react/build/cjs/Trash01';

function MasterClassAdd({ onSaveSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        brief: '',
        full_description: '',
        key_takeaways: [],
        duration: '',
        level: '',
        idealFor: [],
        date: '',
        cost: '',
        image: '',
        isAvailable: true,
    });

    const [keyTakeawayInput, setKeyTakeawayInput] = useState('');
    const [idealForInput, setIdealForInput] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleAddArrayItem = (field, value, inputSetter) => {
        if (value.trim()) {
            setFormData(prev => ({
                ...prev,
                [field]: [...prev[field], value.trim()]
            }));
            inputSetter('');
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleRemoveArrayItem = (field, idx) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== idx)
        }));
    };

    const validate = () => {
        const newErrors = {};
        const requiredFields = ['title', 'brief', 'full_description', 'duration', 'level', 'date', 'cost', 'image'];

        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].toString().trim() === '') {
                newErrors[field] = 'This field is required';
            }
        });

        if (!formData.key_takeaways.length)
            newErrors.key_takeaways = 'At least one key takeaway is required';
        if (!formData.idealFor.length)
            newErrors.idealFor = 'At least one ideal audience is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post(MASTERCLASS_ADD, {
                ...formData,
                isAvailable: Boolean(formData.isAvailable),
            });
            onSaveSuccess();
        } catch (err) {
            console.error(err);
            alert('Error adding master class.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
                <label className="form-label">Title <span className="text-danger">*</span></label>
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
                <label className="form-label">Brief <span className="text-danger">*</span></label>
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
                <label className="form-label">Full Description <span className="text-danger">*</span></label>
                <textarea
                    name="full_description"
                    className={`form-control ${errors.full_description ? 'is-invalid' : ''}`}
                    value={formData.full_description}
                    onChange={handleChange}
                ></textarea>
                {errors.full_description && <div className="invalid-feedback">{errors.full_description}</div>}
            </div>

            {/* Key Takeaways */}
            <div className="mb-3">
                <label className="form-label">Key Takeaways <span className="text-danger">*</span></label>
                <div className="d-flex mb-2">
                    <input
                        type="text"
                        value={keyTakeawayInput}
                        onChange={e => setKeyTakeawayInput(e.target.value)}
                        className="form-control me-2"
                        placeholder="Add key takeaway"
                    />
                    <button
                        type="button"
                        className="btn bg-cyan-blue"
                        onClick={() => handleAddArrayItem('key_takeaways', keyTakeawayInput, setKeyTakeawayInput)}
                    >
                        Add
                    </button>
                </div>
                {errors.key_takeaways && <div className="text-danger mb-2">{errors.key_takeaways}</div>}
                <ul>
                    {formData.key_takeaways.map((item, idx) => (
                        <li key={idx}>
                            {item}
                            <span
                                type="button"
                                className="text-pink ms-2"
                                onClick={() => handleRemoveArrayItem('key_takeaways', idx)}
                            >
                                <Trash01 style={{width: '1rem'}}/>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Duration */}
            <div className="mb-3">
                <label className="form-label">Duration <span className="text-danger">*</span></label>
                <input
                    type="text"
                    name="duration"
                    className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                    value={formData.duration}
                    onChange={handleChange}
                />
                {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
            </div>

            {/* Level */}
            <div className="mb-3">
                <label className="form-label">Level <span className="text-danger">*</span></label>
                <input
                    type="text"
                    name="level"
                    className={`form-control ${errors.level ? 'is-invalid' : ''}`}
                    value={formData.level}
                    onChange={handleChange}
                />
                {errors.level && <div className="invalid-feedback">{errors.level}</div>}
            </div>

            {/* Ideal For */}
            <div className="mb-3">
                <label className="form-label">Ideal For <span className="text-danger">*</span></label>
                <div className="d-flex mb-2">
                    <input
                        type="text"
                        value={idealForInput}
                        onChange={e => setIdealForInput(e.target.value)}
                        className="form-control me-2"
                        placeholder="Add ideal audience"
                    />
                    <button
                        type="button"
                        className="btn bg-cyan-blue"
                        onClick={() => handleAddArrayItem('idealFor', idealForInput, setIdealForInput)}
                    >
                        Add
                    </button>
                </div>
                {errors.idealFor && <div className="text-danger mb-2">{errors.idealFor}</div>}
                <ul>
                    {formData.idealFor.map((item, idx) => (
                        <li key={idx}>
                            {item}
                            <span
                                type="button"
                                className="text-pink ms-2"
                                onClick={() => handleRemoveArrayItem('idealFor', idx)}
                            >
                                <Trash01 style={{width: '1rem'}}/>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Date */}
            <div className="mb-3">
                <label className="form-label">Date <span className="text-danger">*</span></label>
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
                <label className="form-label">Cost <span className="text-danger">*</span></label>
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
                <label className="form-label">Image URL <span className="text-danger">*</span></label>
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
                Add Master Class
            </button>
        </form>
    );
}

export default MasterClassAdd;
