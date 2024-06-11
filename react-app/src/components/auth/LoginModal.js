import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginModal.css';

export default function LoginModal({ closeLoginModal }) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      // Check if closeLoginModal is a function before calling it
      if (typeof closeLoginModal === 'function') {
        closeLoginModal(); // Close modal on successful login
      }
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    let email = 'demo@aa.io'
    let password = 'password'
    await dispatch(login(email, password))
    history.push("/");
  }

  // Handle clicks outside of the modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".login-form-container")) {
        // Check if closeLoginModal is a function before calling it
        if (typeof closeLoginModal === 'function') {
          closeLoginModal();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeLoginModal]);

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-modal">
      <div className="login-form-container">
        <form onSubmit={handleLogin}>
          <div className="login-form-header">
            <h2>Welcome to AirBnB</h2>
          </div>
          <div className="login-form-group">
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
          </div>
          <div className="login-form-submit">
            <button type='submit'>Login</button>
            <button id='demo-login' onClick={demoLogin}>Demo User</button>
          </div>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}
