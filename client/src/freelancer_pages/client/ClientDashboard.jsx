import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

// --- SVG ICONS (Self-contained to avoid import errors) ---
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

const ClientDashboard = () => {
  const navigate = useNavigate();

  // State Management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dashboard Stats
  const [stats, setStats] = useState({
    totalSpent: '$0',
    openJobPosts: 0,
    newProposals: 0,
    hiredTalent: 0,
  });

  // Data Arrays
  const [spendingData, setSpendingData] = useState([]);
  const [activityFeed, setActivityFeed] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [projects, setProjects] = useState([]);

  // Helper function to get relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  // Fetch all dashboard data
  useEffect(() => {
    const generateSpendingHistory = (contractsData) => {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentMonth = new Date().getMonth();
      const spendingByMonth = {};

      // Initialize last 7 months
      for (let i = 6; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        spendingByMonth[monthNames[monthIndex]] = 0;
      }

      // Aggregate spending by month
      contractsData.forEach(contract => {
        const date = new Date(contract.created_at);
        const month = monthNames[date.getMonth()];
        
        if (spendingByMonth.hasOwnProperty(month)) {
          // Extract numeric value from bid_amount if it's a string
          const amount = parseFloat(contract.proposal?.bid_amount || 0);
          spendingByMonth[month] += amount;
        }
      });

      // Convert to chart format
      const chartData = Object.keys(spendingByMonth).map(month => ({
        name: month,
        value: Math.round(spendingByMonth[month])
      }));

      setSpendingData(chartData);
    };

    const generateActivityFeed = (proposalsData, contractsData, projectsData) => {
      const activities = [];

      // Recent proposals (pending)
      const recentProposals = proposalsData
        .filter(p => p.status === 'pending')
        .slice(0, 2)
        .map(p => ({
          id: `proposal-${p.id}`,
          text: `New proposal received for "${p.project_title}"`,
          time: getRelativeTime(p.created_at),
          icon: <Icons.FileText />,
          color: '#3b82f6',
          timestamp: new Date(p.created_at),
        }));

      // Recent contracts
      const recentContracts = contractsData
        .slice(0, 2)
        .map(c => ({
          id: `contract-${c.id}`,
          text: `Contract created: "${c.title}"`,
          time: getRelativeTime(c.created_at),
          icon: <Icons.Wallet />,
          color: '#10b981',
          timestamp: new Date(c.created_at),
        }));

      // Recent projects
      const recentProjects = projectsData
        .slice(0, 2)
        .map(p => ({
          id: `project-${p.id}`,
          text: `Project "${p.title}" is ${p.status?.toLowerCase() || 'active'}`,
          time: getRelativeTime(p.created_at),
          icon: <Icons.Briefcase />,
          color: '#6366f1',
          timestamp: new Date(p.created_at),
        }));

      // Combine and sort by timestamp
      activities.push(...recentProposals, ...recentContracts, ...recentProjects);
      activities.sort((a, b) => b.timestamp - a.timestamp);

      setActivityFeed(activities.slice(0, 5));
    };

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Parallel API calls for better performance
        const [statsRes, proposalsRes, projectsRes, contractsRes] = await Promise.all([
          axiosInstance.get('/api/v1/analytics/dashboard-stats/'),
          axiosInstance.get('/api/v1/proposals/client-proposals/'),
          axiosInstance.get('/api/v1/projects/'),
          axiosInstance.get('/api/v1/contracts/'),
        ]);

        // Set stats from API
        if (statsRes.data) {
          setStats({
            totalSpent: statsRes.data.this_month_revenue || '$0',
            openJobPosts: statsRes.data.active_projects || 0,
            newProposals: statsRes.data.pending_proposals || 0,
            hiredTalent: statsRes.data.active_contracts || 0,
          });
        }

        // Set proposals
        if (proposalsRes.data) {
          setProposals(proposalsRes.data);
        }

        // Set projects
        if (projectsRes.data) {
          setProjects(projectsRes.data);
        }

        // Generate spending data from contracts
        generateSpendingHistory(contractsRes.data || []);

        // Generate activity feed from proposals and contracts
        generateActivityFeed(proposalsRes.data || [], contractsRes.data || [], projectsRes.data || []);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare deadlines from pending proposals
  const deadlines = proposals
    .filter(p => p.status === 'pending')
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      title: `Review "${p.project_title}"`,
      date: getRelativeTime(p.created_at),
      tag: 'Pending Review',
      color: '#f59e0b',
    }));

  // Prepare active jobs from projects
  const activeJobs = projects
    .filter(p => p.status === 'ACTIVE' || p.status === 'PENDING')
    .slice(0, 3)
    .map(p => {
      const projectProposals = proposals.filter(pr => pr.project_title === p.title);
      return {
        id: p.id,
        title: p.title,
        applicants: projectProposals.length,
        status: p.status === 'ACTIVE' ? 'Active' : 'Pending',
      };
    });

  const handlePostJob = () => {
    navigate('/client/projects');
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div style={{ fontSize: '18px', color: '#64748b' }}>Loading dashboard...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', flexDirection: 'column' }}>
        <div style={{ fontSize: '18px', color: '#ef4444', marginBottom: '10px' }}>Error loading dashboard</div>
        <div style={{ fontSize: '14px', color: '#64748b' }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* --- Header --- */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Client Overview</h1>
          <p style={styles.subtitle}>Manage your job postings, proposals, and hired talent.</p>
        </div>
        <button style={styles.btn} onClick={handlePostJob}> {/* 4. Add onClick */}
          <span style={{ marginRight: '8px', display: 'flex' }}><Icons.Plus /></span> Post a Job
        </button>
      </div>

      {/* --- Top Stats Row --- */}
      <div style={styles.statsGrid}>
        <StatCard 
          icon={<Icons.Wallet />} 
          title="Total Spent" 
          value={stats.totalSpent} 
          change="This month" 
          color="#3b82f6"
        />
        <StatCard 
          icon={<Icons.Briefcase />} 
          title="Open Job Posts" 
          value={stats.openJobPosts} 
          change="Active projects" 
          color="#8b5cf6"
        />
        <StatCard 
          icon={<Icons.FileText />} 
          title="Pending Proposals" 
          value={stats.newProposals} 
          change="Need review" 
          color="#10b981"
        />
        <StatCard 
          icon={<Icons.Users />} 
          title="Active Contracts" 
          value={stats.hiredTalent} 
          change="Hired talent" 
          color="#ec4899"
        />
      </div>

      {/* --- Middle Section: Chart & Deadlines --- */}
      <div style={styles.grid}>
        
        {/* Main Chart */}
        <div style={{...styles.card, flex: 2}}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Spending History</h2>
              <div style={styles.subTitle}>Payments to freelancers over last 6 months</div>
            </div>
            <select style={styles.select}><option>This Year</option></select>
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
                <YAxis axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontSize:12}} prefix="$" />
                <Tooltip 
                  contentStyle={{borderRadius:'8px', border:'none', boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}} 
                  formatter={(value) => [`$${value}`, 'Spent']}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Deadlines & Hiring Status */}
        <div style={{...styles.column, flex: 1}}>
          
          {/* Deadlines Widget */}
          <div style={{...styles.card, marginBottom: '20px'}}>
            <h2 style={styles.cardTitle}>Actions Required</h2>
            {deadlines.length > 0 ? (
              <div style={styles.list}>
                {deadlines.map(d => (
                  <div key={d.id} style={styles.deadlineItem}>
                    <div style={styles.deadlineInfo}>
                      <span style={{color: d.color, marginRight:'10px', display:'flex'}}><Icons.Clock /></span>
                      <div>
                        <div style={styles.itemTitle}>{d.title}</div>
                        <div style={styles.itemSub}>{d.date}</div>
                      </div>
                    </div>
                    <span style={{...styles.tag, color: d.color, backgroundColor: `${d.color}20`}}>
                      {d.tag}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                No pending actions
              </div>
            )}
          </div>

          {/* Job Postings Status */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Job Postings</h2>
            {activeJobs.length > 0 ? (
              <div style={styles.list}>
                {activeJobs.map(job => (
                  <div key={job.id} style={{marginBottom: '15px'}}>
                     <div style={styles.flexBetween}>
                        <span style={styles.itemTitle}>{job.title}</span>
                        <span style={{...styles.itemSub, fontWeight: '600', color: '#3b82f6'}}>
                          {job.status}
                        </span>
                     </div>
                     <div style={styles.itemSub}>
                       {job.applicants} Proposal{job.applicants !== 1 ? 's' : ''}
                     </div>
                     <div style={styles.progressBarBg}>
                        <div style={{
                          ...styles.progressBarFill, 
                          width: job.status === 'Active' ? '70%' : job.status === 'Pending' ? '40%' : '10%',
                          backgroundColor: job.status === 'Draft' ? '#94a3b8' : '#3b82f6'
                        }}></div>
                     </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                No active job postings
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- Bottom Section: Recent Activity --- */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Recent Activity</h2>
        {activityFeed.length > 0 ? (
          <div style={styles.activityList}>
            {activityFeed.map((item, index) => (
              <div key={item.id} style={styles.activityItem}>
                <div style={{...styles.activityIcon, backgroundColor: `${item.color}20`, color: item.color}}>
                  {item.icon}
                </div>
                <div style={styles.activityContent}>
                  <div style={styles.activityText}>{item.text}</div>
                  <div style={styles.activityTime}>{item.time}</div>
                </div>
                {/* Connector Line */}
                {index !== activityFeed.length - 1 && <div style={styles.connectorLine}></div>}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
            No recent activity
          </div>
        )}
      </div>

    </div>
  );
};

// --- Helper Component: Stat Card ---
const StatCard = ({ icon, title, value, change, color }) => (
  <div style={styles.statCard}>
    <div style={styles.statHeader}>
      <div style={{...styles.statIcon, backgroundColor: `${color}20`, color: color}}>
        {icon}
      </div>
      <span style={{...styles.statChange, color: '#64748b'}}>
        {change}
      </span>
    </div>
    <div style={styles.statValue}>{value}</div>
    <div style={styles.statTitle}>{title}</div>
  </div>
);

// --- STYLES ---
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
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
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
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
    color: '#1e293b',
  },
  statTitle: {
    fontSize: '13px',
    color: '#64748b',
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
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
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
    color: '#334155',
    margin: 0,
  },
  subTitle: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '4px',
  },
  select: {
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '6px 10px',
    fontSize: '12px',
    color: '#475569',
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
    borderBottom: '1px solid #f8fafc',
  },
  deadlineInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
  },
  itemSub: {
    fontSize: '12px',
    color: '#94a3b8',
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
    backgroundColor: '#f1f5f9',
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
    color: '#334155',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  connectorLine: {
    position: 'absolute',
    left: '17px',
    top: '36px',
    bottom: '-25px',
    width: '2px',
    backgroundColor: '#f1f5f9',
    zIndex: 1,
  }
};

export default ClientDashboard;





