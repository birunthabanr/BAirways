import React from 'react';
import './Dashbord.css'; // CSS file for styling
import AdminNav from '../../../components/AdminNav/AdminNav';

const Dashbord = () => {
  return (
    <div>
        <AdminNav />
        <div className="tiles-container">
        <div className="tile">
          <h2>Users</h2>
          <p>75+</p>
        </div>
        <div className="tile">
          <h2>Flights</h2>
          <p>60+</p>
        </div>
        <div className="tile">
          <h2>Airplanes</h2>
          <p>30+</p>
        </div>
      </div>

    </div>
  );
};

export default Dashbord;
