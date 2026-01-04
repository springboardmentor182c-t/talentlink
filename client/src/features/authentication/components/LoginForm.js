import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

            const userRole = response.role || localStorage.getItem('role');

            if (userRole && userRole.toLowerCase() === 'freelancer') {
                navigate('/freelancer');
            } else if (userRole && userRole.toLowerCase() === 'client') {
                navigate('/client');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.detail || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%' }}>
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

            {/* ===== OAuth Section ===== */}
            <div style={{ marginTop: '22px', textAlign: 'center' }}>
                <p style={{ color: '#aaa', marginBottom: '12px' }}>OR</p>

                {/* Google Button */}
                <button
                    onClick={() =>
                        window.location.href =
                        'http://127.0.0.1:8000/auth/login/google-oauth2/'
                    }
                    style={styles.oauthButton}
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google"
                        style={styles.icon}
                    />
                    Continue with Google
                </button>

                {/* GitHub Button */}
                <button
                    onClick={() =>
                        window.location.href =
                        'http://127.0.0.1:8000/auth/login/github/'
                    }
                    style={{ ...styles.oauthButton, marginTop: '10px' }}
                >
                    <img
                        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                        alt="GitHub"
                        style={styles.icon}
                    />
                    Continue with GitHub
                </button>
            </div>
        </div>
    );
};

/* ===== Inline Styles (Clean & Professional) ===== */
const styles = {
    oauthButton: {
        width: '100%',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '15px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    icon: {
        width: '20px',
        height: '20px',
    },
};

export default LoginForm;
