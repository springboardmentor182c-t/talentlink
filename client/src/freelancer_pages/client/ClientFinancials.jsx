import React from 'react';

// --- SVG Icons ---
const Icons = {
  Wallet: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-8h-4z"/></svg>,
  Invoice: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  ArrowUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
};

const transactions = [
  { id: 'INV-001', date: 'Nov 29, 2025', description: 'Milestone 1: UI Design', freelancer: 'Sarah Smith', amount: '₹1,200.00', status: 'Paid' },
  { id: 'INV-002', date: 'Nov 25, 2025', description: 'Server Setup Fee', freelancer: 'Mike Johnson', amount: '₹450.00', status: 'Pending' },
  { id: 'INV-003', date: 'Nov 15, 2025', description: 'Logo Design Bundle', freelancer: 'DesignCo', amount: '₹800.00', status: 'Paid' },
  { id: 'INV-004', date: 'Nov 01, 2025', description: 'Consultation Hour', freelancer: 'Alex Brown', amount: '₹150.00', status: 'Paid' },
];

const ClientFinancials = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Financial Overview</h1>
      
      {/* Summary Cards */}
      <div style={styles.statsGrid}>
        <StatCard title="Total Spent" amount="₹12,450.00" icon={<Icons.Wallet />} color="#3b82f6" />
        <StatCard title="Pending Invoices" amount="₹450.00" icon={<Icons.Invoice />} color="#f59e0b" />
        <StatCard title="Last Payment" amount="₹1,200.00" sub="Paid to Sarah Smith" icon={<Icons.ArrowUp />} color="#10b981" />
      </div>

      {/* Transactions Table */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Transaction History</h2>
          <button style={styles.outlineBtn}>
            <span style={{marginRight: '8px', display:'flex'}}><Icons.Download /></span> Export Report
          </button>
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr style={styles.tHeadRow}>
              <th style={styles.th}>Invoice ID</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Freelancer</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} style={styles.tr}>
                <td style={styles.td}>{t.id}</td>
                <td style={styles.td}>{t.date}</td>
                <td style={{...styles.td, fontWeight: '500'}}>{t.description}</td>
                <td style={styles.td}>{t.freelancer}</td>
                <td style={{...styles.td, fontWeight: 'bold'}}>{t.amount}</td>
                <td style={styles.td}>
                  <span style={{...styles.badge, backgroundColor: t.status === 'Paid' ? '#dcfce7' : '#fef3c7', color: t.status === 'Paid' ? '#166534' : '#b45309'}}>
                    {t.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.linkBtn}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, amount, sub, icon, color }) => (
  <div style={styles.statCard}>
    <div style={{...styles.iconBox, backgroundColor: `${color}15`, color: color}}>{icon}</div>
    <div>
      <div style={styles.statTitle}>{title}</div>
      <div style={styles.statAmount}>{amount}</div>
      {sub && <div style={styles.statSub}>{sub}</div>}
    </div>
  </div>
);

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto' },
  pageTitle: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '25px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' },
  statCard: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' },
  iconBox: { width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statTitle: { fontSize: '13px', color: '#64748b', fontWeight: '600' },
  statAmount: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b' },
  statSub: { fontSize: '12px', color: '#94a3b8' },
  card: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  cardTitle: { fontSize: '18px', fontWeight: 'bold', color: '#1e293b' },
  outlineBtn: { padding: '8px 16px', border: '1px solid #e2e8f0', backgroundColor: 'transparent', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569', fontSize: '13px', fontWeight: '500' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tHeadRow: { borderBottom: '2px solid #f1f5f9' },
  th: { textAlign: 'left', padding: '12px 10px', fontSize: '13px', color: '#64748b', fontWeight: '600' },
  tr: { borderBottom: '1px solid #f8fafc' },
  td: { padding: '14px 10px', fontSize: '14px', color: '#334155' },
  badge: { padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' },
  linkBtn: { background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }
};

export default ClientFinancials;