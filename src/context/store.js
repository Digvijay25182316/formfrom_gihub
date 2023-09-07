import Cookies from "js-cookies";
import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [Authenticated, setAuthenticated] = useState(false);
  const [dark, setIsdark] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (Cookies.hasItem("token")) {
      setAuthenticated(true);
    }
    if (Cookies.getItem("user")) {
      const role = JSON.parse(Cookies.getItem("user")).role;
      setIsAdmin(role && role === "Admin");
    }
  }, []);

  const roleChange = () => {
    setIsAdmin(true);
  };

  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
  };

  const togglemode = () => {
    setIsdark(!dark);
  };

  const contextValue = {
    Authenticated,
    login,
    logout,
    isAdmin,
    roleChange,
    dark,
    togglemode,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// Custom hook to consume the context
export function useAppContext() {
  return useContext(AppContext);
}
