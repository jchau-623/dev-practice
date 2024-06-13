import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/airbnb-logo.png';

export default function AirbnbYourHomePageNavbar() {
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
                <NavLink to="/setup" className="setup-button">Airbnb Setup</NavLink>
            </div>
        </div>
    );
}
