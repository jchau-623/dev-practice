import React from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

export default function EditSpotModal({ show, handleClose, spot }) {
  if (!show) return null;

  return (
    <Modal onClose={handleClose}>
      <EditSpotForm spot={spot} handleClose={handleClose} />
    </Modal>
  );
}
