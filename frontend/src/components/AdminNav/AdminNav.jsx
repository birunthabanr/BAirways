import React, { useState } from 'react';
import './AdminNav.css'; // CSS file for styling

const AdminNav = () => {
  const [showReportsMenu, setShowReportsMenu] = useState(false);
  const [showAirplaneMenu, setShowAirplaneMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowReportsMenu(true);
  };

  const handleMouseEnterAirplane = () => {
    setShowAirplaneMenu(true);
  };

  const handleMouseLeave = () => {
    setShowReportsMenu(false);
  };

  const handleMouseLeaveAirplane = () => {  
    setShowAirplaneMenu(false);
  };

  return (
        <div className="horizontal-menu">
        <div>
           <a href ="/" className='logo'>B Airways</a>
        </div>
        <div className='links'>
        <a href="/admin/dashboard">Dashboard</a>
        {/* <a href="/admin/airplane">Airplane</a> */}
        <div
            className='submenu'
            onMouseEnter={handleMouseEnterAirplane}
            onMouseLeave={handleMouseLeaveAirplane}
        >
          <a href="#">Airplanes</a>
            {showAirplaneMenu && (
            <div className="submenu-items">
                <a href="/admin/airplane">Aircrafts</a>
                <a href="/admin/model">Models</a>
            </div>
            )}
        </div>
        <div 
            className="submenu" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <a href="#">Reports</a>
            {showReportsMenu && (
            <div className="submenu-items">
                <a href="#">Report 1</a>
                <a href="#">Report 2</a>
                <a href="#">Report 3</a>
            </div>
            )}
        </div>
        <a href="/admin/schedule">Flight Schedule</a>
        <a href="#">Routes</a>
        <a href = "/admin/airport">Airports</a>
        </div>
        </div>
  );
};

export default AdminNav;
