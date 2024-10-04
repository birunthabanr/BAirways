import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import './AdminPage.css';

const AdminPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });
    const [flightPassengers, setFlightPassengers] = useState(null); // Store passengers data
    const [flightDetails, setFlightDetails] = useState(null); // Store flight details data

    const handleButtonClick = (title) => {
        setModalContent({ title, content: '' });
        setIsModalOpen(true);
    };

    const fetchPassengersByFlight = (flightId) => {
        // Simulating a backend API call that fetches passengers based on flight ID
        const passengers = [
            { id: 1, name: 'John Doe', age: 17, flightId: flightId },
            { id: 2, name: 'Jane Doe', age: 25, flightId: flightId },
            { id: 3, name: 'Alice Smith', age: 16, flightId: flightId },
            { id: 4, name: 'Bob Johnson', age: 30, flightId: flightId },
        ];
        const filteredPassengers = passengers.filter(p => p.flightId === flightId); // You can add real fetching logic here
        return filteredPassengers;
    };

    const handleFlightIdSubmit = (flightId) => {
        console.log('Flight ID:', flightId); // Handle the flight ID submission
        const passengers = fetchPassengersByFlight(flightId); // Simulated passengers data

        // Separate passengers into below and above age 18
        const below18 = passengers.filter(p => p.age < 18);
        const above18 = passengers.filter(p => p.age >= 18);

        // Set the passengers data
        setFlightPassengers({ below18, above18 });

        setIsModalOpen(false); // Close the modal
    };

    const fetchFlightsByOriginAndDestination = ({ originId, destinationId }) => {
        // Simulating a backend API call that fetches flight details based on origin and destination
        const flights = [
            { flightId: 'FL001', origin: 'Airport A', destination: 'Airport B', passengersCount: 100 },
            { flightId: 'FL002', origin: 'Airport A', destination: 'Airport C', passengersCount: 150 },
            { flightId: 'FL003', origin: 'Airport B', destination: 'Airport A', passengersCount: 200 },
        ];

        // Filtering the flights based on origin and destination
        const filteredFlights = flights.filter(flight => flight.origin === originId && flight.destination === destinationId);
        return filteredFlights;
    };

    const handleFlightDestinationSubmit = ({ originId, destinationId }) => {
        console.log('Origin ID:', originId, 'Destination ID:', destinationId); // Handle the origin and destination IDs submission
        const flights = fetchFlightsByOriginAndDestination({ originId, destinationId }); // Simulated flight data

        // Set the flight details data
        setFlightDetails(flights);

        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className='cont-body'>
            <div className="contain0">
                <h1>Admin Dashboard</h1>
                <div className="button-container">
                    <button onClick={() => handleButtonClick('Passengers by Flight')}>Passengers by Flight</button>
                    <button onClick={() => handleButtonClick('Passengers by Destination')}>Passengers by Destination</button>
                    <button onClick={() => handleButtonClick('Number of Bookings by Passenger')}>Number of Bookings by Passenger</button>
                    <button onClick={() => handleButtonClick('Flights by Destination and Origin')}>Flights by Destination and Origin</button>
                    <button onClick={() => handleButtonClick('Total Revenue by Aircraft')}>Total Revenue by Aircraft</button>
                </div>

                <Modal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    title={modalContent.title} 
                    onSubmit={modalContent.title === 'Passengers by Flight' ? handleFlightIdSubmit : (modalContent.title === 'Flights by Destination and Origin' ? handleFlightDestinationSubmit : null)}
                />

                {flightPassengers && (
                    <div className="passenger-tables">
                        <div>
                            <h2>Passengers Below Age 18</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Passenger ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flightPassengers.below18.map((passenger) => (
                                        <tr key={passenger.id}>
                                            <td>{passenger.id}</td>
                                            <td>{passenger.name}</td>
                                            <td>{passenger.age}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2>Passengers Above Age 18</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Passenger ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flightPassengers.above18.map((passenger) => (
                                        <tr key={passenger.id}>
                                            <td>{passenger.id}</td>
                                            <td>{passenger.name}</td>
                                            <td>{passenger.age}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {flightDetails && (
                    <div className="flight-details">
                        <h2>Flight Details</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Flight ID</th>
                                    <th>Origin</th>
                                    <th>Destination</th>
                                    <th>Passengers Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flightDetails.map((flight) => (
                                    <tr key={flight.flightId}>
                                        <td>{flight.flightId}</td>
                                        <td>{flight.origin}</td>
                                        <td>{flight.destination}</td>
                                        <td>{flight.passengersCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
