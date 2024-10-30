import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function SeatCollection({ rows, columns, FLight_ID, selectedClass, selectedSeatCount, onSeatSelect }) {
  const [bookingData, setBookingData] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          try {
            const response = await axios.post(`http://localhost:5174/schedule/booked/${FLight_ID}`, { i, j, selectedClass });
            setBookingData((prevData) => ({ ...prevData, [`${i + 1},${j + 1}`]: response.data }));
          } catch (error) {
            console.error("Error fetching booked seats:", error);
          }
        }
      }
    };
    fetchBookedSeats();
  }, [FLight_ID, rows, columns, selectedClass]);

  const handleSeatClick = (seatKey) => {
    if (selectedSeats.includes(seatKey)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey));
    } else if (selectedSeats.length < selectedSeatCount) {
      setSelectedSeats([...selectedSeats, seatKey]);
    }
    onSeatSelect(selectedSeats);
  };

  const renderSeats = () => {
    let count = 1;
    return Array.from({ length: rows }).map((_, i) => (
      <div key={`row-${i}`} className="w-full flex">
        {Array.from({ length: columns }).map((_, j) => {
          const seatNumber = count++;
          const seatKey = `${i + 1},${j + 1}`;
          let className = "w-1/10 px-3 py-3 rounded-2xl ml-2.5 my-1 ";
          if (bookingData[seatKey]) {
            className += "bg-red-400"; // Booked seat
          } else if (selectedSeats.includes(seatKey)) {
            className += "bg-red-600"; // Selected seat
          } else {
            className += "bg-gray-400 hover:bg-gray-500"; // Available seat
          }
          return (
            <button
              key={seatKey}
              className={className}
              style={{ width: "50px", height: "50px" }}
              onClick={() => handleSeatClick(seatKey)}
            >
              <h5 className="text-sm text-center">{String(seatNumber).padStart(2, "0")}</h5>
            </button>
          );
        })}
      </div>
    ));
  };

  return <>{renderSeats()}</>;
}

function Seats() {
  const { FLight_ID } = useParams();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSeatCount, setSelectedSeatCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatConfig, setSeatConfig] = useState([]);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [classPrices, setClassPrices] = useState({});

  useEffect(() => {
    const fetchSeatConfig = async () => {
      try {
        const response = await axios.get(`http://localhost:5174/schedule/booking/${FLight_ID}`);
        setSeatConfig(response.data);
        setClassPrices({
          Economy: response.data[0]?.Price,
          Gold: response.data[1]?.Price,
          Platinum: response.data[2]?.Price,
        });
      } catch (error) {
        console.error("Error fetching seat configuration:", error);
      }
    };
    fetchSeatConfig();
  }, [FLight_ID]);

  const handleClassSelection = (seatClass) => {
    const seatCount = parseInt(prompt("Enter the number of seats to book:"), 10);
    if (seatCount && seatCount > 0) {
      setSelectedClass(seatClass);
      setSelectedSeatCount(seatCount);
      setSelectedSeats([]);
    } else {
      alert("Please enter a valid number of seats.");
    }
  };

  const handleProceed = () => {
    if (selectedClass && selectedSeats.length === selectedSeatCount) {
      setConfirmBooking(true);
    } else {
      alert("Please select the correct number of seats before proceeding.");
    }
  };

  const confirmAndNavigate = () => {
    setConfirmBooking(false);
    navigate("/finalize-booking", {
      state: {
        FLight_ID,
        selectedClass,
        selectedSeats,
      },
    });
  };

  const renderSeatNumbers = () => {
    const seatRows = {
      Platinum: { rows: seatConfig[2]?.PlatinumRows, columns: 10 },
      Gold: { rows: seatConfig[1]?.BusinessRows, columns: 10 },
      Economy: { rows: seatConfig[0]?.EconomyRows, columns: 10 },
    };
    const { rows, columns } = seatRows[selectedClass || "Platinum"];
    return (
      <div className="flex-col w-2/3 m-4 rounded-2xl justify-center items-center">
        <SeatCollection
          rows={rows}
          columns={columns}
          FLight_ID={FLight_ID}
          selectedClass={selectedClass}
          selectedSeatCount={selectedSeatCount}
          onSeatSelect={setSelectedSeats}
        />
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-blue-900 to-black min-h-screen flex items-center justify-center mt-10">
      <div className="bg-gradient-to-b from-blue-900 to-black flex rounded-2xl shadow-lg items-center">
        <div className="flex-col w-1/3">
          <h5 className="text-center px-12 text-lg my-4">AirCraft Model</h5>
          <div className="w-full px-5 py-3">
            {["Platinum", "Gold", "Economy"].map((seatClass) => (
              <div
                key={seatClass}
                className={`w-full px-4 py-2 ${selectedClass === seatClass
                    ? "bg-cyan-600"
                    : "bg-cyan-500 hover:bg-cyan-600"
                  } rounded-2xl mb-4 cursor-pointer`}
                onClick={() => handleClassSelection(seatClass)}
              >
                <h4 className="text-lg">{seatClass} Class</h4>
                <h4 className="text-sm">{`Price: $${classPrices[seatClass] || 0}`}</h4>
              </div>
            ))}
          </div>
          <div className="flex justify-center px-5 mb-2 py-6">
            <button
              type="button"
              onClick={handleProceed}
              className="px-12 bg-[#F97827] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Proceed
            </button>
          </div>
        </div>
        {renderSeatNumbers()}
        {confirmBooking && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold">Confirm Booking</h2>
              <p className="mt-2">Are you sure you want to proceed with this booking?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setConfirmBooking(false)}
                  className="bg-gray-300 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAndNavigate}
                  className="bg-[#F97827] text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Seats;
