import React, { useState } from 'react';
import './AdminNav.css'; // CSS file for styling

const AdminNav = () => {
  const [showReportsMenu, setShowReportsMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowReportsMenu(true);
  };

  const handleMouseLeave = () => {
    setShowReportsMenu(false);
  };

  return (
        <div className="horizontal-menu">
        <div>
           <a href ="/" className='logo'>B Airways</a>
        </div>
        <div className='links'>
        <a href="/admin/dashboard">Dashboard</a>
        <a href="#">Airplane</a>
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
        <a href="/schedule">Flight Schedule</a>
        </div>
        </div>
  );
};

export default AdminNav;
