import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './components/Footer/Footer';
import Loginpage from './components/LoginPage/Loginpage'; // Import the Loginpage component

const App = () => {
  return (
    <Router>
      <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          {/* Define other routes here */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
