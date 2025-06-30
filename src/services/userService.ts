import { ApiService } from './api';
import { 
  User, 
  PaginatedResponse, 
  SearchParams 
} from '../types/api';

export class UserService {
  // 获取用户列表（管理员）
  static async getUsers(params?: SearchParams): Promise<PaginatedResponse<User>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);

    const url = `/admin/users${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<User>>(url);
  }

  // 创建用户（管理员）
  static async createUser(data: {
    username: string;
    email: string;
    password: string;
    role?: 'admin' | 'user';
    nickname?: string;
    website?: string;
    description?: string;
  }): Promise<User> {
    return ApiService.post<User>('/admin/users', data);
  }

  // 更新用户（管理员）
  static async updateUser(id: string, data: Partial<User>): Promise<User> {
    return ApiService.put<User>(`/admin/users/${id}`, data);
  }

  // 删除用户（管理员）
  static async deleteUser(id: string): Promise<void> {
    return ApiService.delete<void>(`/admin/users/${id}`);
  }

  // 获取用户详情
  static async getUser(id: string): Promise<User> {
    return ApiService.get<User>(`/users/${id}`);
  }
}