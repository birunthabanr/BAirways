import React, { useState } from 'react';
import { MdOutlineChair } from 'react-icons/md';

const Seat = ({ seatNumber, isSelected, onClick }) => {
  return (
    <MdOutlineChair
      className={`text-3xl cursor-pointer ${isSelected ? 'text-violet-600' : 'text-neutral-600'}`}
      onClick={onClick}
    />
  );
};

const AircraftSeatLayout = () => {
  const totalSeats = 50; // Adjust the total number of seats based on aircraft capacity
  const seatsPerColumn = 9; // Define the number of seats per column (vertical stacking)
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert('You can only select a maximum of 10 seats');
      }
    }
  };

  const renderSeats = () => {
    let seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Seat
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          onClick={() => handleSeatClick(i)}
        />
      );
    }
    return seats;
  };

  const renderSeatLayout = () => {
    let layout = [];
    for (let column = 1; column <= Math.ceil(totalSeats / seatsPerColumn); column++) {
      let columnSeats = [];
      for (let seat = 1; seat <= seatsPerColumn; seat++) {
        let seatNumber = (column - 1) * seatsPerColumn + seat;
        if (seatNumber <= totalSeats) {
          columnSeats.push(
            <Seat
              key={seatNumber}
              seatNumber={seatNumber}
              isSelected={selectedSeats.includes(seatNumber)}
              onClick={() => handleSeatClick(seatNumber)}
            />
          );
        }
      }
      layout.push(
        <div key={column} className="flex flex-col items-center gap-4 my-2">
          {columnSeats} {/* Render seats vertically in a column */}
        </div>
      );
    }
    return layout;
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">Choose a Seat</h2>

      <div className="w-full flex justify-center">
        <div className="flex flex-row gap-4">
          {renderSeatLayout()} {/* Renders columns of vertically stacked seats */}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-lg font-semibold">Selected Seats:</h3>
        <p>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}</p>
      </div>
    </div>
  );
};

export default AircraftSeatLayout;
