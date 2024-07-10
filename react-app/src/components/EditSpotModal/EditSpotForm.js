import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSpot } from '../../store/spots';
import './EditSpotForm.css';

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
    rating: '',
    numReviews: '',
    image_urls: []
};

export default function EditSpotForm({ spot, handleClose }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [currentStep, setCurrentStep] = useState(1);
    const [formErrors, setFormErrors] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [fileError, setFileError] = useState(null);

    useEffect(() => {
      if (spot) {
          setFormData({
              name: spot.name || '',
              address: spot.address || '',
              city: spot.city || '',
              state: spot.state || '',
              bedrooms: spot.num_bedrooms?.toString() || '',
              bathrooms: spot.num_bathrooms?.toString() || '',
              guests: spot.max_guests?.toString() || '',
              description: spot.description || '',
              amenities: spot.amenities?.join(', ') || '',
              houseRules: spot.house_rules || '',
              availability: JSON.stringify(spot.availability || []),
              price: spot.price?.toString() || '',
              latitude: spot.latitude?.toString() || '',
              longitude: spot.longitude?.toString() || '',
              rating: spot.rating?.toString() || '',
              numReviews: spot.num_reviews?.toString() || '',
              image_urls: spot.image_urls || []
          });
      }
  }, [spot]);

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
          if (currentStep === 4) {
              const spotData = new FormData();
              spotData.append('id', spot.id);
              spotData.append('name', formData.name);
              // spotData.append('user_id', formData.user_id);
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
              spotData.append('rating', parseFloat(formData.rating) || 0);
              spotData.append('num_reviews', parseInt(formData.numReviews, 10) || 0);

              imageFiles.forEach(file => {
                  spotData.append('image_urls', file);
              });

              // Log the form data for debugging
              for (let [key, value] of spotData.entries()) {
                  console.log(key, value);
              }

              try {
                  const updatedSpot = await dispatch(updateSpot(spotData));
                  handleClose();
              } catch (err) {
                  console.error('Error updating spot:', err);
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
        } else if (currentStep === 4) {
            if (imageFiles.length === 0 && formData.image_urls.length === 0) errors.push("Image is required");
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
                    <div className="form-step form-step-2">
                        <h2>Step 1: Address and Description</h2>
                        <input type="text" className="input-field input-name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                        <input type="text" className="input-field input-address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
                        <input type="text" className="input-field input-city" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                        <input type="text" className="input-field input-state" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                        <textarea name="description" className="input-field input-description" value={formData.description} onChange={handleChange} placeholder="Description" />
                    </div>
                );
            case 2:
                return (
                    <div className="form-step form-step-3">
                        <h2>Step 2: Bedrooms, Bathrooms, Guests</h2>
                        <input type="number" className="input-field input-bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
                        <input type="number" className="input-field input-bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
                        <input type="number" className="input-field input-guests" name="guests" value={formData.guests} onChange={handleChange} placeholder="Guests" />
                    </div>
                );
            case 3:
                return (
                    <div className="form-step form-step-4">
                        <h2>Step 3: Amenities, House Rules, Availability, Price</h2>
                        <textarea name="amenities" className="input-field input-amenities" value={formData.amenities} onChange={handleChange} placeholder="Amenities (comma separated)" />
                        <textarea name="houseRules" className="input-field input-houseRules" value={formData.houseRules} onChange={handleChange} placeholder="House Rules" />
                        <input type="number" className="input-field input-price" name="price" value={formData.price} onChange={handleChange} placeholder="Price per night" />
                    </div>
                );
            case 4:
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
                            {formData.image_urls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`existing-${index}`}
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
        <div className="edit-spot-form-container">
            <form onSubmit={handleSubmit} className="form edit-spot-form">
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
                    {currentStep !== 4 ? (
                        <button
                            type="submit"
                            className="button button-next"
                            onClick={() => setFormErrors([])}
                        >
                          Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="button button-submit"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
