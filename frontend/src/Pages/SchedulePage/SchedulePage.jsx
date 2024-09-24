import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



const Schedule = ({ isAdmin }) => {
    const [flights, setFlights] = useState([]);
    const [editable, setEditable] = useState(null);
    const [schedule, setSchedule] = useState([]);

    let navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`); // Redirect to the edit page with flight ID
    };

    // Fetch flight schedule data on component mount
    useEffect(() => {
        axios.get('http://localhost:5174/schedule').then(res => {
            console.log(res);
            setSchedule(res.data);
        })

    }, []);

    var scheduleDetails = "";
    scheduleDetails = schedule.map((item, index) => {
        return (
            <tr key = {index}>
                <td>{item.Flight_ID}</td>
                <td>{item.Aircraft_ID}</td>
                <td>{item.Flight_price}</td>
                <td>{item.Flight_price}</td>
                <td>{item.Expected_arrival_date_time}</td>
                <td>{item.Departure_date_time}</td>
                <td>{item.Created_By}</td>
                <td>
                    <Link to ="/book" className = "btn btn-success">Book</Link>
                </td>
                <td>
                    <button 
                        className="btn btn-success" 
                        onClick={() => handleEdit(item.Flight_ID)} // Use item.Flight_ID for navigation
                    >
                        Edit
                    </button>
                </td>
            </tr>
        )
    });

    

    const handleSave = (id) => {
        axios.put(`http://localhost:5174/api/schedule/${id}`, schedule)
            .then(res => {
                alert(res.data);
                setEditable(null);
                // Refresh the table after saving
                return axios.get('http://localhost:5174/schedule');
            })
            .then(res => setFlights(res.data))
            .catch(err => console.error(err));
    };

    const handleChange = (e, field) => {
        setUpdatedFlight({ ...updatedFlight, [field]: e.target.value });
    };

    return (
        <div>
            {/* <h1>Flight Schedule</h1> */}
            <div className ="contain">
                <div className = "row">
                    <div className = "col-md-12">
                        <div className='card'>
                            <div className = "card-header">
                                <h4>Flight Schedule
                                    <Link to="/" className ="btn btn-primary float-end">Add Schedule</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <table className = "table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Route Code</th>
                                            <th>Name of the Plane</th>
                                            <th>Price</th>
                                            <th>Route</th>
                                            <th>Arrival Time</th>
                                            <th>Landing Time</th>
                                            <th>Created By</th>
                                            <th>Book</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scheduleDetails}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <table border="1">
                <thead>
                    <tr>
                        <th>Name of the Plane</th>
                        <th>Price</th>
                        <th>Route</th>
                        <th>Arrival Time</th>
                        <th>Landing Time</th>
                        {isAdmin && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight.id}>
                            <td>
                                {editable === flight.id ? (
                                    <input
                                        type="text"
                                        defaultValue={flight.plane_name}
                                        onChange={(e) => handleChange(e, 'plane_name')}
                                    />
                                ) : (
                                    flight.plane_name
                                )}
                            </td>
                            <td>
                                {editable === flight.id ? (
                                    <input
                                        type="text"
                                        defaultValue={flight.price}
                                        onChange={(e) => handleChange(e, 'price')}
                                    />
                                ) : (
                                    flight.price
                                )}
                            </td>
                            <td>
                                {editable === flight.id ? (
                                    <input
                                        type="text"
                                        defaultValue={flight.route}
                                        onChange={(e) => handleChange(e, 'route')}
                                    />
                                ) : (
                                    flight.route
                                )}
                            </td>
                            <td>
                                {editable === flight.id ? (
                                    <input
                                        type="text"
                                        defaultValue={flight.arrival_time}
                                        onChange={(e) => handleChange(e, 'arrival_time')}
                                    />
                                ) : (
                                    flight.arrival_time
                                )}
                            </td>
                            <td>
                                {editable === flight.id ? (
                                    <input
                                        type="text"
                                        defaultValue={flight.landing_time}
                                        onChange={(e) => handleChange(e, 'landing_time')}
                                    />
                                ) : (
                                    flight.landing_time
                                )}
                            </td>
                            {isAdmin && (
                                <td>
                                    {editable === flight.id ? (
                                        <button onClick={() => handleSave(flight.id)}>Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(flight.id)}>Edit</button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default Schedule;
