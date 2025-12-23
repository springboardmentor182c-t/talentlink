import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  // Debug: show role detected on login
  const [debugRole, setDebugRole] = useState('');
  // Debug helpers: show last request payload and last response
  const [lastRequest, setLastRequest] = useState(null);
  const [lastResponse, setLastResponse] = useState(null);

  const navigate = useNavigate();

  // ✅ REAL LOGIN (CONNECTED TO BACKEND)
  const handleLogin = async (userType) => {
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);

      // Debug: store exact payload to show on screen
      const payload = { email: email, password: '(hidden)', role: userType.toLowerCase() };
      setLastRequest(payload);

      const response = await api.post('/auth/login/', {
        email: email,
        password: password,
        role: userType.toLowerCase(),
      });
      setLastResponse(response.data); // store full response for debugging

      // ✅ Save JWT tokens
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Determine role from server response (preferred) and persist it
      const role = (response.data.user?.user_type || response.data.user?.role || userType.toLowerCase()).toLowerCase();
      console.log('Login successful — server response:', response.data);
      console.log('Computed role:', role);
      setDebugRole(role);
      localStorage.setItem('userRole', role);

      // If the user clicked "Login as Client" explicitly, always send them to client-pending
      if (userType.toLowerCase() === 'client') {
        navigate('/client');
        return;
      }

      // For freelancers, check profile completeness and navigate accordingly
      try {
        // api interceptor will attach the access token from localStorage
        const profileResp = await api.get('/profile/me/');

        // send freelancer to freelancer profile view
        navigate('/freelancer/profile');
      } catch (err) {
        // 404 means profile not found — send to freelancer pending
        const status = err?.response?.status;
        if (status === 404) {
          navigate('/freelancer-pending');
        } else {
          // fallback
          navigate('/freelancer-pending');
        }
      }

    } catch (err) {      // Save server error response if any
      setLastResponse(err?.response?.data || { error: err.message });      setError('Invalid email, password, or role');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password && email.includes('@');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">TL</span>
          </div>
          <span className="text-xl font-bold text-blue-900">TalentLink</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-blue-600 font-medium">
            Login
          </button>
          <button
            onClick={() => window.location.href = '/signup'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-xl mt-20 bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Welcome Back</h1>
          <p className="text-gray-600 text-lg">Log in to your TalentLink account</p>
          {debugRole && (
            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
              Debug: detected role = <strong>{debugRole}</strong>
            </div>
          )}

          {/* Debug: show last request and response payloads */}
          {lastRequest && (
            <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700">
              <div><strong>Last login request:</strong></div>
              <pre className="text-xs">{JSON.stringify(lastRequest, null, 2)}</pre>
            </div>
          )}
          {lastResponse && (
            <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-700">
              <div><strong>Last login response:</strong></div>
              <pre className="text-xs">{JSON.stringify(lastResponse, null, 2)}</pre>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setLastRequest(null); setLastResponse(null); setDebugRole(''); setError(''); }}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField('')}
            className={`w-full px-4 py-3.5 rounded-xl border ${
              focusedField === 'email'
                ? 'border-blue-500 ring-2 ring-blue-100'
                : 'border-gray-300'
            }`}
            placeholder="Email"
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setLastRequest(null); setLastResponse(null); setDebugRole(''); setError(''); }}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                focusedField === 'password'
                  ? 'border-blue-500 ring-2 ring-blue-100'
                  : 'border-gray-300'
              } pr-12`}
              placeholder="Password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <button
            onClick={() => window.location.href = "/forgot-password"}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleLogin('Client')}
            disabled={!isFormValid || isLoading}
            className="py-3.5 rounded-xl bg-blue-600 text-white font-semibold"
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Login as Client'}
          </button>

          <button
            onClick={() => handleLogin('Freelancer')}
            disabled={!isFormValid || isLoading}
            className="py-3.5 rounded-xl bg-teal-600 text-white font-semibold"
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Login as Freelancer'}
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => window.location.href = '/signup'}
              className="text-blue-600 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
