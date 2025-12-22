import React, { useState } from "react";
import api from "../services/api";
import { Loader2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/send-otp/", {
        email: email,
      });

      // ✅ store email for OTP verification
      localStorage.setItem("resetEmail", email);

      setSuccess("OTP sent successfully. Check terminal.");

      // ✅ redirect to OTP page
      setTimeout(() => {
        window.location.href = "/otp-verify";
      }, 1500);

    } catch (err) {
      setError("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow border">

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
          Forgot Password
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your registered email to receive OTP
        </p>

        {error && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-600 text-sm text-center">
            {success}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-200"
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Send OTP"}
        </button>

        <div className="text-center mt-6">
          <button
            onClick={() => window.location.href = "/login"}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}
