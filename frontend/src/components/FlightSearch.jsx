import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightSearchForm = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [leavingDate, setLeavingDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const searchParams = { departure, arrival, leavingDate, returnDate };
    try {
      const response = await fetch("http://localhost:5174/api/search-flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchParams),
      });
      const availableFlights = await response.json();
      navigate("/available-flights", { state: { availableFlights } });
    } catch (error) {
      console.error("Error searching flights:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Search for Flights
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Departure Airport"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Arrival Airport"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            placeholder="Leaving Date"
            value={leavingDate}
            onChange={(e) => setLeavingDate(e.target.value)}
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            placeholder="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
