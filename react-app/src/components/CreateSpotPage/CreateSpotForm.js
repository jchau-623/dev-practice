import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../store/spots';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../../assets/airbnb-logo.png';
import './CreateSpotForm.css';

const initialState = {
    name: '',
    address: '',
    city: '',
    state: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    description: '',
    amenities: '',
    houseRules: '',
    availability: '',
    price: '',
    latitude: '',
    longitude: '',

};

export default function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state?.session?.user);
    const [formData, setFormData] = useState(initialState);
    const [currentStep, setCurrentStep] = useState(1);
    const [formErrors, setFormErrors] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [fileError, setFileError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (errors.length === 0) {
            if (currentStep === 5) {
                if (imageFiles.length > 0) {
                    const spotData = new FormData();
                    spotData.append('name', formData.name);
                    spotData.append('user_id', sessionUser.id);
                    spotData.append('address', formData.address);
                    spotData.append('city', formData.city);
                    spotData.append('state', formData.state);
                    spotData.append('description', formData.description);
                    spotData.append('price', parseFloat(formData.price) || 0);
                    spotData.append('num_bedrooms', parseInt(formData.bedrooms, 10) || 0);
                    spotData.append('num_bathrooms', parseFloat(formData.bathrooms) || 0);
                    spotData.append('max_guests', parseInt(formData.guests, 10) || 0);
                    spotData.append('amenities', JSON.stringify(formData.amenities.split(',').map(amenity => amenity.trim())));
                    spotData.append('availability', formData.availability ? formData.availability : JSON.stringify([]));
                    spotData.append('latitude', parseFloat(formData.latitude) || 0);
                    spotData.append('longitude', parseFloat(formData.longitude) || 0);

                    imageFiles.forEach(file => {
                        spotData.append('image_urls', file);
                    });

                    console.log('Submitting form data:', spotData);

                    try {
                        /* eslint-disable no-unused-vars */
                        const newSpot = await dispatch(createSpot(spotData));
                        history.push('/');
                    } catch (err) {
                        console.error('Error creating spot:', err);
                    }
                } else {
                    setFormErrors(['Image is required']);
                }
            } else {
                setFormErrors([]);
                setCurrentStep(currentStep + 1);
            }
        } else {
            setFormErrors(errors);
        }
    };

    const validateForm = (data) => {
        const errors = [];
        if (currentStep === 2) {
            if (!data.name) errors.push("Name is required");
            if (!data.address) errors.push("Address is required");
            if (!data.city) errors.push("City is required");
            if (!data.state) errors.push("State is required");
            if (!data.description) errors.push("Description is required");
        } else if (currentStep === 3) {
            if (!data.bedrooms) errors.push("Bedrooms is required");
            if (!data.bathrooms) errors.push("Bathrooms is required");
            if (!data.guests) errors.push("Guests is required");
        } else if (currentStep === 4) {
            if (!data.amenities) errors.push("Amenities is required");
            if (!data.houseRules) errors.push("House Rules is required");
            if (!data.price) errors.push("Price is required");
        } else if (currentStep === 5) {
            if (imageFiles.length === 0) errors.push("Image is required");
        }
        return errors;
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files);
    };

    const setFiles = (files) => {
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const invalidFiles = files.filter(file => !allowedFileTypes.includes(file.type));

        if (invalidFiles.length > 0) {
            setFileError('All files must be PNG, JPG, or JPEG images.');
            setImageFiles([]);
            return;
        }

        setImageFiles(prevFiles => [...prevFiles, ...files]);
        setFileError(null);
    };

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="form-step-onboarding">
                        <h1>It’s easy to get started on Airbnb</h1>
                        <div className="onboarding-step">
                            <h2>1. Tell us about your place</h2>
                            <p>Share some basic info, like where it is and how many guests can stay.</p>
                        </div>
                        <div className="onboarding-step">
                            <h2>2. Make it stand out</h2>
                            <p>Add 5 or more photos plus a title and description—we’ll help you out.</p>
                        </div>
                        <div className="onboarding-step">
                            <h2>3. Finish up and publish</h2>
                            <p>Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.</p>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="form-step form-step-2">
                        <h2>Step 1: Address and Description</h2>
                        <input type="text" className="input-field input-name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                        <input type="text" className="input-field input-address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                        <input type="text" className="input-field input-city" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                        <input type="text" className="input-field input-state" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                        <textarea name="description" className="input-field input-description" value={formData.description} onChange={handleChange} placeholder="Description" />
                    </div>
                );
            case 3:
                return (
                    <div className="form-step form-step-3">
                        <h2>Step 2: Bedrooms, Bathrooms, Guests</h2>
                        <input type="number" className="input-field input-bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
                        <input type="number" className="input-field input-bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
                        <input type="number" className="input-field input-guests" name="guests" value={formData.guests} onChange={handleChange} placeholder="Guests" />
                    </div>
                );
            case 4:
                return (
                    <div className="form-step form-step-4">
                        <h2>Step 3: Amenities, House Rules, Availability, Price</h2>
                        <textarea name="amenities" className="input-field input-amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities (comma separated)" />
                        <textarea name="houseRules" className="input-field input-houseRules" value={formData.houseRules} onChange={handleChange} placeholder="House Rules" />
                        <input type="number" className="input-field input-price" name="price" value={formData.price} onChange={handleChange} placeholder="Price per night" />
                    </div>
                );
            case 5:
                return (
                    <div className="form-step form-step-5">
                        <h2>Step 4: Add Photos</h2>
                        <input type="file" className="input-file" accept="image/*" multiple onChange={handleFileChange} />
                        {fileError && <p className="error-file" style={{ color: 'red' }}>{fileError}</p>}
                        <div className="image-preview-container">
                            {imageFiles.map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    className="image-preview"
                                />
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="header-content">
                <div className="header-left">
                    <div className="navbar-logo">
                        <NavLink to='/' exact>
                            <img src={logo} alt='logo' />
                        </NavLink>
                    </div>
                </div>
                <div className="header-right">
                    <NavLink to='/' exact>
                        <h2>Exit</h2>
                    </NavLink>
                </div>
            </div>
            <div className="container create-spot-container">
                <form onSubmit={handleSubmit} className="form create-spot-form">
                    {renderFormStep()}
                    {formErrors.length > 0 && (
                        <div className="error-container">
                            <ul className="error-list">
                                {formErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="buttons">
                        {currentStep !== 1 && (
                            <button
                                type="button"
                                className="button button-previous"
                                onClick={() => {
                                    setFormErrors([]);
                                    setCurrentStep(currentStep - 1);
                                }}
                            >
                                Previous
                            </button>
                        )}
                        {currentStep !== 5 ? (
                            <button
                                type="submit"
                                className="button button-next"
                                onClick={() => setFormErrors([])}
                            >
                                {currentStep === 1 ? "Get started" : "Next"}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="button button-submit"
                            >
                                Create Spot
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
