import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './components/Footer/Footer';
import Loginpage from './components/LoginPage/Loginpage'; // Import the Loginpage component
import SchedulePage from './Pages/SchedulePage/SchedulePage';
import BookingPage from './Pages/BookingPage/BookingPage';
import EditPage from './Pages/EditPage/EditPage';
import AddSchedulePage from './Pages/AddSchedulePage/AddSchedulePage';
import AdminPage from './Pages/AdminPage/AdminPage';
import { AuthContext } from './helpers/AuthContext';
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin';
import Dashbord from './Pages/Admin/Dashbord/Dashbord';
import Airplane from './Pages/Admin/Airplane/Airplane';
import AddAirplane from './Pages/Admin/AddAirplane/AddAirplane';
import Model from './Pages/Admin/Model/Model';
import AddModel from './Pages/Admin/AddModel/AddModel';
import EditAirplane from './Pages/Admin/EditAirplane/EditAirplane';
import EditModel from './Pages/Admin/EditModel/EditModel';
import Airports from './Pages/Admin/Airports/Airports';
import AddAirports from './Pages/Admin/AddAirpots/AddAirports';
import AdminScheduleFlight from './Pages/Admin/ScheduleFlight/ScheduleFlight';
import Report1 from './Pages/Reports/Report 1/Report_1';
import Report2 from './Pages/Reports/Report 2/Report_2';
import Report3 from './Pages/Reports/Report 3/Report_3';
import Report4 from './Pages/Reports/Report 4/Report_4';
// import BookSeats from './Pages//BookSeats/BookSeats';
import SearchFlight from './Pages/SearchFlight/SearchFlight';
import SeatBooking from './components/Seats/Seat';
import Seats from './components/Seats/SeatBooking';


const App = () => {

  
  return (
    
    <Router>
      <div>
      <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
        {/* <Navbar /> */}
        {/* <div style={{ marginTop: '80px' }}> */}
        <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/admin/schedule" element={<SchedulePage />} />
          <Route path ="/schedule" element={<SchedulePage/>} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/add-schedule" element={<AddSchedulePage />} />
          <Route path = "/admin" element={<AdminPage />} />
          <Route path = "/admin/login" element = {<AdminLogin />} />
          <Route path = "/admin/dashboard" element = {<Dashbord/>} />
          <Route path = "/admin/airplane" element = {<Airplane/>} />
          <Route path = "/admin/add-airplane" element = {<AddAirplane/>} />
          <Route path = "/admin/model" element = {<Model/>} />  
          <Route path = "/admin/add-model" element = {<AddModel/>} />
          <Route path = "/admin/edit-airplane/:id" element = {<EditAirplane/>} />
          <Route path = "/admin/edit-model/:id" element = {<EditModel/>}/>
          <Route path = "/admin/airport" element = {<Airports/>}/>
          <Route path = "/admin/add-airport" element = {<AddAirports/>}/>
          <Route path = "/admin/add-schedule" element = {<AdminScheduleFlight/>}/>
          <Route path = "/admin/report1" element = {<Report1/>}/>
          <Route path = "/admin/report2" element = {<Report2/>}/>
          <Route path = "/admin/report3" element = {<Report3/>}/>
          <Route path = "/admin/report4" element = {<Report4/>}/>
          {/* <Route path = "/book/:aircraftid" element = {<BookSeats/>}/> */}
          <Route path = "/search-flight" element = {<SearchFlight/>}/>
          <Route path="/book/:FLight_ID" element={<Seats />} />
          {/* Define other routes here */}
        </Routes>
        </div>
      </main>
      </div>
    </Router>
  );
};

export default App;
