import React, { useState, useEffect, useRef } from "react";
import ProfileMenu from "../components/ProfileMenu.jsx";
import profileService from '../services/profileService.js';
import { useNavigate } from "react-router-dom";
import FreelancerDashboardContent from "../components/Dashboard/FreelancerDashboardContent.jsx";

const FreelancerDashboard = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!profileMenuOpen) return;
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, [profileMenuOpen]);

  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        const data = await profileService.freelancer.getProfile();
        setProfile(data);
      } catch (err) {
        setProfile(null);
        console.error('Failed to load freelancer profile:', err);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FreelanceHub</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {/* Navigation links can be added here if needed */}
            </nav>


          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <FreelancerDashboardContent profile={profile} />
      </div>
    </div>
  );
};

export default FreelancerDashboard;