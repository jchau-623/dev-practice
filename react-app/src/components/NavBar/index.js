import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/airbnb-logo.png';
import { logout } from '../../store/session';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';
import './NavBar.css';

export default function NavBar() {
  const user = useSelector(({ session }) => session.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(prev => !prev);
  };

  const handleLogout = (e) => {
    e.stopPropagation();
    dispatch(logout());
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
        {user && (
          <ul className="navbar-links">
            <li>
              <NavLink to='/my-spots'>
                <button className='my-listings-button'>My Spots</button>
              </NavLink>
            </li>
          </ul>
        )}
        <div className="navbar-user">
          <NavLink to='/users/spots'>
            <button className="airbnb-your-home">Airbnb your home</button>
          </NavLink>
          <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
            <button onClick={toggleDropdown} className="dropbtn">
              <i className="fa-solid fa-bars"></i>
              <i className="fa-solid fa-user"></i>
            </button>
            <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
              {user ? (
                <div className="navbar-auth">
                  <div onClick={handleLogout} className='auth-div'>
                    <button>Logout</button>
                  </div>
                </div>
              ) : (
                <div className="navbar-auth">
                  <div className='auth-div' onClick={() => setShowLoginModal(true)}>
                    <button>Login</button>
                  </div>
                  <div className='auth-div' onClick={() => setShowSignUpModal(true)}>
                    <button>Sign Up</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search destinations" className="nav-search-input" />
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
