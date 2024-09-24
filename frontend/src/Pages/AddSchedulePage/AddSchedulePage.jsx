import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSchedulePage = () => {
    const [formData, setFormData] = useState({
        Flight_ID: '',
        Aircraft_ID: '',
        Flight_price: '',
        Expected_arrival_date_time: '',
        Departure_date_time: '',
        Created_By: '',
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5174/schedule', formData)
            .then(res => {
                alert('Schedule added successfully!');
                navigate('/'); // Redirect to schedule list page after successful addition
            })
            .catch(err => {
                console.error(err);
                alert('Error adding schedule');
            });
    };

    return (
        <div className="contain">
            <h2>Add New Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Flight ID</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Flight_ID"
                        value={formData.Flight_ID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Aircraft ID</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Aircraft_ID"
                        value={formData.Aircraft_ID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Flight Price</label>
                    <input 
                        type="number" 
                        className="form-control"
                        name="Flight_price"
                        value={formData.Flight_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Expected Arrival Date/Time</label>
                    <input 
                        type="datetime-local" 
                        className="form-control"
                        name="Expected_arrival_date_time"
                        value={formData.Expected_arrival_date_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Departure Date/Time</label>
                    <input 
                        type="datetime-local" 
                        className="form-control"
                        name="Departure_date_time"
                        value={formData.Departure_date_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Created By</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Created_By"
                        value={formData.Created_By}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Schedule</button>
            </form>
        </div>
    );
};

export default AddSchedulePage;
