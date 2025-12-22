import { API_BASE_URL, getAuthHeaders, handleResponse } from './api.js';

const DEMO_FREELANCER_DATA = {
  dashboard: {
    stats: {
      totalEarnings: 2450,
      activeProjects: 3,
      completedProjects: 28,
      proposalsSent: 15,
      clientRating: 4.9,
      totalHours: 156,
      pendingPayments: 850,
      upcomingDeadlines: 2
    },
    recentProjects: [
      {
        id: 1,
        title: "React Dashboard Development",
        client: "Tech Corp",
        status: "in_progress",
        budget: "$1,200",
        deadline: "2024-01-15",
        progress: 75
      },
      {
        id: 2,
        title: "Mobile App UI Design",
        client: "StartupXYZ",
        status: "completed",
        budget: "$800",
        deadline: "2024-01-10",
        progress: 100
      },
      {
        id: 3,
        title: "API Integration Project",
        client: "DevStudio",
        status: "pending",
        budget: "$1,500",
        deadline: "2024-01-20",
        progress: 25
      }
    ],
    recentActivities: [
      {
        id: 1,
        type: "project_completed",
        title: "Project completed successfully",
        description: "React Dashboard Development finished and approved by client",
        timestamp: "2 hours ago",
        icon: "CheckCircle",
        color: "text-green-600"
      },
      {
        id: 2,
        type: "payment_received",
        title: "Payment received",
        description: "$1,200 for Mobile App UI Design project",
        timestamp: "1 day ago",
        icon: "DollarSign",
        color: "text-blue-600"
      },
      {
        id: 3,
        type: "new_proposal",
        title: "New proposal submitted",
        description: "Submitted proposal for API Integration Project",
        timestamp: "2 days ago",
        icon: "FileText",
        color: "text-purple-600"
      }
    ],
    earningsData: [
      { month: "Jan", earnings: 1200 },
      { month: "Feb", earnings: 1800 },
      { month: "Mar", earnings: 2200 },
      { month: "Apr", earnings: 1900 },
      { month: "May", earnings: 2400 },
      { month: "Jun", earnings: 2100 }
    ]
  }
};

const DEMO_FREELANCER_PROFILE = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "freelancer",
  profile: {
    title: "Full Stack Developer",
    description: "Experienced full-stack developer with expertise in React, Node.js, and MongoDB.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript", "TypeScript", "Python"],
    experience: "5+ years",
    hourlyRate: 45,
    availability: "Available",
    location: "San Francisco, CA",
    languages: ["English", "Spanish"],
    education: "Bachelor's in Computer Science",
    certifications: ["AWS Certified Developer", "React Developer Certified"]
  },
  stats: {
    totalProjects: 45,
    completedProjects: 38,
    clientRating: 4.9,
    totalEarnings: 85000,
    responseTime: "2 hours",
    onTimeDelivery: 98
  },
  portfolio: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://example.com/project1"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      link: "https://example.com/project2"
    }
  ]
};

const DEMO_FREELANCER_JOBS = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description: "Build a modern e-commerce platform with React and Node.js including payment integration and admin dashboard.",
    status: "active",
    budget: 5000,
    deadline: "Dec 25, 2024",
    hoursLogged: 45,
    milestoneProgress: 65,
    clientName: "TechCorp Solutions",
    clientRating: 4.8
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    description: "Design user interface and experience for a fitness tracking mobile application.",
    status: "in_progress",
    budget: 2500,
    deadline: "Jan 15, 2025",
    hoursLogged: 28,
    milestoneProgress: 45,
    clientName: "FitLife Inc.",
    clientRating: 4.9
  },
  {
    id: 3,
    title: "API Integration Project",
    description: "Integrate third-party payment APIs and social media APIs into existing web application.",
    status: "completed",
    budget: 1800,
    deadline: "Nov 30, 2024",
    hoursLogged: 32,
    milestoneProgress: 100,
    clientName: "StartupXYZ",
    clientRating: 5.0
  },
  {
    id: 4,
    title: "Database Optimization",
    description: "Optimize database queries and improve application performance.",
    status: "pending",
    budget: 1200,
    deadline: "Jan 5, 2025",
    hoursLogged: 0,
    milestoneProgress: 0,
    clientName: "DataFlow Systems",
    clientRating: 4.7
  }
];

