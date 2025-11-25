import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute:
 * - allowedRole: if provided, user.role must match
 * Usage: <ProtectedRoute allowedRole="client"><Page/></ProtectedRoute>
 */
export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // If role mismatch, redirect to their dashboard (best-effort)
    if (role === "client") return <Navigate to="/client" replace />;
    if (role === "freelancer") return <Navigate to="/freelancer" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
