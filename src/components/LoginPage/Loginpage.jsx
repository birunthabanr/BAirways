import React, {useState} from 'react';
// import {FontAwesomeIcon} from '@fontawesome/react-fontawesome';
// import { faUser, faLock, faEnvelope } from '@fontawesome/free-solid-svg-icons';
import './Loginpage.css'
// import React, { useState } from 'react';
// import './style.css'; // Ensure this matches the CSS file in your HTML

function Loginpage() {
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const handleSignUpClick = () => setIsSignUpMode(true);
    const handleSignInClick = () => setIsSignUpMode(false);

    return (
        <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className='forms-container'>
                <div className='signin-signup'>
                    <form className='sign-in-form'>
                        <h2 className='title text-4xl font-semibold text-gray-200'>Sign in</h2>
                        <div className='input-field'>
                            <i className="fas fa-user"></i>
                            <input className='LoginInput' type="text" placeholder="Username" />
                        </div>
                        <div className='input-field'>
                            <i className="fas fa-lock"></i>
                            <input className='LoginInput' type="password" placeholder="Password" />
                        </div>
                        <input type="submit" value="Login" className='bg-blue-400 px-10 py-2 rounded-md border-[2px] border-blue-400 border-solid ease-in-out blueShadowBig font-semibold' />
                        
                    </form>
                    <form className='sign-up-form'>
                        <h2 className='title title text-4xl font-semibold text-gray-200'>Sign up</h2>
                        <div className='input-field'>
                            <i className="fas fa-user"></i>
                            <input className='LoginInput' type="text" placeholder="Username" />
                        </div>
                        <div className='input-field'>
                            <i className="fas fa-envelope"></i>
                            <input className='LoginInput' type="email" placeholder="Email" />
                        </div>
                        <div className='input-field'>
                            <i className="fas fa-lock"></i>
                            <input className='LoginInput' type="password" placeholder="Password" />
                        </div>
                        <input type="submit" className='bg-blue-400 px-10 py-2 rounded-md border-[2px] border-blue-400 border-solid ease-in-out blueShadowBig font-semibold' value="Sign up" />
                        
                    </form>
                </div>
            </div>

            <div className='panels-container'>
                <div className='panel left-panel'>
                    <div className='content'>
                        <h3>New here ?</h3>
                        <p>Create an account with us today! Enjoy easy bookings, exclusive offers, and stay updated with the latest travel news. Join our community now and elevate your travel experience!</p>
                        <button onClick={handleSignUpClick} className='btn transparent' id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src="img/log.svg" className='image' alt="" />
                </div>
                <div className='panel right-panel'>
                    <div className='content'>
                        <h3>One of us ?</h3>
                        <p>Log in to your account here for quick access to bookings, updates, and exclusive offers.</p>
                        <button onClick={handleSignInClick} className='btn transparent' id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src="img/register.svg" className='image' alt="" />
                </div>
            </div>
        </div>
    );
}

export default Loginpage;
