import React from 'react';
import './Dashbord.css'; // CSS file for styling
import AdminNav from '../../../components/AdminNav/AdminNav';
import { Link } from 'react-router-dom';

const Dashbord = () => {
  return (
    <div>
        <AdminNav />
        <div className='heading'><h1 className='head'>Welcome to <span className='B'>B</span> Airways Admin page</h1></div>
        <div className="tiles-container">
        <div className='line'>
          <div className="tile">
            <h2>Users</h2>
            <p>75+</p>
          </div>
          <Link to='/schedule'>
          <div className="tile">
            <h2>Flights</h2>
            <p>60+</p>
          </div>
          </Link>
        </div>
        <div className='line'>
             <Link to = "/admin/airplane">
            <div className="tile">
              <h2>Airplanes</h2>
              <p>30+</p>
            </div>
            </Link>
            <div className="tile">
              <h2>Airports</h2>
              <p>20+</p>
            </div>
        </div>
      </div>

      <hr className='hori_line'/>

    </div>
  );
};

export default Dashbord;
