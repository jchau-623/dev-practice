import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginButton from './auth/LoginButton';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ session }) => session.user);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
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
