import api from './api';
import { User } from '../types/user';

interface UsersResponse {
  data: User[];
  total: number;
}

export const getUsers = async (page: number, pageSize: number): Promise<UsersResponse> => {
  return api.get<UsersResponse>('/users', { params: { page, pageSize } });
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const createUser = async (user: Partial<User>): Promise<User> => {
  return api.post<User>('/users', user);
};

export const getUser = async (id: number): Promise<User> => {
  return api.get<User>(`/users/${id}`);
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  return api.put<User>(`/users/${id}`, user);
};

// 添加这个新函数
export const updateUserStatus = async (id: number, status: boolean): Promise<User> => {
  return api.patch<User>(`/users/${id}/status`, { status });
};
