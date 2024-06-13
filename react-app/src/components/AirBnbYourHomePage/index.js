import React, { useState } from 'react';
import AirbnbYourHomePageNavbar from './AirbnbYourHomePageHeader';
import './AirbnbYourHomePage.css';

export default function AirbnbYourHomePage() {
    const [nights, setNights] = useState(7);
    const pricePerNight = 379;
    const estimatedEarnings = nights * pricePerNight;

    const handleSliderChange = (e) => {
        setNights(e.target.value);
    };

    return (
        <div className="airbnb-your-home-container">
            <div className="custom-header">
                <AirbnbYourHomePageNavbar />
            </div>
            <div className="content">
                <header className="hero-section">
                    <h1>Airbnb it.</h1>
                    <p className="earnings">
                        You could earn
                        <span className="earnings-amount"> ${estimatedEarnings.toLocaleString()}</span>
                    </p>
                    <p className="earnings-breakdown">
                        {nights} nights at an estimated ${pricePerNight} a night
                    </p>
                </header>

                <div className="estimator">
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={nights}
                        onChange={handleSliderChange}
                        className="slider"
                    />
                </div>

                <footer className="footer-section">
                    <p>Learn how we estimate your earnings</p>
                    <p>Queens</p>
                    <p>Entire place, 2 bedrooms</p>
                </footer>
            </div>
        </div>
    );
}
