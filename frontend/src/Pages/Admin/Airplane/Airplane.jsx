import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "./Airplane.css"
// import EditPage from '../EditPage/EditPage';
import AdminNav from '../../../components/AdminNav/AdminNav';

const Airplane = ({ isAdmin }) => {
    const [flights, setFlights] = useState([]);
    const [editable, setEditable] = useState(null);
    const [planes, setPlanes] = useState([]);

    let navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`); // direct to the edit page with flight ID
    };

    const handleAddSchedule = () => {
        navigate('/add-schedule'); // direct to the add schedule page
    };
     
    const handleBook = async (aircraft_Id) => {
        try {
            const response = await axios.get(`http://localhost:5174/aircraft/${aircraft_Id}`);
            const seatConfiguration = response.data; // This will contain economy, business, platinum seat counts
    
            // Pass state correctly
            navigate('/book', { state: { seatConfiguration } }); // Make sure to use `state` object
        } catch (error) {
            console.error('Error fetching seat configuration', error);
        }
    };


    const handleRemove = (Aircraft_ID) => {
         axios.delete(`http://localhost:5174/aircraft/${Aircraft_ID}`);
            setPlanes(planes.filter((item) => item.Aircraft_ID !== Aircraft_ID));
    };



    
      

    // Fetch flight schedule data on component mount
    useEffect(() => {
        axios.get('http://localhost:5174/aircraft').then(res => {
            console.log(res);
            setPlanes(res.data);
        })

    }, []);

    var planeDetails = "";
    planeDetails = planes.map((item, index) => {
        return (
            <tr key = {index} className='data'>
                <td>{item.Aircraft_ID}</td>
                <td>{item.Model_name}</td>
                <td>{item.EconomyClassSeatCount}</td>
                <td>{item.BusinessClassSeatCount}</td>
                <td>{item.PlatinumClassSeatCount}</td>
                <td>
                    <button 
                    className="btn btn-success" 
                    onClick={() => handleRemove(item.Aircraft_ID)} // Pass Aircraft_ID to handleBook
                    >
                    Remove
                    </button>
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

    

    // const handleSave = (id) => {
    //     axios.put(`http://localhost:5174/api/schedule/${id}`, schedule)
    //         .then(res => {
    //             alert(res.data);
    //             setEditable(null);
    //             // Refresh the table after saving
    //             return axios.get('http://localhost:5174/schedule');
    //         })
    //         .then(res => setFlights(res.data))
    //         .catch(err => console.error(err));
    // };

    // const handleChange = (e, field) => {
    //     setUpdatedFlight({ ...updatedFlight, [field]: e.target.value });
    // };

    return (
        <div>
            {/* <h1>Flight Schedule</h1> */}
            <AdminNav />
            <div className ="contain">
                <div className = "row">
                    <div className = "col-md-12">
                        <div className='card'>
                            <div className = "card-header">
                                <h4>Aircrafts
                                    <Link to="/admin/add-airplane" className ="btn btn-primary float-end">Add Aircraft</Link>
                                </h4>
                            </div>
                            <div className='card-body'>
                                <table className = "table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Aircraft_ID</th>
                                            <th>Name of Model</th>
                                            <th>Economy Class Seat Count</th>
                                            <th>Business Class Seat Count</th>
                                            <th>Platinum Class Seat Count</th>
                                            <th>Remove</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {planeDetails}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <Router>
                <Route path="/edit/:id" element={<EditPage />} />
            </Router> */}
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

export default Airplane;
