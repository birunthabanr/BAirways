import React, { useState } from 'react';

const SearchFlight = () => {
  // State for selected departure and destination
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  // List of airport options
  const airportOptions = [
    'Soekarno-Hatta Intl',
    'Ngurah Rai Intl',
    'Bandaranaike Intl',
    'Mattala Rajapaksa Intl',
    'Indira Gandhi Intl',
    'Chhatrapati Maharaj',
    'Chennai Intl',
    'Suvarnabhumi Airport',
    'Don Mueang Intl',
    'Singapore Changi Airport',
  ];

  // Handle change for departure and destination
  const handleDepartureChange = (event) => {
    setDeparture(event.target.value);
    if (event.target.value === destination) {
      setDestination(''); // Reset destination if it's the same as the selected departure
    }
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
    if (event.target.value === departure) {
      setDeparture(''); // Reset departure if it's the same as the selected destination
    }
  };

  return (
    <div className="flex items-center justify-center p-48 min-h-screen">
      <div className="w-full p-16 shadow-lg rounded-lg grid grid-cols-3 gap-3 glass-back">
        
        {/* Title */}
        <div className="w-full col-span-3 mb-6 text-center text-3xl font-bold tracking-wide">
          Book Your Flight!
        </div>

        {/* Select Departure */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-100">
            Select Departure
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={departure}
            onChange={handleDepartureChange}
          >
            <option value="">Select...</option>
            {airportOptions
              .filter((airport) => airport !== destination) // Filter out selected destination
              .map((airport) => (
                <option key={airport} value={airport}>
                  {airport}
                </option>
              ))}
          </select>
        </div>

        {/* Select Destination */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-100">
            Select Destination
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="">Select...</option>
            {airportOptions
              .filter((airport) => airport !== departure) // Filter out selected departure
              .map((airport) => (
                <option key={airport} value={airport}>
                  {airport}
                </option>
              ))}
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

        

        <div className="w-full flex items-end">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;


