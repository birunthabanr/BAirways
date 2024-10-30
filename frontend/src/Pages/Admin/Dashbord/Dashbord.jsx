import React, { useEffect, useState } from 'react';
import './Dashbord.css'; // CSS file for styling
import AdminNav from '../../../components/AdminNav/AdminNav';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashbord = () => {
   const [count, setCount] = useState(0);
   const [flight_count, setFlight_count] = useState(0);
   const [aircraft_count, setAircraft_count] = useState(0);
   const [airport_count, setAirport_count] = useState(0);

   const animateCount = (start, end, setter) => {
       let current = start;
       const increment = end / 120; // Adjust the speed of animation
       const animate = () => {
           current += increment;
           if (current < end) {
               setter(Math.ceil(current));
               requestAnimationFrame(animate);
           } else {
               setter(end); // Set to the exact final count at the end
           }
       };
       animate();
   };

   useEffect(() => {
       axios.get('http://localhost:5174/user/count').then(res => {
           animateCount(0, res.data, setCount);
       });

       axios.get('http://localhost:5174/schedule/count').then(res => {
           animateCount(0, res.data, setFlight_count);
       });

       axios.get('http://localhost:5174/aircraft/count/total').then(res => {
           animateCount(0, res.data, setAircraft_count);
       });

       axios.get('http://localhost:5174/airport/count').then(res => {
           animateCount(0, res.data, setAirport_count);
       });
   }, []);

   return (
       <div>
           <AdminNav />
           <div className='heading'><h1 className='head'>Welcome to <span className='B'>B</span> Airways Admin page</h1></div>
           <div className="tiles-container">
               <div className='line'>
                   <div className="tile">
                       <h2>Users</h2>
                       <p>{count}+</p>
                   </div>
                   <Link to='/admin/add-schedule'>
                       <div className="tile">
                           <h2>Flights</h2>
                           <p>{flight_count}+</p>
                       </div>
                   </Link>
               </div>
               <div className='line'>
                   <Link to="/admin/airplane">
                       <div className="tile">
                           <h2>Airplanes</h2>
                           <p>{aircraft_count}+</p>
                       </div>
                   </Link>
                   <div className="tile">
                       <Link to="/admin/airport">
                           <h2>Airports</h2>
                           <p>{airport_count}+</p>
                       </Link>
                   </div>
               </div>
           </div>
           <hr className='hori_line'/>
       </div>
   );
};

export default Dashbord;
