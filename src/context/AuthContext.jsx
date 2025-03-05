/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Create the authentication context
export const AuthContext = createContext();

// AuthProvider Component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    console.log("User logged out");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};