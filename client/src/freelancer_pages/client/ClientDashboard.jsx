import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../../context/UserContext';
// 1. Import useTheme to access dynamic colors
import { useTheme } from '@mui/material/styles';

// --- SVG ICONS ---
const Icons = {
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  ),
  Wallet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-8h-4z"></path></svg>
  ),
  Briefcase: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  ),
  Invoice: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
  )
};

// --- MOCK DATA ---
const spendingData = [
  { name: 'Jan', value: 1200 }, { name: 'Feb', value: 2100 },
  { name: 'Mar', value: 1800 }, { name: 'Apr', value: 3500 },
  { name: 'May', value: 3100 }, { name: 'Jun', value: 5200 },
  { name: 'Jul', value: 7800 },
];

const activityFeed = [
  { id: 1, text: 'Received 3 new proposals for "Website Redesign"', time: '1 hour ago', icon: <Icons.FileText />, color: '#3b82f6' },
  { id: 2, text: 'Payment released to Sarah for "UI Milestone"', time: '4 hours ago', icon: <Icons.Wallet />, color: '#10b981' },
  { id: 3, text: 'Invoice #1024 is pending approval', time: '1 day ago', icon: <Icons.Invoice />, color: '#f59e0b' },
  { id: 4, text: 'Job Post "React Developer" is now live', time: '2 days ago', icon: <Icons.Briefcase />, color: '#6366f1' },
];

const deadlines = [
  { id: 1, title: 'Approve Milestone 2', date: 'Due Tomorrow', tag: 'Action Required', color: '#ef4444' },
  { id: 2, title: 'Review "Mobile App" Proposal', date: 'Expires in 2 days', tag: 'Hiring', color: '#f59e0b' },
];

const activeJobs = [
  { id: 1, title: 'Website Redesign', applicants: 12, status: 'Interviewing' },
  { id: 2, title: 'SEO Optimization', applicants: 5, status: 'Reviewing' },
  { id: 3, title: 'Mobile App Dev', applicants: 0, status: 'Draft' },
];

