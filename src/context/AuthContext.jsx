/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// Create the authentication context
export const AuthContext = createContext();

// AuthProvider Component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (userData) => {
    console.log("User data", userData);
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userData.email, password: userData.password }),
    });

    if(!response.ok){
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    } else if(response.ok){
      console.log("YAY we logged in!");
    } else {
      console.log("response", response.status);
    }
  
    console.log("response", response.status);
    const now = new Date();
    const fakeToken = { 
      email: userData.email, 
      password: userData.password, 
      expiration: now.setHours(now.getHours() + 1) 
    };
  
    localStorage.setItem("token", JSON.stringify(fakeToken));
    setUser(userData);
    setToken(fakeToken);
    console.log("User logged in:", userData);
  };
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