import React from "react";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const location = useLocation();
  const { state } = location; // Access the state object
  const { economySeats, businessSeats, platinumSeats } =
    state?.seatConfiguration || {}; // Safely access seatConfiguration

  return (
    <div className="flex items-center justify-center p-48 min-h-screen">
      <div className="w-full p-16 shadow-lg rounded-lg grid grid-cols-3 gap-3 glass-back">
        {/* Title */}
        <div className="w-full col-span-3 mb-6 text-center text-3xl font-bold tracking-wide">
          Book Your Flight!
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-100">
            Select Departure
          </label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>Select...</option>
            <option>City A</option>
            <option>City B</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-100">
            Select Destination
          </label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>Select...</option>
            <option>City X</option>
            <option>City Y</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-100">
            Select Class
          </label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>Select...</option>
            <option>Economy</option>
            <option>Business</option>
            <option>Platinum</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-100">
            Select Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-100">
            Select Time
          </label>
          <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option>Select...</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>

        <div className="w-full flex items-end">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
