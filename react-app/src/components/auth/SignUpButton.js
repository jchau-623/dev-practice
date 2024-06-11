import React, { useState } from 'react';
import { Modal } from '../../context/Modal'; // Assuming you have a modal context for rendering modals
import SignUpModal from './SignUpModal'; // Import your SignUpModal component

export default function SignUpButton() {
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const openSignUpModal = () => {
        setShowSignUpModal(true);
    };

    const closeSignUpModal = () => {
        setShowSignUpModal(false);
    };

    return (
        <div>
            <button onClick={openSignUpModal} type='button'>
                Sign Up
            </button>
            {showSignUpModal && (
                <Modal onClose={closeSignUpModal}>
                    <SignUpModal closeSignUpModal={closeSignUpModal} />
                </Modal>
            )}
        </div>
    );
};
