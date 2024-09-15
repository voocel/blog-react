import { User } from '../types/user';
import api from './api';
import { AxiosResponse } from 'axios';  // 假设你使用的是 axios

// 模拟用户数据
const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'testuser',
  avatar: 'https://example.com/avatar.jpg',
  role: 1,  // 确保这里设置为 1
  status: true,
  createdAt: '2023-01-01T00:00:00Z',
  nickname: 'Test User',
  website: 'https://example.com',
  description: 'This is a test user',
  avatarUrl: 'https://example.com/avatar.jpg'
};

interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', { email, password });
    console.log('Login response:', response.data);
    return response.data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (email: string, password: string, username: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await api.post('/auth/register', { email, password, username });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
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
