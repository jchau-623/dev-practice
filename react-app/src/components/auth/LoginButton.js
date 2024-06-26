import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginModal from './LoginModal';

export default function LoginButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (e) => {
        if (e) {
            e.stopPropagation();
        }
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <button onClick={toggleModal} type='button'>
                Log In
            </button>
            {isModalOpen && (
                <Modal onClose={toggleModal}>
                    <LoginModal closeLoginModal={toggleModal} />
                </Modal>
            )}
        </div>
    );
}
