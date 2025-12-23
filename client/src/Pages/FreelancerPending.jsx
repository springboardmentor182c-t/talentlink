import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FreelancerPending() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border rounded-2xl p-10 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Account Pending</h1>
        <p className="text-gray-700 mb-6">
          Thanks for signing up as a freelancer. Your account is currently pending verification.
          You will receive an email when your account is approved. Meanwhile, you can complete your profile
          to speed up approval.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
            onClick={() => navigate('/freelancer/profile/create')}
          >
            Complete Profile
          </button>

          <button
            className="px-6 py-3 rounded-xl border border-gray-200"
            onClick={() => navigate('/freelancer', { replace: true })}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
