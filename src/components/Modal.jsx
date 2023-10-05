import React from 'react';
import './modal.css';

export default function Modal({ isOpen, onClose, link }) {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Kopioi alla oleva linkki ja jaa se oppilaille:</p>
        <input
          type="text"
          value={link}
          readOnly
          onClick={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}
