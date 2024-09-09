import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

    const navigate = useNavigate();
    
    const handleSignInClick = () => {
        navigate('/login'); // Navigate to the login page
      };

  return (

    
    <header className="header">
        <a href ="/" className='logo'>B Airways</a>

        <nav className='navbar flex items-center space-x-6'>
            <a href='/'>Home</a>
            <a href='/'>Book</a>
            <a href='/'>Flight Schedule</a>
            <button className='px-3 py-1 rounded-md border-[2px] border-blue-400 border-solid blueShadow gap-4' onClick={handleSignInClick}>
                <p>Log In</p> 
            </button>
            <button className='px-3 py-1 rounded-md border-[2px] border-blue-400 border-solid blueShadow gap-4' onClick={handleSignInClick}>
                <p>Sign In</p> 
            </button>
        </nav>
    </header>
  )
}

export default Navbar