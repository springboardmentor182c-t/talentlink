import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedName = localStorage.getItem("user_name");
  const storedEmail = localStorage.getItem("user_email");
  const storedRole = localStorage.getItem("role");

  const [user, setUser] = useState({
    name: storedName || "User",
    email: storedEmail || "",
    role: storedRole || "User",
    avatar: "https://i.pravatar.cc/150?img=3", // Default image
  });

  // Hydrate from stored values and attempt profile fetch
  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      name: storedName || prev.name,
      email: storedEmail || prev.email,
      role: storedRole || prev.role,
    }));

    const token = localStorage.getItem("access_token");
    if (!token) return;

    axiosInstance
      .get("users/profile/")
      .then((res) => {
        const profile = res.data || {};
        const fullName = `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
        const nameFromProfile =
          profile.username ||
          profile.name ||
          fullName ||
          storedName ||
          "User";
        const roleFromProfile = profile.role || storedRole || "User";
        const emailFromProfile = profile.email || storedEmail || "";

        setUser((prev) => ({
          ...prev,
          name: nameFromProfile,
          email: emailFromProfile,
          role: roleFromProfile,
        }));

        if (nameFromProfile) localStorage.setItem("user_name", nameFromProfile);
        if (emailFromProfile) localStorage.setItem("user_email", emailFromProfile);
        if (roleFromProfile) localStorage.setItem("role", roleFromProfile);
      })
      .catch(() => {
        // ignore; keep stored values
      });
  }, []);

  const updateProfile = (name, avatarFile) => {
    setUser((prev) => ({
      ...prev,
      name: name,
      avatar: avatarFile ? URL.createObjectURL(avatarFile) : prev.avatar,
    }));
    if (name) localStorage.setItem("user_name", name);
  };

  return (
    <UserContext.Provider value={{ user, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);