import React from 'react'
import { MdOutlineChair} from 'react-icons/md'
import AircraftSeatLayout from '../../components/Seat/Seat';
import { useLocation } from 'react-router-dom';

const BookingPage = () => {
  const { state } = useLocation();
  const { economySeats, businessSeats, platinumSeats } = state.seatConfiguration;

  return (
    <div>
      <h2>Choose Your Seats</h2>
      <h3>Economy</h3>
      <AircraftSeatLayout totalSeats={economySeats} seatType="Economy" />
      
      <h3>Business</h3>
      <AircraftSeatLayout totalSeats={businessSeats} seatType="Business" />

      <h3>Platinum</h3>
      <AircraftSeatLayout totalSeats={platinumSeats} seatType="Platinum" />
    </div>
  );
};


export default BookingPage