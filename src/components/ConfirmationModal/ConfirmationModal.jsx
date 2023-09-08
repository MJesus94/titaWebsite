import "./ConfirmationModal.css";
import React from "react";

function ConfirmationModal({ onCancel, onConfirm }) {
  return (
    <div className="overlay">
      <div className="confirmation-modal">
        <p>Are you sure you want to delete this product?</p>
        <button className="cancelButton" onClick={onCancel}>
          Cancel
        </button>
        <button className="confirmButton" onClick={onConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
