// context/AuthContext.js

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      console.log("Token found in localStorage");
      setUser({ token });
    }
  }, []);

  const login = async (userData) => {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("jwt_token", data.jwt_token);
    setUser({ token: data.jwt_token });
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};