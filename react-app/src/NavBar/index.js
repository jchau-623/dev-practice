import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/airbnb-logo.png';
import LogoutButton from '../components/auth/LogoutButton';
import LoginModal from '../components/auth/LoginModal';
import SignUpModal from '../components/auth/SignUpModal';
import './NavBar.css';

export default function NavBar() {
  const user = useSelector(({ session }) => session.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close modals when clicking outside of them
  const handleModalClick = (e) => {
    if (!dropdownRef.current.contains(e.target)) {
      setShowLoginModal(false);
      setShowSignUpModal(false);
    }
  };

  return (
    <nav className="navbar" onClick={handleModalClick}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to='/' exact activeClassName='active'>
            <img src={logo} alt='logo' />
          </NavLink>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <NavLink to='/stays' activeClassName='active'>Stays</NavLink>
            </li>
            <li>
              <NavLink to='/experiences' activeClassName='active'>Experiences</NavLink>
            </li>
            <li>
              <NavLink to='/online-experiences' activeClassName='active'>Online Experiences</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-user">
          <div className="dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="dropbtn">
              &#9776; {/* Hamburger icon */}
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                {user ? (
                  <LogoutButton />
                ) : (
                  <div className="navbar-auth">
                    <button onClick={() => setShowLoginModal(true)}>Login</button>
                    <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search destinations" className="nav-search-input"/>
        <input type="text" placeholder="Check in" className="nav-search-input"/>
        <input type="text" placeholder="Check out" className="nav-search-input"/>
        <input type="number" placeholder="Add guests" min="1" className="nav-search-input"/>
        <button className="search-btn">Search</button>
      </div>
      {showLoginModal && (
        <LoginModal closeModal={() => setShowLoginModal(false)} />
      )}
      {showSignUpModal && (
        <SignUpModal closeModal={() => setShowSignUpModal(false)} />
      )}
    </nav>
  );
}
