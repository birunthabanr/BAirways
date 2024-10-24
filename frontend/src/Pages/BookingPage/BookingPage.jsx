import React from "react";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const location = useLocation();
  const { state } = location; // Access the state object
  const { economySeats, businessSeats, platinumSeats } =
    state?.seatConfiguration || {}; // Safely access seatConfiguration

  return (
    <div className=" flex items-center justify-center p-48 ">
      <div className=" w-full p-16 glass-back grid grid-cols-3 gap-3">
        <div className=" w-full m-3 mb-0 h-14 col-span-3 text-3xl font-bold tracking-wide">
          Book Your Flight!
        </div>
        <div className=" w-full m-3 h-14"></div>
        <div className=" w-full m-3 h-14 bg-black"></div>
        <div className=" w-full m-3 h-14 bg-black"></div>
        <div className=" w-full m-3 h-14 bg-black"></div>
        <div className=" w-full m-3 h-14 bg-black"></div>
        <div className=" w-full m-3 h-14 bg-black"></div>
      </div>

      {/*       
      {economySeats && (
        <>
          <h3>Economy</h3>
          <AircraftSeatLayout totalSeats={economySeats} seatType="Economy" />
        </>
      )}
      
      {businessSeats && (
        <>
          <h3>Business</h3>
          <AircraftSeatLayout totalSeats={businessSeats} seatType="Business" />
        </>
      )}

      {platinumSeats && (
        <>
          <h3>Platinum</h3>
          <AircraftSeatLayout totalSeats={platinumSeats} seatType="Platinum" />
        </>
      )} */}
    </div>
  );
};

export default BookingPage;