const DEMO_FREELANCER_PROPOSALS = [
  {
    id: 1,
    jobTitle: "React Native Mobile App Development",
    clientName: "MobileFirst Solutions",
    status: "pending",
    submittedDate: "Dec 10, 2024",
    bidAmount: 3500,
    estimatedDuration: "4 weeks",
    coverLetter: "I have extensive experience in React Native development and have successfully delivered similar projects. My approach includes thorough testing and clean code practices.",
    attachments: 3,
    clientMessage: null
  },
  {
    id: 2,
    jobTitle: "WordPress Website Redesign",
    clientName: "Creative Agency",
    status: "accepted",
    submittedDate: "Dec 8, 2024",
    bidAmount: 1800,
    estimatedDuration: "2 weeks",
    coverLetter: "I can redesign your WordPress website with modern UI/UX principles and optimize it for performance and SEO.",
    attachments: 2,
    clientMessage: "Great proposal! Let's discuss the project timeline and get started."
  },
  {
    id: 3,
    jobTitle: "Python Data Analysis Script",
    clientName: "Analytics Pro",
    status: "rejected",
    submittedDate: "Dec 5, 2024",
    bidAmount: 800,
    estimatedDuration: "1 week",
    coverLetter: "I can create a comprehensive data analysis script using Python with pandas, numpy, and matplotlib for visualization.",
    attachments: 1,
    clientMessage: null
  },
  {
    id: 4,
    jobTitle: "Vue.js Frontend Development",
    clientName: "Tech Innovations",
    status: "submitted",
    submittedDate: "Dec 12, 2024",
    bidAmount: 2200,
    estimatedDuration: "3 weeks",
    coverLetter: "Experienced Vue.js developer ready to build responsive and performant frontend applications with modern best practices.",
    attachments: 4,
    clientMessage: null
  }
];

const DEMO_FREELANCER_CONTRACTS = [
  {
    id: 1,
    title: "Full-Stack Web Application Development",
    clientName: "Enterprise Solutions Ltd.",
    status: "active",
    startDate: "Nov 1, 2024",
    endDate: "Jan 31, 2025",
    totalValue: 15000,
    paidAmount: 9000,
    milestoneProgress: 60,
    description: "Develop a comprehensive full-stack web application with user authentication, database integration, and admin dashboard.",
    clientMessage: null
  },
  {
    id: 2,
    title: "UI/UX Design for Mobile App",
    clientName: "Design Studio Pro",
    status: "active",
    startDate: "Dec 1, 2024",
    endDate: "Feb 15, 2025",
    totalValue: 4500,
    paidAmount: 2250,
    milestoneProgress: 50,
    description: "Create complete UI/UX design for a mobile application including wireframes, mockups, and interactive prototypes.",
    clientMessage: null
  },
  {
    id: 3,
    title: "API Development and Integration",
    clientName: "Tech Innovations Inc.",
    status: "completed",
    startDate: "Oct 15, 2024",
    endDate: "Nov 30, 2024",
    totalValue: 8000,
    paidAmount: 8000,
    milestoneProgress: 100,
    description: "Develop and integrate RESTful APIs for e-commerce platform including payment processing and inventory management.",
    clientMessage: "Excellent work! Looking forward to working with you again."
  },
  {
    id: 4,
    title: "Database Migration Project",
    clientName: "Data Systems Corp.",
    status: "disputed",
    startDate: "Sep 1, 2024",
    endDate: "Oct 15, 2024",
    totalValue: 6000,
    paidAmount: 3000,
    milestoneProgress: 75,
    description: "Migrate legacy database to modern cloud-based solution with data validation and performance optimization.",
    clientMessage: null
  }
];

