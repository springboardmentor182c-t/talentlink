



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa'; // Import the briefcase icon
import '../App.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            {/* --- Logo Section --- */}
            {/* Kept consistent with your screenshot (Briefcase + TalentLink) */}
            <div className="navbar-brand">
                <Link to="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    {/* The Blue Briefcase Icon */}
                    <FaBriefcase style={{ color: '#3b82f6', fontSize: '1.4rem' }} />
                    
                    {/* The Text: White 'Talent', Blue 'Link' */}
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
                        Talent<span style={{ color: '#3b82f6' }}>Link</span>
                    </span>
                </Link>
            </div>

            {/* --- Navigation Links --- */}
            {/* UPDATED: These now redirect to /signup */}
            <div className="navbar-links">
                <Link to="/signup" className="nav-link">Home</Link>
                <Link to="/signup" className="nav-link">Find Jobs</Link>
                <Link to="/signup" className="nav-link">Companies</Link>
            </div>

            {/* --- Auth Buttons --- */}
            <div className="navbar-auth">
                <button 
                    className="nav-btn-ghost" 
                    onClick={() => navigate('/login')}
                >
                    Log In
                </button>
                <button 
                    className="nav-btn-primary" 
                    onClick={() => navigate('/signup')}
                >
                    Sign Up
                </button>
            </div>
        </nav>
    );
};

export default Navbar;