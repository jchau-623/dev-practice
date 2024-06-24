import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/airbnb-logo.png';
import './CreateSpotPage.css';

export default function CreateSpotPage() {
    const user = useSelector(({ session }) => session.user);

    return (
        <>
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
            <div className="create-spot-page-container">
                <h1 className="welcome-message">Welcome back, {user.username}!</h1>
                <NavLink to="/create-spot/overview" className="create-listing-button">
                    Create a Spot
                </NavLink>
            </div>
        </>
    );
}
