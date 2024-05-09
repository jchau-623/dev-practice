import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';


export default function LoginButton() {
    const [showLoginModal,setShowLoginModal] = useState(false)

    const openLoginModal = () => {
        setShowLoginModal(true);
      };

      const closeLoginModal = () => {
        setShowLoginModal(false);
      };


  useEffect(() => {
    if (!showLoginModal) return
    const closeLoginModal = (e) => {
      setShowLoginModal(false)
    }
  }, [showLoginModal])
  return (
    <div>
      <button onClick={openLoginModal} type='button'>
        Login
      </button>
      {showLoginModal && (
        <Modal onClose={closeLoginModal}>
          <LoginForm closeLoginModal={closeLoginModal} />
        </Modal>
      )}
    </div>
  );
};
