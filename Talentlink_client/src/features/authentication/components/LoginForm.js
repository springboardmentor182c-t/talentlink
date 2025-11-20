import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { loginUser } from '../services/login';
// Import your UI components if you want to use them:
// import FormInput from '../../../components/Form/FormInput'; 

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
            await loginUser(email, password);
            // Redirect to Home/Dashboard after success
            navigate('/'); 
        } catch (err) {
            setError(err.detail || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
             {/* Removed inline style, used form-group class */}
            <form onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-input" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="forgot-password-container">
                        <Link to="/forgot-password" className="forgot-password-text">
                            Forgot Password?
                        </Link>
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