import api from './api';
import { User } from '../types/user';

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post<User>('/auth/login', { email, password });
  return response;
};

export const register = async (email: string, password: string, username: string): Promise<User> => {
  // 这里应该是实际的注册逻辑，可能涉及到 API 调用
  // 现在我们只是模拟一个成功的注册
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,  // 使用数字类型的 ID
        email,
        username,
        avatar: '',
        role: 'user',
        status: true,
        createdAt: new Date().toISOString(),
        nickname: username,
        website: '',
        description: '',
        avatarUrl: '',
      });
    }, 1000);
  });
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
