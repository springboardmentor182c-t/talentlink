import api from './api.js';
import { freelancerAPI } from './api.js';

const FREELANCER_ENDPOINTS = {
  DASHBOARD: '/freelancer/dashboard',
  PROFILE: '/freelancer/profile',
  PROPOSALS: '/freelancer/proposals',
  CONTRACTS: '/freelancer/contracts',
  EARNINGS: '/freelancer/earnings',
  ANALYTICS: '/freelancer/analytics',
  REVIEWS: '/freelancer/reviews',
  PROJECTS: '/freelancer/projects',
  SKILLS: '/freelancer/skills',
  PORTFOLIO: '/freelancer/portfolio',
  MESSAGES: '/freelancer/messages',
  NOTIFICATIONS: '/freelancer/notifications'
};

// Configuration to switch between mock and real API
const USE_MOCK_DATA = false; // Set to false to use real API calls

// Mock data functions
const mockDashboardData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    data: {
      stats: {
        totalEarnings: 125000,
        activeContracts: 3,
        completedProjects: 24,
        averageRating: 4.8,
        proposalsSubmitted: 15,
        profileViews: 234
      },
      recentProjects: [
        {
          id: 1,
          title: "React Dashboard Development",
          client: "Tech Corp",
          budget: 50000,
          deadline: "2024-01-15",
          status: "in_progress"
        },
        {
          id: 2,
          title: "Mobile App UI Design",
          client: "StartupXYZ",
          budget: 30000,
          deadline: "2024-01-20",
          status: "completed"
        }
      ],
      earningsData: [
        { month: 'Aug', earnings: 25000 },
        { month: 'Sep', earnings: 32000 },
        { month: 'Oct', earnings: 28000 },
        { month: 'Nov', earnings: 35000 },
        { month: 'Dec', earnings: 28000 }
      ],
      skillsAnalytics: {
        'React': 35,
        'Node.js': 25,
        'UI/UX': 20,
        'Python': 20
      },
      upcomingDeadlines: [
        {
          id: 1,
          project: "E-commerce Website",
          deadline: "2024-01-10",
          daysLeft: 3
        },
        {
          id: 2,
          project: "API Integration",
          deadline: "2024-01-12",
          daysLeft: 5
        }
      ]
    }
  };
};

const mockMyProposalsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 900));
  return [
    {
      id: 1,
      jobTitle: "React Dashboard Development",
      clientName: "Tech Corp",
      bidAmount: 45000,
      status: "pending",
      submittedDate: "2 days ago",
      coverLetter: "I have extensive experience in React development and can deliver a high-quality dashboard with advanced data visualization features. My approach includes using modern React patterns, TypeScript for type safety, and implementing responsive design principles.",
      estimatedDuration: "3 weeks",
      attachments: 2,
      clientMessage: null
    },
    {
      id: 2,
      jobTitle: "Mobile App UI Design",
      clientName: "StartupXYZ",
      bidAmount: 28000,
      status: "accepted",
      submittedDate: "1 week ago",
      coverLetter: "I can create a modern and user-friendly design for your mobile app. I specialize in mobile-first design principles and have experience with both iOS and Android platforms.",
      estimatedDuration: "2 weeks",
      attachments: 3,
      clientMessage: "Great proposal! Let's discuss the project details in our next meeting."
    },
    {
      id: 3,
      jobTitle: "API Integration Project",
      clientName: "Dev Agency",
      bidAmount: 35000,
      status: "rejected",
      submittedDate: "5 days ago",
      coverLetter: "I have strong experience with API integrations and can help you connect your systems efficiently. I'm proficient in RESTful APIs, GraphQL, and various authentication methods.",
      estimatedDuration: "1 week",
      attachments: 1,
      clientMessage: null
    },
    {
      id: 4,
      jobTitle: "E-commerce Website",
      clientName: "Retail Business",
      bidAmount: 65000,
      status: "submitted",
      submittedDate: "1 day ago",
      coverLetter: "I can build a complete e-commerce solution with modern technologies including React, Node.js, and MongoDB. The solution will include payment integration, inventory management, and admin dashboard.",
      estimatedDuration: "4 weeks",
      attachments: 4,
      clientMessage: null
    }
  ];
};

const mockMyContractsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return [
    {
      id: 1,
      title: "React Dashboard Development",
      clientName: "Tech Corp",
      totalValue: 50000,
      paidAmount: 15000,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      description: "Development of a comprehensive React-based dashboard for data visualization and analytics.",
      milestoneProgress: 30,
      created_at: "2024-01-01T00:00:00Z"
    },
    {
      id: 2,
      title: "API Integration Project",
      clientName: "StartupXYZ",
      totalValue: 25000,
      paidAmount: 25000,
      status: "completed",
      startDate: "2023-12-15",
      endDate: "2023-12-30",
      description: "Integration of third-party APIs for payment processing and data synchronization.",
      milestoneProgress: 100,
      created_at: "2023-12-15T00:00:00Z"
    },
    {
      id: 3,
      title: "Mobile App UI Design",
      clientName: "Design Studio",
      totalValue: 15000,
      paidAmount: 5000,
      status: "pending",
      startDate: "2024-01-20",
      endDate: "2024-02-15",
      description: "UI/UX design for a mobile application with modern and intuitive interface.",
      milestoneProgress: 0,
      created_at: "2024-01-10T00:00:00Z"
    },
    {
      id: 4,
      title: "E-commerce Platform",
      clientName: "Retail Corp",
      totalValue: 75000,
      paidAmount: 25000,
      status: "disputed",
      startDate: "2023-11-01",
      endDate: "2024-01-01",
      description: "Full-stack e-commerce platform development with payment integration.",
      milestoneProgress: 45,
      created_at: "2023-11-01T00:00:00Z"
    }
  ];
};

const mockMyJobsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 700));
  return [
    {
      id: 1,
      title: "React Dashboard Development",
      description: "Building a comprehensive analytics dashboard with React, TypeScript, and modern data visualization libraries.",
      status: "in_progress",
      budget: 50000,
      deadline: "Jan 31, 2024",
      hoursLogged: 45,
      milestoneProgress: 60,
      earnings: 30000,
      clientName: "Tech Corp"
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      description: "Creating modern and intuitive UI/UX design for a fitness tracking mobile application.",
      status: "active",
      budget: 25000,
      deadline: "Jan 25, 2024",
      hoursLogged: 20,
      milestoneProgress: 40,
      earnings: 10000,
      clientName: "StartupXYZ"
    },
    {
      id: 3,
      title: "API Integration Project",
      description: "Integrating third-party payment and data APIs into existing web application.",
      status: "pending",
      budget: 15000,
      deadline: "Feb 05, 2024",
      hoursLogged: 0,
      milestoneProgress: 0,
      earnings: 0,
      clientName: "Dev Agency"
    },
    {
      id: 4,
      title: "E-commerce Website",
      description: "Complete e-commerce platform development with shopping cart, payment processing, and admin panel.",
      status: "completed",
      budget: 80000,
      deadline: "Dec 15, 2023",
      hoursLogged: 120,
      milestoneProgress: 100,
      earnings: 80000,
      clientName: "Retail Business"
    }
  ];
};

// Main freelancer service
export const freelancerService = {
  // Dashboard API calls
  async getDashboardData() {
    try {
      if (USE_MOCK_DATA) {
        return await mockDashboardData();
      }
      
      // Real API call
          const apiResponse = await freelancerAPI.getDashboardData();
          
          // Transform API response to match expected format
          return {
            success: true,
            data: {
              stats: {
                totalEarnings: apiResponse.stats.totalEarnings || 0,
                activeContracts: apiResponse.stats.activeContracts || 0,
                completedProjects: apiResponse.stats.completedContracts || 0,
                averageRating: 4.5, // Default rating since API doesn't provide it
                proposalsSubmitted: apiResponse.stats.totalProposals || 0,
                profileViews: 0, // Not available in current API
                name: apiResponse.profile?.title || 'Freelancer'
              },
              recentProjects: apiResponse.recentContracts?.map(contract => ({
                id: contract.id,
                title: contract.title,
                client: 'Client', // Not available in current API
                budget: contract.total_amount,
                deadline: contract.created_at,
                status: contract.status
              })) || [],
              earningsData: apiResponse.monthlyEarnings?.map(earning => ({
                month: earning.month,
                earnings: earning.total
              })) || [],
              skillsAnalytics: apiResponse.profile?.skills ? 
                apiResponse.profile.skills.split(',').reduce((acc, skill, index) => {
                  acc[skill.trim()] = Math.floor(100 / (index + 1));
                  return acc;
                }, {}) : {},
              upcomingDeadlines: [] // Not available in current API
            }
          };
    } catch (error) {
      console.error('Error fetching freelancer dashboard:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch dashboard data'
      };
    }
  },

  // Profile API calls
  async getProfile() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          success: true,
          data: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            title: "Full Stack Developer",
            bio: "Experienced developer with 5+ years in React and Node.js",
            hourlyRate: 2500,
            location: "Mumbai, India",
            skills: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"],
            experience: "5+ years",
            rating: 4.8,
            totalProjects: 24,
            languages: ["English", "Hindi"],
            availability: "Available",
            portfolioItems: [
              {
                id: 1,
                title: "E-commerce Platform",
                description: "Full-stack e-commerce solution",
                imageUrl: "/api/placeholder/300/200",
                link: "https://example.com"
              }
            ]
          }
        };
      }
      
      // Real API call
      return await freelancerAPI.getProfile();
    } catch (error) {
      console.error('Error fetching freelancer profile:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch profile data'
      };
    }
  },

  async updateProfile(profileData) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return {
          success: true,
          message: "Profile updated successfully",
          data: profileData
        };
      }
      
      // Real API call
      return await freelancerAPI.updateProfile(profileData);
    } catch (error) {
      console.error('Error updating freelancer profile:', error);
      return {
        success: false,
        error: error.message || 'Failed to update profile'
      };
    }
  },

  // Proposals API calls
  async getProposals() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 900));
        return {
          success: true,
          data: [
            {
              id: 1,
              projectTitle: "React Dashboard Development",
              client: "Tech Corp",
              budget: 50000,
              proposedRate: 45000,
              status: "pending",
              submittedDate: "2024-01-01",
              coverLetter: "I have extensive experience in React development..."
            },
            {
              id: 2,
              projectTitle: "Mobile App UI Design",
              client: "StartupXYZ",
              budget: 30000,
              proposedRate: 28000,
              status: "accepted",
              submittedDate: "2023-12-28",
              coverLetter: "I can create a modern and user-friendly design..."
            }
          ]
        };
      }
      
      // Real API call
      return await freelancerAPI.getProposals();
    } catch (error) {
      console.error('Error fetching proposals:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch proposals'
      };
    }
  },

  async getMyProposals() {
    try {
      if (USE_MOCK_DATA) {
        return await mockMyProposalsData();
      }
      
      // Real API call
      const response = await freelancerAPI.getProposals();
      
      // Handle different response formats
      let proposals = [];
      if (Array.isArray(response)) {
        proposals = response;
      } else if (response && response.data) {
        proposals = response.data;
      }
      
      // Transform API format to match frontend expectations
      return proposals.map(proposal => ({
        id: proposal.id,
        jobTitle: proposal.title || `Project ${proposal.project_id}`, // Use project_id as fallback title
        clientName: proposal.client_name || `Client ${proposal.client}`, // Map client field
        bidAmount: proposal.bid_amount || 0, // Map backend bid_amount to frontend bidAmount
        status: proposal.status,
        submittedDate: proposal.created_at,
        coverLetter: proposal.cover_letter || '',
        completionTime: proposal.completion_time || 'Not specified',
        estimatedDuration: proposal.completion_time || 'Not specified',
        attachments: proposal.attachments || 0
      }));
    } catch (error) {
      console.error('Error fetching my proposals:', error);
      throw new Error(error.message || 'Failed to fetch my proposals');
    }
  },

  async submitProposal(proposalData) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return {
          success: true,
          message: "Proposal submitted successfully",
          data: {
            id: Date.now(),
            ...proposalData,
            status: "pending",
            submittedDate: new Date().toISOString()
          }
        };
      }
      
      // Real API call
      return await freelancerAPI.createProposal(proposalData);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit proposal'
      };
    }
  },

  // Contracts API calls
  async getContracts() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          success: true,
          data: [
            {
              id: 1,
              title: "React Dashboard Development",
              client: "Tech Corp",
              budget: 50000,
              status: "active",
              startDate: "2024-01-01",
              endDate: "2024-01-31",
              milestones: [
                { id: 1, title: "Design Phase", completed: true, amount: 15000 },
                { id: 2, title: "Development Phase", completed: false, amount: 25000 },
                { id: 3, title: "Testing Phase", completed: false, amount: 10000 }
              ]
            },
            {
              id: 2,
              title: "API Integration",
              client: "StartupXYZ",
              budget: 25000,
              status: "completed",
              startDate: "2023-12-15",
              endDate: "2023-12-30",
              milestones: [
                { id: 1, title: "Integration", completed: true, amount: 15000 },
                { id: 2, title: "Testing", completed: true, amount: 10000 }
              ]
            }
          ]
        };
      }
      
      // Real API call
      return await freelancerAPI.getContracts();
    } catch (error) {
      console.error('Error fetching contracts:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch contracts'
      };
    }
  },

  async getMyContracts() {
    try {
      if (USE_MOCK_DATA) {
        return await mockMyContractsData();
      }
      
      // Real API call
      const response = await freelancerAPI.getContracts(null, 'freelancer');
      console.log('Contracts API response:', response); // Debug log
      
      // Handle different response formats
      let contracts = [];
      if (Array.isArray(response)) {
        contracts = response;
      } else if (response && response.data) {
        contracts = response.data;
      } else if (response && response.results) {
        contracts = response.results;
      } else if (response) {
        contracts = response;
      }
      
      console.log('Processed contracts array:', contracts); // Debug log
      
      // Ensure contracts is an array before mapping
      if (!Array.isArray(contracts)) {
        console.error('Contracts is not an array:', contracts);
        return [];
      }
      
      // Transform API contract format to match frontend expectations
      return contracts.map(contract => ({
        id: contract.id,
        title: contract.title,
        clientName: contract.client_name || contract.clientName || 'Client',
        totalValue: contract.total_amount || contract.totalValue || 0,
        paidAmount: contract.amount_paid || contract.paidAmount || 0,
        status: contract.status,
        startDate: contract.start_date || contract.startDate,
        endDate: contract.end_date || contract.endDate,
        description: contract.description || '',
        milestoneProgress: contract.progress_percentage || 0,
        created_at: contract.created_at,
        // Add any other fields that the frontend expects
        budget: contract.total_amount || 0 // Map total_amount to budget for compatibility
      }));
    } catch (error) {
      console.error('Error fetching my contracts:', error);
      throw new Error(error.message || 'Failed to fetch my contracts');
    }
  },

  // Earnings API calls
  async getEarnings() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          success: true,
          data: {
            totalEarnings: 125000,
            thisMonth: 28000,
            lastMonth: 35000,
            monthlyBreakdown: [
              { month: 'Aug', earnings: 25000 },
              { month: 'Sep', earnings: 32000 },
              { month: 'Oct', earnings: 28000 },
              { month: 'Nov', earnings: 35000 },
              { month: 'Dec', earnings: 28000 }
            ],
            pendingPayments: 15000,
            availableForWithdrawal: 8000
          }
        };
      }
      
      // Real API call
      return await freelancerAPI.getEarnings();
    } catch (error) {
      console.error('Error fetching earnings:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch earnings data'
      };
    }
  },

  // Analytics API calls
  async getAnalytics() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return {
          success: true,
          data: {
            profileViews: {
              total: 234,
              thisMonth: 45,
              lastMonth: 38
            },
            proposalStats: {
              submitted: 15,
              accepted: 8,
              rejected: 4,
              pending: 3,
              successRate: 53.3
            },
            clientRatings: {
              average: 4.8,
              totalReviews: 24,
              fiveStar: 18,
              fourStar: 5,
              threeStar: 1,
              twoStar: 0,
              oneStar: 0
            },
            skillsPerformance: [
              { skill: 'React', projects: 12, rating: 4.9, earnings: 65000 },
              { skill: 'Node.js', projects: 8, rating: 4.7, earnings: 45000 },
              { skill: 'UI/UX', projects: 6, rating: 4.8, earnings: 30000 },
              { skill: 'Python', projects: 6, rating: 4.6, earnings: 28000 }
            ]
          }
        };
      }
      
      // Real API call
      return await freelancerAPI.getAnalytics();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch analytics data'
      };
    }
  },

  // Skills API calls
  async getSkills() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return {
          success: true,
          data: {
            technicalSkills: [
              { name: 'React', level: 'Expert', years: 4, certified: true },
              { name: 'Node.js', level: 'Expert', years: 3, certified: false },
              { name: 'JavaScript', level: 'Expert', years: 5, certified: true },
              { name: 'MongoDB', level: 'Intermediate', years: 2, certified: false }
            ],
            softSkills: [
              'Problem Solving',
              'Communication',
              'Team Leadership',
              'Project Management'
            ],
            languages: [
              { language: 'English', proficiency: 'Native' },
              { language: 'Hindi', proficiency: 'Fluent' }
            ]
          }
        };
      }
      
      // Real API call
      return await freelancerAPI.getSkills();
    } catch (error) {
      console.error('Error fetching skills:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch skills data'
      };
    }
  },

  async getMyJobs() {
    try {
      if (USE_MOCK_DATA) {
        return await mockMyJobsData();
      }
      
      // Real API call
      const response = await freelancerAPI.getJobs();
      
      // Handle different response formats
      let jobs = [];
      if (Array.isArray(response)) {
        jobs = response;
      } else if (response && response.data) {
        jobs = response.data;
      }
      
      return jobs;
    } catch (error) {
      console.error('Error fetching my jobs:', error);
      throw new Error(error.message || 'Failed to fetch my jobs');
    }
  },

  // Portfolio API calls
  async getPortfolio() {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          success: true,
          data: {
            items: [
              {
                id: 1,
                title: "E-commerce Platform",
                description: "Full-stack e-commerce solution with React and Node.js",
                imageUrl: "/api/placeholder/400/300",
                projectUrl: "https://example-ecommerce.com",
                technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                completionDate: "2023-11-15",
                clientRating: 5.0
              },
              {
                id: 2,
                title: "Task Management App",
                description: "Collaborative task management application",
                imageUrl: "/api/placeholder/400/300",
                projectUrl: "https://example-tasks.com",
                technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
                completionDate: "2023-09-20",
                clientRating: 4.8
              }
            ]
          }
        };
      }
      
      // Real API call
      return await freelancerAPI.getPortfolio();
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch portfolio data'
      };
    }
  },

  // Additional API methods for job management
  async updateJobStatus(jobId, status) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return {
          success: true,
          message: "Job status updated successfully"
        };
      }
      
      // Real API call
      return await freelancerAPI.updateJobStatus(jobId, status);
    } catch (error) {
      console.error('Error updating job status:', error);
      return {
        success: false,
        error: error.message || 'Failed to update job status'
      };
    }
  },

  async submitWork(jobId, workData) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          success: true,
          message: "Work submitted successfully"
        };
      }
      
      // Real API call
      return await freelancerAPI.submitWork(jobId, workData);
    } catch (error) {
      console.error('Error submitting work:', error);
      return {
        success: false,
        error: error.message || 'Failed to submit work'
      };
    }
  },

  async requestPayment(jobId) {
    try {
      if (USE_MOCK_DATA) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          success: true,
          message: "Payment request submitted successfully"
        };
      }
      
      // Real API call
      return await freelancerAPI.requestPayment(jobId);
    } catch (error) {
      console.error('Error requesting payment:', error);
      return {
        success: false,
        error: error.message || 'Failed to request payment'
      };
    }
  }
};

export default freelancerService;