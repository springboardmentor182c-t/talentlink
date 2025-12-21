import React, { useState } from "react";
import api from "../services/api";
import { Loader2 } from "lucide-react";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");

    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }

    const email = localStorage.getItem("resetEmail");

    if (!email) {
      setError("Session expired. Please request OTP again.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/verify-otp/", {
        email: email,
        otp: otp,
      });

      setSuccess("OTP verified successfully");

      // ✅ Move to reset password page
      setTimeout(() => {
        window.location.href = "/reset-password";
      }, 1500);

    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border">
        <h2 className="text-2xl font-bold text-center mb-4">
          OTP Verification
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the OTP sent to your registered email
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

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full px-4 py-3 border rounded-lg mb-4 text-center tracking-widest text-lg"
          disabled={loading}
        />

        <button
          onClick={handleVerifyOtp}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
