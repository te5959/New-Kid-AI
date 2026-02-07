import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { loginParent, registerParent, getParentProfile, logoutParent, Parent } from "../api/auth.api";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "../utils/tokenStorage";

type AuthContextValue = {
  parent: Parent | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [parent, setParent] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        api.defaults.headers.Authorization = `Bearer ${accessToken}`;
        try {
          const profile = await getParentProfile();
          setParent(profile);
        } catch {
          clearTokens();
          setParent(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { parent: parentInfo, accessToken, refreshToken } = await loginParent({ email, password });
    setTokens(accessToken, refreshToken);
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    setParent(parentInfo);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const { parent: parentInfo, accessToken, refreshToken } = await registerParent({
      email,
      password,
      displayName
    });
    setTokens(accessToken, refreshToken);
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    setParent(parentInfo);
  };

  const logout = async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await logoutParent(refreshToken);
    }
    clearTokens();
    setParent(null);
    delete api.defaults.headers.Authorization;
  };

  const value = useMemo(
    () => ({
      parent,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(parent)
    }),
    [parent, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
