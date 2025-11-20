import React from 'react';
import Navbar from '../layout/Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <h1>Welcome to TalentLink</h1>
                <p>This is the dashboard.</p>
            </div>
        </div>
    );
};

export default Home;