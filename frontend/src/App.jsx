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
import { AuthContext } from './helpers/AuthContext';

const App = () => {

  
  return (
    
    <Router>
      <div>
      <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
        <Navbar />
        <div style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/add-schedule" element={<AddSchedulePage />} />
          {/* Define other routes here */}
        </Routes>
        </div>
      </main>
      </div>
    </Router>
  );
};

export default App;
