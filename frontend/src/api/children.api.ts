import api from "./axios";

export type ChildProfile = {
  id: string;
  displayName: string;
  age: number;
};

export const listChildren = async () => {
  const response = await api.get<ChildProfile[]>("/api/children");
  return response.data;
};

export const createChild = async (payload: { displayName: string; age: number }) => {
  const response = await api.post<ChildProfile>("/api/children", payload);
  return response.data;
};

export const updateChild = async (id: string, payload: Partial<ChildProfile>) => {
  const response = await api.patch<ChildProfile>(`/api/children/${id}`, payload);
  return response.data;
};
