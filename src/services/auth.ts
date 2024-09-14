import api from './api';
import { User } from '../types/user';

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post<User>('/auth/login', { email, password });
  return response;
};

export const register = async (username: string, email: string, password: string): Promise<User> => {
  const response = await api.post<User>('/auth/register', { username, email, password });
  return response;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>('/auth/me');
    return response;
  } catch (error) {
    return null;
  }
};
