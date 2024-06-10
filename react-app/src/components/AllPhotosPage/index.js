import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import PhotoModal from './PhotoModal';
import './AllPhotosPage.css';

export default function AllPhotosPage() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots.spots);
    const spot = spots ? spots[spotId] : null;
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);


    if (!spot) {
        return <div>Loading...</div>;
    }

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="all-photos-page">
            <h1>{spot.name} - All Photos</h1>
            <div className="all-photos-grid">
                {spot.image_urls.map((imageUrl, index) => (
                    <div key={index} className="photo-item" onClick={() => handleImageClick(imageUrl)}>
                        <img src={imageUrl} alt={`Spot ${index + 1}`} />
                    </div>
                ))}
            </div>
            {selectedImage && <PhotoModal imageUrl={selectedImage} onClose={handleCloseModal} />}
        </div>
    );
}
