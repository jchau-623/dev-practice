import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../components/auth/LogoutButton'
import LoginButton from '../components/auth/LoginButton';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css'
import logo from '../../assets/aibnb-logo.png';// Adjust the path accordingly

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ session }) => session.user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='title-logo' alt='logo'>
              <img className='logo' src={logo} alt='logo-pic'></img>
            </div>
          </NavLink>
        </li>
        {user ? (
          // If user is logged in, show the logout button
          <li>
            <LogoutButton />
          </li>
        ) : (
          // If user is not logged in, show the login button
          <li>
            <LoginButton />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
