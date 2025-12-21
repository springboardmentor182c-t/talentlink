import React, { useState } from "react";
import api from "../services/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      setError("Session expired. Please restart forgot password.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/reset-password/", {
        email: email,
        password: password,
      });

      setSuccess("Password reset successfully");

      // 🧹 cleanup
      localStorage.removeItem("resetEmail");

      // 🔁 back to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      setError("Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border">

        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password
        </p>

        {error && (
          <p className="text-center text-sm text-red-600 mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-center text-sm text-green-600 mb-4">
            {success}
          </p>
        )}

        {/* New Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg pr-12"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-6"
          disabled={loading}
        />

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Reset Password"}
        </button>

      </div>
    </div>
  );
}
