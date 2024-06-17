import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/airbnb-logo.png';
import LoginModal from '../auth/LoginModal';
import './AirbnbYourHomePageNavbar.css';

export default function AirbnbYourHomePageNavbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const user = useSelector(({ session }) => session.user);

    const openLoginModal = () => {
        setShowLoginModal(true);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    return (
        <div className="header-content">
            <div className="header-left">
                <div className="navbar-logo">
                    <NavLink to='/' exact activeClassName='active'>
                        <img src={logo} alt='logo' />
                    </NavLink>
                </div>
            </div>
            <div className="header-right">
                <h2>Ready to Airbnb it?</h2>
                {!user && (
                    <button className="setup-button-unauthenticated" onClick={openLoginModal}>
                        <i className="fa-regular fa-house-medical" />
                        Airbnb Setup
                    </button>
                )}
                {showLoginModal && (
                    <LoginModal closeLoginModal={closeLoginModal} />
                )}
            {user && (
                <NavLink to="/create-spot" className="setup-button">
                    <i className="fa-regular fa-house-medical" />
                    Airbnb Setup
                </NavLink>
            )}
            </div>
        </div>
    );
}
