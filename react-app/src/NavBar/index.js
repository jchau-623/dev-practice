import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/airbnb-logo.png';
import { logout } from '../store/session'; // Import your logout action
import LoginModal from '../components/auth/LoginModal';
import SignUpModal from '../components/auth/SignUpModal';
import './NavBar.css';

export default function NavBar() {
  const user = useSelector(({ session }) => session.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showDropdown) return;
    const handleClick = (e) => {
      setShowDropdown(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showDropdown]);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());

    // Reset the login modal state
    setShowLoginModal(false);
  };

  return (
    <nav className="navbar">
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
          <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
            <button onClick={toggleDropdown} className="dropbtn">
              &#9776; {/* Hamburger icon */}
            </button>
            <div className="dropdown-content">
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <div className="navbar-auth">
                  <button onClick={() => setShowLoginModal(true)}>Login</button>
                  <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
                </div>
              )}
            </div>
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
        <LoginModal closeLoginModal={() => setShowLoginModal(false)} />
      )}
      {showSignUpModal && (
        <SignUpModal closeSignUpModal={() => setShowSignUpModal(false)} />
      )}
    </nav>
  );
}
