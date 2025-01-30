import React, { createContext, useContext, useState } from "react";
import { login, logout, isAuthenticated } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(isAuthenticated());

  const loginUser = () => {
    login();
    setAuth(true);
  };

  const logoutUser = () => {
    logout();
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ auth, login: loginUser, logout: logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
