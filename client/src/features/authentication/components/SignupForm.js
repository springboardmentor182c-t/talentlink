import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    const { signup, isLoading, error, isSuccess } = useSignup();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(
            formData.firstName, 
            formData.lastName, 
            formData.email, 
            formData.password
        );
    };

    // Render success message if signup worked
    if (isSuccess) {
        return (
            <div style={{ textAlign: 'center' }}>
                <h3 className="success-msg">Registration Successful!</h3>
                <p style={{ marginBottom: '15px' }}>Please check your email (or console) for the OTP.</p>
                <Link to="/verify-otp" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '10px 20px' }}>
                    Go to Verification
                </Link>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Global Error Message */}
                {error && error.detail && <p className="error-msg">{error.detail}</p>}

                <div className="form-group">
                    <label>First Name</label>
                    <input 
                        name="firstName" 
                        className="form-input"
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input 
                        name="lastName" 
                        className="form-input"
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="form-input"
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    {/* Field-specific error (e.g., "Email already exists") */}
                    {error && error.email && <small className="error-msg">{error.email[0]}</small>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        className="form-input"
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    {error && error.password && <small className="error-msg">{error.password[0]}</small>}
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignupForm;