import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data - in real app, this would come from API
  const mockUsers = {
    freelancer: {
      id: 2,
      name: 'John Doe',
      email: 'freelancer@test.com',
      role: 'freelancer',
      avatar: null,
      profileComplete: false,
      skills: ['React', 'JavaScript', 'Node.js'],
      rating: 4.8,
      totalEarnings: 125000,
      activeContracts: 3,
      completedProjects: 24
    },
    client: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'client',
      avatar: null,
      company: 'Tech Solutions Inc.',
      totalSpent: 85000,
      activeProjects: 5,
      completedProjects: 18
    }
  };

  // Simulate API login
  const login = async (email, password, role = 'freelancer') => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would validate credentials
      if (email && password) {
        const userData = mockUsers[role];
        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          // Store auth token for API calls
          localStorage.setItem('authToken', 'mock-token-for-development');
          return { success: true };
        }
      }
      
      throw new Error('Invalid credentials');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Simulate API logout
  const logout = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Get user role
  const getUserRole = () => {
    return user?.role || null;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          // Restore auth token if not present
          if (!localStorage.getItem('authToken')) {
            localStorage.setItem('authToken', 'mock-token-for-development');
          }
        }
      } catch (err) {
        console.error('Error loading user from storage:', err);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    getUserRole,
    hasRole,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};