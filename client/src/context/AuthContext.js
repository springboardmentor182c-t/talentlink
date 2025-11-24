import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * AuthContext stores:
 * - user: { id, name }
 * - role: "client" | "freelancer" | null
 *
 * login({ role, name }) -> sets user+role (simulates backend login)
 * logout() -> clears auth
 *
 * Note: replace simulated login with real API calls (Axios / fetch) and JWT handling.
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // object or null
  const [role, setRole] = useState(null);

  // restore from localStorage (optional)
  useEffect(() => {
    const saved = localStorage.getItem("talentlink_auth");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed.user);
        setRole(parsed.role);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("talentlink_auth", JSON.stringify({ user, role }));
  }, [user, role]);

  const login = async ({ role: userRole, name }) => {
    // TODO: replace with real API call to backend (POST /api/token/ or custom)
    // Simulate success:
    const fakeUser = { id: Date.now(), name: name || "You" };
    setUser(fakeUser);
    setRole(userRole);
    // redirect to appropriate dashboard
    if (userRole === "client") navigate("/client");
    else if (userRole === "freelancer") navigate("/freelancer");
    else navigate("/");
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("talentlink_auth");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
