import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./EditPage.css"

const EditPage = () => {
    const { id } = useParams(); // Get flight ID from URL parameters
    const [flightData, setFlightData] = useState({
        Aircraft_ID: '',
        Departure_date_time: '',
        Expected_arrival_date_time: '',
        Flight_price: '',
        Created_By: '',
        // Add more fields as necessary
    });
    const navigate = useNavigate();

    // Fetch flight data on component mount
    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get(`http://localhost:5174/schedule/${id}`);
                console.log(response.data);
                setFlightData(response.data);
            } catch (error) {
                console.error('Error fetching flight data:', error);
                alert('Could not fetch flight data. Please try again.');
            }
        };
        fetchFlightData();
    }, [id]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5174/schedule/${id}`, flightData);
            console.log(response.data);
            alert('Flight schedule updated successfully!');
            navigate('/schedule');
        } catch (error) {
            console.error('Error updating flight schedule:', error);
            alert('Could not update flight schedule. Please try again.');
        }
    };

    return (
        <div className="contain2">
            <h2>Edit Flight {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Aircraft_ID">Aircraft ID</label>
                    <input
                        type="text"
                        name="Aircraft_ID"
                        value={flightData.Aircraft_ID || ''} // Ensure default value is ''
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Departure Date & Time</label>
                    <input
                        type="datetime-local"
                        name="Departure_date_time"
                        value={flightData.Departure_date_time ? flightData.Departure_date_time.split('.')[0] : ''} // Check for undefined
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Expected Arrival Date & Time</label>
                    <input
                        type="datetime-local"
                        name="Expected_arrival_date_time"
                        value={flightData.Expected_arrival_date_time ? flightData.Expected_arrival_date_time.split('.')[0] : ''} // Check for undefined
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Flight Price</label>
                    <input
                        type="number"
                        name="Flight_price"
                        value={flightData.Flight_price || ''} // Ensure default value is ''
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label>Created By</label>
                    <input
                        type="text"
                        name="Created_By"
                        value={flightData.Created_By || ''} // Ensure default value is ''
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPage;
