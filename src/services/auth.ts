import { User } from '../types/user';
import api from './api';
import { AxiosResponse } from 'axios';

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

export interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟登录逻辑
  if (email === 'test@example.com' && password === 'password') {
    return {
      user: mockUser,
      token: 'mock-jwt-token'
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

export const register = async (email: string, password: string, username: string): Promise<User> => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟注册逻辑
  if (email && password && username) {
    return {
      ...mockUser,
      email,
      username,
      nickname: username
    };
  } else {
    throw new Error('Invalid registration information');
  }
};

export const logout = async (): Promise<void> => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  // 在实际应用中，这里可能需要清除服务器端的 session
  console.log('User logged out');
};

export const getCurrentUser = async (): Promise<User | null> => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 模拟获取当前用户信息
  return mockUser;
};
