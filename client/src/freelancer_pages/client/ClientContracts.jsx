


import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // Ensure this path is correct

const ClientContracts = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
            const response = await axiosInstance.get('/contracts/');
            setContracts(response.data);
        } catch (error) {
            console.error("Error fetching contracts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to safely format dates
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return dateString;
        }
    };

    // Helper to safely format currency
    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return '$0.00';
        return `$${Number(amount).toLocaleString()}`;
    };

    return (
        <div className="client-page-container">
            {/* --- INTERNAL CSS --- */}
            <style>{`
                .client-page-container { padding: 40px; background-color: #f8fafc; min-height: 100vh; }
                .page-header h1 { font-size: 26px; color: #1e293b; margin-bottom: 20px; }
                
                .contracts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
                
                .contract-card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
                .contract-title { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 5px; }
                .contract-meta { font-size: 13px; color: #64748b; margin-bottom: 15px; }
                
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
                .label { color: #64748b; }
                .value { font-weight: 600; color: #334155; }
                
                .badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
                .badge.active { background: #dbeafe; color: #1e40af; }
                .badge.completed { background: #dcfce7; color: #166534; }
            `}</style>

            <div className="page-header">
                <h1>My Contracts</h1>
            </div>

            {loading ? (
                <p>Loading contracts...</p>
            ) : contracts.length === 0 ? (
                <p>No active contracts found.</p>
            ) : (
                <div className="contracts-grid">
                    {contracts.map((contract) => (
                        <div key={contract.id} className="contract-card">
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                <span className={`badge ${contract.status || 'active'}`}>
                                    {contract.status || 'Active'}
                                </span>
                                <span style={{fontSize:'12px', color:'#94a3b8'}}>
                                    ID: {contract.id}
                                </span>
                            </div>

                            <h3 className="contract-title">{contract.title}</h3>
                            <p className="contract-meta">
                                Freelancer: {contract.freelancer_name || `User #${contract.freelancer}`}
                            </p>

                            <div className="detail-row">
                                <span className="label">Amount:</span>
                                {/* THE FIX: using helper function */}
                                <span className="value" style={{color: '#2563eb'}}>
                                    {formatCurrency(contract.total_amount)}
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Start Date:</span>
                                {/* THE FIX: using helper function */}
                                <span className="value">{formatDate(contract.start_date)}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Created:</span>
                                {/* THE FIX: using helper function */}
                                <span className="value">{formatDate(contract.created_at)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientContracts;