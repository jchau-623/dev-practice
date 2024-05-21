import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import logo from '../assets/airbnb-logo.png';
import LogoutButton from '../components/auth/LogoutButton';
import LoginButton from '../components/auth/LoginButton';

const NavBar = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(({ session }) => session.user);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to='/' exact={true} activeClassName='active'>
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
          {user ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search destinations" className="nav-search-input"/>
        <input type="text" placeholder="Check in" className="nav-search-input"/>
        <input type="text" placeholder="Check out" className="nav-search-input"/>
        <input type="number" placeholder="Add guests" min="1" className="nav-search-input"/>
        <button className="search-btn">Search</button>
      </div>
    </nav>
  );
}

export default NavBar;
