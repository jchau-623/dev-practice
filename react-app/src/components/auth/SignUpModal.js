import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal } from '../../context/Modal';
import './SignUpModal.css';

export default function SignUpModal({ closeSignUpModal }) {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password, repeatPassword));
            if (data) {
                setErrors(data);
            } else {
                closeSignUpModal();
            }
        } else {
            setErrors(["Passwords do not match"]);
        }
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <Modal onClose={closeSignUpModal}>
            <div className="sign-up-form-container">
                <div className="sign-up-form-header">
                    <h2>Sign Up</h2>
                    <button className="close-btn" onClick={closeSignUpModal}>X</button>
                </div>
                <form onSubmit={onSignUp}>
                    <div className="error-handling">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className="sign-up-form-group">
                        <label>User Name</label>
                        <input
                            type='text'
                            name='username'
                            onChange={(e) => handleInputChange(e, setUsername)}
                            value={username}
                        />
                    </div>
                    <div className="sign-up-form-group">
                        <label>Email</label>
                        <input
                            type='text'
                            name='email'
                            onChange={(e) => handleInputChange(e, setEmail)}
                            value={email}
                        />
                    </div>
                    <div className="sign-up-form-group">
                        <label>Password</label>
                        <input
                            type='password'
                            name='password'
                            onChange={(e) => handleInputChange(e, setPassword)}
                            value={password}
                        />
                    </div>
                    <div className="sign-up-form-group">
                        <label>Repeat Password</label>
                        <input
                            type='password'
                            name='repeat_password'
                            onChange={(e) => handleInputChange(e, setRepeatPassword)}
                            value={repeatPassword}
                        />
                    </div>
                    <div className="sign-up-form-submit">
                        <button type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
