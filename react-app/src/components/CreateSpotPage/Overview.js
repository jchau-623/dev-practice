import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../store/spots';

const initialState = {
    name: '',
    address: '',
    city: '',
    state: '',
    bedrooms: '',
    bathrooms: '',
    guests: '',
    description: '',
    imageUrls: '', // This will be a comma-separated string initially
    amenities: '',
    houseRules: '',
    availability: '', // This might need to be an array depending on how you're handling it
    price: '',
    latitude: '',
    longitude: '',
    rating: '',
    numReviews: ''
};

const CreateSpotForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state?.session?.user);
    const [formData, setFormData] = useState(initialState);
    const [currentStep, setCurrentStep] = useState(1);
    const [formErrors, setFormErrors] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [fileError, setFileError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (errors.length === 0) {
            if (currentStep === 4) {
                if (imageFile) {
                    // Prepare the data to match the structure expected by the server
                    const spotData = {
                        name: formData.name,
                        user_id: sessionUser.id,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        description: formData.description,
                        price: parseFloat(formData.price),
                        image_urls: formData.imageUrls.split(',').map(url => url.trim()), // Convert to array
                        num_bedrooms: parseInt(formData.bedrooms, 10),
                        num_bathrooms: parseFloat(formData.bathrooms),
                        max_guests: parseInt(formData.guests, 10),
                        amenities: formData.amenities.split(',').map(amenity => amenity.trim()), // Convert amenities to an array
                        availability: JSON.parse(formData.availability || '[]'), // Parse availability if provided
                        latitude: parseFloat(formData.latitude),
                        longitude: parseFloat(formData.longitude),
                        rating: parseFloat(formData.rating),
                        num_reviews: parseInt(formData.numReviews, 10)
                    };

                    console.log('Submitting form data:', spotData);

                    try {
                        const response = await fetch('/api/spots/create', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': getCookie('csrf_token') // Include CSRF token
                            },
                            body: JSON.stringify(spotData)
                        });

                        if (response.ok) {
                            const newSpot = await response.json();
                            // Handle successful spot creation
                        } else {
                            const errorData = await response.json();
                            console.error('Error creating spot:', errorData);
                        }
                    } catch (err) {
                        console.error('Error creating spot:', err);
                    }
                } else {
                    setFormErrors(['Image is required']);
                }
            } else {
                setCurrentStep(currentStep + 1);
            }
        } else {
            setFormErrors(errors);
        }
    };

    const validateForm = (data) => {
        const errors = [];
        if (currentStep === 1) {
            if (!data.name) errors.push("Name is required");
            if (!data.address) errors.push("Address is required");
            if (!data.city) errors.push("City is required");
            if (!data.state) errors.push("State is required");
            if (!data.description) errors.push("Description is required");
        } else if (currentStep === 2) {
            if (!data.bedrooms) errors.push("Bedrooms is required");
            if (!data.bathrooms) errors.push("Bathrooms is required");
            if (!data.guests) errors.push("Guests is required");
        } else if (currentStep === 3) {
            if (!data.amenities) errors.push("Amenities is required");
            if (!data.houseRules) errors.push("House Rules is required");
            if (!data.price) errors.push("Price is required");
        }
        return errors;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const setFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => handleFileReader(e, file);
    };

    const handleFileReader = (e, file) => {
        const dataUrl = e.target.result;

        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const fileType = file.type;

        if (!allowedFileTypes.includes(fileType)) {
            setFileError('Must upload a PNG, JPG, or JPEG image.');
            setImageFile(null);
            setImageUrl(null);
            return;
        }

        setImageFile(file);
        setImageUrl(dataUrl);
        setFileError(null);
    };

    const renderFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="form-step">
                        <h2>Step 1: Address and Description</h2>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                        <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                    </div>
                );
            case 2:
                return (
                    <div className="form-step">
                        <h2>Step 2: Bedrooms, Bathrooms, Guests</h2>
                        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
                        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
                        <input type="number" name="guests" value={formData.guests} onChange={handleChange} placeholder="Guests" />
                    </div>
                );
            case 3:
                return (
                    <div className="form-step">
                        <h2>Step 3: Amenities, House Rules, Availability, Price</h2>
                        <textarea name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities (comma separated)" />
                        <textarea name="houseRules" value={formData.houseRules} onChange={handleChange} placeholder="House Rules" />
                        <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" />
                        <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price per night" />
                        <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" />
                        <input type="number" name="numReviews" value={formData.numReviews} onChange={handleChange} placeholder="Number of Reviews" />
                    </div>
                );
            case 4:
                return (
                    <div className="form-step">
                        <h2>Step 4: Add Photos</h2>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {imageUrl && (
                            <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />
                        )}
                        {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <h1>Create Spot - Overview Page</h1>
            <form onSubmit={handleSubmit} className="form">
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
                    {currentStep !== 1 && <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>Previous</button>}
                    {currentStep !== 4 ? <button type="submit">Next</button> : <button type="submit">Create Spot</button>}
                </div>
            </form>
        </div>
    );
};

export default CreateSpotForm;
