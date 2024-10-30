import React from "react";
import { useLocation } from "react-router-dom";

const FlightResults = () => {
  const location = useLocation();
  const { flights } = location.state || {}; // Retrieve flights data from location.state

  return (
    <div className="flex items-center justify-center p-10 min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-10 shadow-2xl rounded-lg bg-white">
        <h2 className="text-center text-3xl font-bold mb-6">
          Available Flights
        </h2>
        {flights && flights.length > 0 ? (
          <ul>
            {flights.map((flight, index) => (
              <li key={index} className="mb-4 p-4 bg-gray-200 rounded-lg">
                <p>
                  <strong>Flight ID:</strong> {flight.Flight_ID}
                </p>
                <p>
                  <strong>Aircraft:</strong> {flight.Aircraft}
                </p>
                <p>
                  <strong>Departure:</strong> {flight.Departure_date_time}
                </p>
                <p>
                  <strong>Arrival:</strong> {flight.Expected_arrival_date_time}
                </p>
                <p>
                  <strong>Price:</strong> ${flight.Flight_price}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights available for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FlightResults;
