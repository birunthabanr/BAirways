import React from "react";

const Ticket = ({
  flightID,
  firstName,
  lastName,
  departureAirport,
  departureTime,
  arrivalAirport,
  arrivalTime,
  seatID,
  price,
}) => {
  return (
    <div class="bg-white shadow-xl rounded-lg max-w-lg w-full">
      <div class="p-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Flight Ticket</h2>
          <p class="text-gray-500">Your ticket details are shown below</p>
        </div>

        <div class="bg-blue-500 text-white rounded-t-lg p-4">
          <p class="font-semibold text-lg">
            Flight: <span class="ml-2 font-normal text-white">{flightID}</span>
          </p>
          <p class="font-semibold text-lg">
            Passenger:{" "}
            <span class="ml-2 font-normal text-white">
              {firstName + " " + lastName}
            </span>
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 p-6 bg-white text-gray-800">
          <div>
            <p class="text-gray-600 font-semibold">{departureAirport}</p>
            <p>City Name</p>
            <p>{departureTime}</p>
          </div>

          <div>
            <p class="text-gray-600 font-semibold">{arrivalAirport}</p>
            <p>City Name</p>
            <p>{arrivalTime}</p>
          </div>

          <div class="col-span-2 border-t mt-4 pt-4">
            <p class="text-gray-600 font-semibold">Seat</p>
            <p>{seatID}</p>
          </div>

          <div class="col-span-2">
            <p class="text-gray-600 font-semibold">Price</p>
            <p>{price}</p>
          </div>
        </div>

        <div class="bg-blue-500 rounded-b-lg p-4 text-center text-white">
          <p>Thank you for choosing BAirways! Have a pleasant journey.</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