const ClientDashboard = () => {
  const navigate = useNavigate(); 
  const { user } = useUser();
  
  // 2. Get the current theme
  const theme = useTheme();

  const handlePostJob = () => {
    navigate('/client/projects'); 
  };

  // 3. Create Dynamic Styles based on theme
  const themeStyles = {
    card: {
        ...styles.card,
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
    },
    textPrimary: { color: theme.palette.text.primary },
    textSecondary: { color: theme.palette.text.secondary },
    chartGrid: theme.palette.mode === 'dark' ? "#334155" : "#f1f5f9",
    chartText: theme.palette.mode === 'dark' ? "#94a3b8" : "#94a3b8",
    select: {
        ...styles.select,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* --- Header --- */}
      <div style={styles.header}>
        <div>
          <p style={{...styles.greeting, color: theme.palette.text.secondary }}>Welcome back, {user?.name || user?.email || 'User'}</p>
          <h1 style={{...styles.title, color: theme.palette.text.primary }}>Client Overview</h1>
          <p style={{...styles.subtitle, color: theme.palette.text.secondary }}>Manage your job postings, proposals, and hired talent.</p>
        </div>
        <button style={styles.btn} onClick={handlePostJob}> 
          <span style={{ marginRight: '8px', display: 'flex' }}><Icons.Plus /></span> Post a Job
        </button>
      </div>

      {/* --- Top Stats Row --- */}
      <div style={styles.statsGrid}>
        <StatCard 
          icon={<Icons.Wallet />} 
          title="Total Spent" 
          value="₹12,450" 
          change="+15% vs last mo" 
          color="#3b82f6"
          theme={theme} // Pass theme down
        />
        <StatCard 
          icon={<Icons.Briefcase />} 
          title="Open Job Posts" 
          value="3" 
          change="1 Draft" 
          color="#8b5cf6"
          theme={theme}
        />
        <StatCard 
          icon={<Icons.FileText />} 
          title="New Proposals" 
          value="18" 
          change="5 to review" 
          color="#10b981"
          theme={theme}
        />
        <StatCard 
          icon={<Icons.Users />} 
          title="Hired Talent" 
          value="4" 
          change="Active Contracts" 
          color="#ec4899"
          theme={theme}
        />
      </div>

      {/* --- Middle Section: Chart & Deadlines --- */}
      <div style={styles.grid}>
        
        {/* Main Chart */}
        <div style={{...themeStyles.card, flex: 2}}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={{...styles.cardTitle, ...themeStyles.textPrimary}}>Spending History</h2>
              <div style={{...styles.subTitle, ...themeStyles.textSecondary}}>Payments to freelancers over last 6 months</div>
            </div>
            <select style={themeStyles.select}><option>This Year</option></select>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:12}} prefix="₹" />
                <Tooltip 
                  contentStyle={{borderRadius:'8px', border:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}} 
                  formatter={(value) => [`₹${value}`, 'Spent']}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Deadlines & Hiring Status */}
        <div style={{...styles.column, flex: 1}}>
          
          {/* Deadlines Widget */}
          <div style={{...themeStyles.card, marginBottom: '20px'}}>
            <h2 style={{...styles.cardTitle, ...themeStyles.textPrimary}}>Actions Required</h2>
            <div style={styles.list}>
              {deadlines.map(d => (
                <div key={d.id} style={{...styles.deadlineItem, borderBottom: `1px solid ${theme.palette.divider}`}}>
                  <div style={styles.deadlineInfo}>
                    <span style={{color: d.color, marginRight:'10px', display:'flex'}}><Icons.Clock /></span>
                    <div>
                      <div style={{...styles.itemTitle, ...themeStyles.textPrimary}}>{d.title}</div>
                      <div style={{...styles.itemSub, ...themeStyles.textSecondary}}>{d.date}</div>
                    </div>
                  </div>
                  <span style={{...styles.tag, color: d.color, backgroundColor: `${d.color}20`}}>
                    {d.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Postings Status */}
          <div style={themeStyles.card}>
            <h2 style={{...styles.cardTitle, ...themeStyles.textPrimary}}>Job Postings</h2>
            <div style={styles.list}>
              {activeJobs.map(job => (
                <div key={job.id} style={{marginBottom: '15px'}}>
                   <div style={styles.flexBetween}>
                      <span style={{...styles.itemTitle, ...themeStyles.textPrimary}}>{job.title}</span>
                      <span style={{...styles.itemSub, fontWeight: '600', color: '#3b82f6'}}>
                        {job.status}
                      </span>
                   </div>
                   <div style={{...styles.itemSub, ...themeStyles.textSecondary}}>
                     {job.applicants} Applicants
                   </div>
                   <div style={{...styles.progressBarBg, backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#f1f5f9'}}>
                      <div style={{
                        ...styles.progressBarFill, 
                        width: job.status === 'Interviewing' ? '70%' : job.status === 'Reviewing' ? '40%' : '10%',
                        backgroundColor: job.status === 'Draft' ? '#94a3b8' : '#3b82f6'
                      }}></div>
                   </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- Bottom Section: Recent Activity --- */}
      <div style={themeStyles.card}>
        <h2 style={{...styles.cardTitle, ...themeStyles.textPrimary}}>Hiring & Payment Activity</h2>
        <div style={styles.activityList}>
          {activityFeed.map((item, index) => (
            <div key={item.id} style={styles.activityItem}>
              <div style={{...styles.activityIcon, backgroundColor: `${item.color}20`, color: item.color}}>
                {item.icon}
              </div>
              <div style={styles.activityContent}>
                <div style={{...styles.activityText, ...themeStyles.textPrimary}}>{item.text}</div>
                <div style={{...styles.activityTime, ...themeStyles.textSecondary}}>{item.time}</div>
              </div>
              {/* Connector Line */}
              {index !== activityFeed.length - 1 && <div style={{...styles.connectorLine, backgroundColor: theme.palette.divider}}></div>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

// --- Helper Component: Stat Card ---
const StatCard = ({ icon, title, value, change, color, theme }) => (
  <div style={{
      ...styles.statCard, 
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      boxShadow: theme.shadows[1]
  }}>
    <div style={styles.statHeader}>
      <div style={{...styles.statIcon, backgroundColor: `${color}20`, color: color}}>
        {icon}
      </div>
      <span style={{...styles.statChange, color: theme.palette.text.secondary}}>
        {change}
      </span>
    </div>
    <div style={{...styles.statValue, color: theme.palette.text.primary}}>{value}</div>
    <div style={{...styles.statTitle, color: theme.palette.text.secondary}}>{title}</div>
  </div>
);

// --- STYLES (Kept as base, colors overridden dynamically) ---
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  greeting: {
    fontSize: '14px',
    margin: 0,
    marginBottom: '4px',
    fontWeight: '600',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    marginTop: '5px',
  },
  btn: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
    transition: '0.2s',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '25px',
  },
  statCard: {
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid', // Color handled dynamically
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    fontSize: '12px',
    fontWeight: '500',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  statTitle: {
    fontSize: '13px',
    marginTop: '4px',
  },
  grid: {
    display: 'flex',
    gap: '25px',
    marginBottom: '25px',
    flexWrap: 'wrap',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    padding: '25px',
    borderRadius: '16px',
    border: '1px solid', // Color handled dynamically
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    margin: 0,
  },
  subTitle: {
    fontSize: '12px',
    marginTop: '4px',
  },
  select: {
    border: '1px solid',
    borderRadius: '6px',
    padding: '6px 10px',
    fontSize: '12px',
    outline: 'none',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '15px',
  },
  deadlineItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
  },
  deadlineInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: '600',
  },
  itemSub: {
    fontSize: '12px',
  },
  tag: {
    fontSize: '10px',
    fontWeight: '700',
    padding: '4px 8px',
    borderRadius: '12px',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  progressBarBg: {
    height: '6px',
    width: '100%',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '8px',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '3px',
  },
  activityList: {
    marginTop: '20px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px',
    position: 'relative',
  },
  activityIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    zIndex: 2,
    flexShrink: 0,
    fontSize: '16px',
  },
  activityContent: {
    paddingTop: '4px',
  },
  activityText: {
    fontSize: '14px',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: '12px',
    marginTop: '2px',
  },
  connectorLine: {
    position: 'absolute',
    left: '17px',
    top: '36px',
    bottom: '-25px',
    width: '2px',
    zIndex: 1,
  }
};

export default ClientDashboard;