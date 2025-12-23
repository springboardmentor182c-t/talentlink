import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ClientPending() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const checkProfile = async () => {
      try {
        // Will attach token via api interceptor
        await api.get('/profile/me/');
        // If profile exists, navigate to client profile view
            if (mounted) {
              navigate('/client/profile');
        }
      } catch (err) {
        const status = err?.response?.status;
        if (status === 404) {
          // No profile yet — stay on this page so user can create one
          if (mounted) setLoading(false);
        } else {
          if (mounted) {
            setError('Unable to check profile status');
            setLoading(false);
          }
        }
      }
    };

    checkProfile();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Checking profile status…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white border rounded-2xl p-10 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Complete Your Client Profile</h1>
        <p className="text-gray-700 mb-6">
          Thanks for signing up as a client. To post projects and work with freelancers, please complete your client profile.
          This helps freelancers understand your needs and speeds up hiring.
        </p>

        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}

        <div className="flex items-center justify-center gap-4">
          <button
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
            onClick={() => navigate('/client/profile/create')}
          >
            Complete Profile
          </button>

          <button
            className="px-6 py-3 rounded-xl border border-gray-200"
            onClick={() => navigate('/client')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
