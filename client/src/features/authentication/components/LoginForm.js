

import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { loginUser } from '../services/login';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginUser(email, password);
            
            // --- DEBUG LOGS (Check your Console!) ---
            console.log("1. Full Backend Response:", response);
            console.log("2. Role from Backend:", response.role);
            console.log("3. Role from LocalStorage:", localStorage.getItem('role'));
            // ----------------------------------------

            const userRole = response.role || localStorage.getItem('role'); 

            if (userRole && userRole.toLowerCase() === 'freelancer') {
                console.log("Redirecting to FREELANCER...");
                navigate('/freelancer'); 
            } else if (userRole && userRole.toLowerCase() === 'client') {
                console.log("Redirecting to CLIENT...");
                navigate('/client');
            } else {
                console.log("Role not found, Redirecting to HOME...");
                navigate('/'); 
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError(err.detail || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-input" 
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-input"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <div className="forgot-password-container">
                        <Link to="/forgot-password" className="forgot-password-text">Forgot Password?</Link>
                    </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;