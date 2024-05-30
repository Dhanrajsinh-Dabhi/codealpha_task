
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('jwtToken')); // Initial authentication check

  useEffect(() => {
    // Check for token in sessionStorage on component mount or token change
    const token = sessionStorage.getItem('jwtToken');
    setIsAuthenticated(!!token); // Update authentication state based on token
  }, [sessionStorage.getItem('jwtToken')]); // Dependency array for useEffect

  const login = (token) => {
    sessionStorage.setItem('jwtToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
