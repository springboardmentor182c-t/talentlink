import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Default Initial Data
  const [user, setUser] = useState({
    name: "Kumar Gosala",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/150?img=3", // Default image
  });

  const updateProfile = (name, avatarFile) => {
    setUser((prev) => ({
      ...prev,
      name: name,
      // If a new file is provided, create a local URL for it, otherwise keep old avatar
      avatar: avatarFile ? URL.createObjectURL(avatarFile) : prev.avatar,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);