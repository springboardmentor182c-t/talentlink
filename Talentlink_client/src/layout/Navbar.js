// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <h3>TalentLink</h3>
//             <Link to="/" className="nav-link">Home</Link>
//             <Link to="/login" className="nav-link">Login</Link>
//             <Link to="/signup" className="nav-link">Signup</Link>
//         </nav>
//     );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* 1. Professional Logo Section */}
            <div className="navbar-brand">
                <Link to="/" className="logo-link">
                    {/* SVG Icon for "TalentLink" */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 7H19.6C20.9255 7 22 8.07452 22 9.4V19.6C22 20.9255 20.9255 22 19.6 22H4.4C3.07452 22 2 20.9255 2 19.6V9.4C2 8.07452 3.07452 7 4.4 7H10" stroke="#007BFF" strokeWidth="2" strokeLinecap="round"/>
                        <rect x="9" y="2" width="6" height="8" rx="1" fill="#007BFF"/>
                    </svg>
                    <span className="logo-text">Talent<span className="logo-accent">Link</span></span>
                </Link>
            </div>

            {/* 2. Center Navigation */}
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/" className="nav-link">Find Jobs</Link>
                <Link to="/" className="nav-link">Companies</Link>
            </div>

            {/* 3. Right Side Auth Buttons */}
            <div className="navbar-auth">
                <Link to="/login" className="nav-btn-ghost">Log In</Link>
                <Link to="/signup" className="nav-btn-primary">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navbar;