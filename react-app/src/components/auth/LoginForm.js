import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = ({ closeLoginModal }) => {
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
      closeLoginModal(); // Close modal on successful login
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent modal click from propagating to parent
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    let email = 'demo@aa.io'
    let password = 'password'
    await dispatch(login(email, password))
    history.push("/");
  }


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-modal" onClick={closeLoginModal}>
      <div className="login-form-container" onClick={handleModalClick}>
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
};

export default LoginForm;
