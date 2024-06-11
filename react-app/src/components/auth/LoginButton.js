import React, { useState } from 'react';
import { Modal } from '../../context/Modal'; // Assuming you have a modal context for rendering modals
import LoginModal from './LoginModal'; // Import your LoginModal component

export default function LoginButton() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const openLoginModal = () => {
        setShowLoginModal(true);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    return (
        <div>
            <button onClick={openLoginModal} type='button'>
                Login
            </button>
            {showLoginModal && (
                <Modal onClose={closeLoginModal}>
                    <LoginModal closeLoginModal={closeLoginModal} />
                </Modal>
            )}
        </div>
    );
};