export const freelancerService = {
  // Dashboard Data
  getDashboardData: async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Demo mode check
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Returning demo dashboard data');
        return DEMO_FREELANCER_DATA.dashboard;
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/dashboard/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching freelancer dashboard data:', error);
      throw error;
    }
  },

  // Profile Data
  getProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Returning demo profile data');
        return DEMO_FREELANCER_PROFILE;
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/profile/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching freelancer profile:', error);
      throw error;
    }
  },

  // Update Profile
  updateProfile: async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Demo profile update');
        return { success: true, message: "Profile updated successfully" };
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/profile/update/`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error updating freelancer profile:', error);
      throw error;
    }
  },

  // Get Available Projects
  getAvailableProjects: async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Returning demo available projects');
        return [
          {
            id: 1,
            title: "React Frontend Developer (Dashboard UI)",
            summary: "Build a responsive dashboard for project and client management using React.",
            description: "Looking for a frontend developer to create a clean dashboard interface with reusable components, responsive layout, and integration-ready UI elements.",
            duration: "1-3 months",
            budget: "$40,000 – $60,000",
            skills: ["React", "JavaScript", "CSS", "Responsive UI"],
            tags: ["React", "JavaScript", "CSS", "Responsive UI"],
            client: "Tech Corp",
            posted: "2 days ago",
            proposals: 15
          },
          {
            id: 2,
            title: "Full Stack MERN Developer",
            summary: "Create a MERN stack project with REST APIs and admin dashboard.",
            description: "Need a MERN developer to build secure APIs, authentication module, and an admin panel. Experience with MongoDB schema design and deployment is preferred.",
            duration: "1-3 months",
            budget: "$70,000 – $100,000",
            skills: ["React", "Node.js", "MongoDB", "Express"],
            tags: ["Node.js", "React", "MongoDB", "Express"],
            client: "StartupXYZ",
            posted: "1 day ago",
            proposals: 8
          }
        ];
      }

      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE_URL}/freelancer/projects/available/?${queryString}`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching available projects:', error);
      throw error;
    }
  },

  // Submit Proposal
  submitProposal: async (projectId, proposalData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Demo proposal submission');
        return { 
          success: true, 
          message: "Proposal submitted successfully",
          proposalId: Math.floor(Math.random() * 1000)
        };
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/projects/${projectId}/proposals/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(proposalData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      throw error;
    }
  },

  // Get My Proposals
  getMyProposals: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Returning demo proposals');
        return DEMO_FREELANCER_PROPOSALS;
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/proposals/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      throw error;
    }
  },

  // Get My Jobs
  getMyJobs: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Returning demo jobs');
        return DEMO_FREELANCER_JOBS;
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/jobs/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Time Tracking
  getTimeEntries: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Returning demo time entries');
        return [
          {
            id: 1,
            projectTitle: "React Dashboard Development",
            date: "2024-01-10",
            hours: 6.5,
            description: "Implemented user authentication and dashboard components",
            hourlyRate: 45,
            earnings: 292.50
          },
          {
            id: 2,
            projectTitle: "Mobile App UI Design",
            date: "2024-01-09",
            hours: 4.0,
            description: "Designed mobile app wireframes and user flows",
            hourlyRate: 50,
            earnings: 200.00
          }
        ];
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/time-entries/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching time entries:', error);
      throw error;
    }
  },

  // Add Time Entry
  addTimeEntry: async (timeEntryData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Demo time entry added');
        return { 
          success: true, 
          message: "Time entry added successfully",
          entryId: Math.floor(Math.random() * 1000)
        };
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/time-entries/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(timeEntryData)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error adding time entry:', error);
      throw error;
    }
  },

  // Get My Contracts
  getMyContracts: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token && token.includes('demo-freelancer-token')) {
        console.log('FreelancerService: Returning demo contracts');
        return DEMO_FREELANCER_CONTRACTS;
      }

      const response = await fetch(`${API_BASE_URL}/freelancer/contracts/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching contracts:', error);
      throw error;
    }
  }
};