import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddAirports.css"


const AddAirports = () => {
    const [formData, setFormData] = useState({
        Airport_ID: '',
        Short_name: '',
        Name: '',
        Country: '',
        State: '',
        City: ''
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };``

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5174/aircraft', formData)
            .then(res => {
                if(res.status === 400){
                    alert('Model name not found in the models table.');
                }
                else
                {
                alert('Craft added successfully!');
                navigate('/admin/airplane');
                } // Redirect to schedule list page after successful addition
            })
            .catch(err => {
                console.error(err);
                alert('Error adding Aircraft');
            });
    };

    return (
        <div className="contain1">
            <h2>Add New Airport</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Airport ID</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Airport_ID"
                        value={formData.Airport_ID}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Short Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Short_name"
                        value={formData.Short_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"> Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="Country"
                        value={formData.Country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">State</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="State"
                        value={formData.State}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">City</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="City"
                        value={formData.City}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" className="btn-btn-primary">Add Airport</button>
            </form>
        </div>
    );
};

export default AddAirports;
