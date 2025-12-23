import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import api from "../services/api";
import authService from "../services/authService";

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');

  // ✅ REAL SIGNUP (CONNECTED TO BACKEND)
  const handleSignUp = async (userType) => {
    setError('');

    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);

      const response = await authService.register(fullName || email, email, password, userType.toLowerCase());

      // If registration returned tokens, user is auto-logged in and redirected by role
      if (authService.getToken()) {
        const role = (localStorage.getItem('userRole') || response.user?.user_type || response.user?.userType || userType).toLowerCase();
        if (role === 'client') {
          window.location.href = '/client-pending';
        } else {
          window.location.href = '/freelancer-pending';
        }
      } else {
        alert('Account created successfully. Please login.');
        window.location.href = '/login';
      }

    } catch (err) {
      const message = err?.detail || err?.email || err?.message || 'Signup failed. Email may already exist.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    fullName &&
    email &&
    password &&
    email.includes('@') &&
    password.length >= 6;

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
          <button
            onClick={() => window.location.href = '/login'}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Login
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-xl mt-20 bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">
            Create Account
          </h1>
          <p className="text-gray-600 text-lg">
            Join TalentLink and start your journey
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onFocus={() => setFocusedField('fullName')}
            onBlur={() => setFocusedField('')}
            className={`w-full px-4 py-3.5 rounded-xl border ${
              focusedField === 'fullName'
                ? 'border-blue-500 ring-2 ring-blue-100'
                : 'border-gray-300'
            }`}
            placeholder="Full Name"
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-3.5 rounded-xl border ${
                focusedField === 'password'
                  ? 'border-blue-500 ring-2 ring-blue-100'
                  : 'border-gray-300'
              } pr-12`}
              placeholder="Password (min 6 characters)"
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

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => handleSignUp('Client')}
            disabled={!isFormValid || isLoading}
            className="py-3.5 rounded-xl bg-blue-600 text-white font-semibold"
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign Up as Client'}
          </button>

          <button
            onClick={() => handleSignUp('Freelancer')}
            disabled={!isFormValid || isLoading}
            className="py-3.5 rounded-xl bg-teal-600 text-white font-semibold"
          >
            {isLoading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign Up as Freelancer'}
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => window.location.href = '/login'}
              className="text-blue-600 font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
