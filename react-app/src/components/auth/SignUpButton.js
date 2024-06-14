import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpModal from './SignUpModal';

export default function SignUpButton() {
    const [SignUpModalOpen, SetSignUpModalOpen] = useState(false);

    const toggleSignUpModal = (e) => {
        if (e) {
            e.stopPropagation();
        }
        SetSignUpModalOpen(!SignUpModalOpen);
    };

    return (
        <div>
            <button onClick={toggleSignUpModal} type='button'>
                Sign Up
            </button>
            {SignUpModalOpen && (
                <Modal onClose={toggleSignUpModal}>
                    <div onClick={toggleSignUpModal}>
                        <SignUpModal />
                    </div>
                </Modal>
            )}
        </div>
    );
}
