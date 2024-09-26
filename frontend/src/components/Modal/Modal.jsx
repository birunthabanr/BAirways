import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, onSubmit }) => {
    const [flightId, setFlightId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = () => {
        if (title === 'Passengers by Flight' && flightId) {
            onSubmit(flightId);
            onClose(); // Close the modal after submitting
        } else if (title === 'Passengers by Destination' && startDate && endDate) {
            onSubmit({ startDate, endDate });
            onClose(); // Close the modal after submitting
        } else {
            alert('Please fill in all required fields.'); // Simple validation
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                {title === 'Passengers by Flight' && (
                    <div>
                        <input 
                            type="text" 
                            placeholder="Enter Flight ID" 
                            value={flightId} 
                            onChange={(e) => setFlightId(e.target.value)} 
                        />
                    </div>
                )}
                {title === 'Passengers by Destination' && (
                    <div>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                        />
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                        />
                    </div>
                )}
                <p>Provide details for your request.</p>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
