import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './LoginModal.css';

export default function LoginModal({ closeLoginModal }) {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      if (typeof closeLoginModal === 'function') {
        closeLoginModal();
      }
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    let email = 'demo@aa.io';
    let password = 'password';
    await dispatch(login(email, password));
    if (typeof closeLoginModal === 'function') {
      closeLoginModal();
    }
  }

  return (
    <div className="login-modal">
      <div className="login-form-container">
        <div className="login-form-header">
          <h2>Welcome to AirBnB</h2>
          <button className="close-btn-login" onClick={closeLoginModal}>X</button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="error-handling">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
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
        </form>
      </div>
    </div>
  );
}
