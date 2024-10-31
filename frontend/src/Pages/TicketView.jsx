import React, { useState, useEffect } from "react";
import Ticket from "../components/Ticket";

const TicketView = () => {
  const [passengerInfo, setPassengerInfo] = useState(null);

  useEffect(() => {
    const storedPassengerInfo = localStorage.getItem("passengerInfo");
    if (storedPassengerInfo) {
      setPassengerInfo(JSON.parse(storedPassengerInfo));
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Ticket
        flightID={passengerInfo.firstName}
        firstName={passengerInfo.firstName}
        lastName={passengerInfo.lastName}
        departureAirport={passengerInfo.departureAirport}
        departureTime={passengerInfo.departureTime}
        arrivalAirport={passengerInfo.arrivalAirport}
        arrivalTime={passengerInfo.arrivalTime}
        seatID={passengerInfo.seatID}
        price={passengerInfo.price}
      />
    </div>
  );
};

export default TicketView;