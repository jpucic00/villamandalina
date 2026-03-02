"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { verifyToken, isAuthenticated } from "./api";

interface User {
  id: number;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  updateUser: (user: User) => void;
  clearUser: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAuthenticated()) {
      const userData = await verifyToken();
      setUser(userData);
    }
    setLoading(false);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser, clearUser, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
