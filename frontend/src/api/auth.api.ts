import api from "./axios";

export type Parent = {
  id: string;
  email: string;
  displayName: string;
};

export type AuthResponse = {
  parent: Parent;
  accessToken: string;
  refreshToken: string;
};

export const registerParent = async (payload: {
  email: string;
  password: string;
  displayName: string;
}) => {
  const response = await api.post<AuthResponse>("/api/auth/register", payload);
  return response.data;
};

export const loginParent = async (payload: { email: string; password: string }) => {
  const response = await api.post<AuthResponse>("/api/auth/login", payload);
  return response.data;
};

export const logoutParent = async (refreshToken: string) => {
  await api.post("/api/auth/logout", { refreshToken });
};

export const getParentProfile = async () => {
  const response = await api.get<Parent>("/api/parents/me");
  return response.data;
};
