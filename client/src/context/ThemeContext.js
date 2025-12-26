import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check local storage for preference, default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'light';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('appTheme', newTheme);
      return newTheme;
    });
  };

  // Optional: Apply a class to the body for global CSS usage
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#f3f4f8';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};