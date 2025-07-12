import { ApiService } from './api';
import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  ChangePasswordRequest 
} from '../types/api';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export class AuthService {
  // 用户登录
  static async login(data: LoginRequest): Promise<AuthResponse> {
    return ApiService.post<AuthResponse>('/auth/login', data);
  }

  // 用户注册
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    return ApiService.post<AuthResponse>('/auth/register', data);
  }

  // 获取当前用户信息
  static async getCurrentUser(): Promise<User> {
    return ApiService.get<User>('/auth/me');
  }

  // 更新用户资料
  static async updateProfile(data: {
    nickname?: string;
    website?: string;
    description?: string;
    avatar?: string;
  }): Promise<User> {
    return ApiService.put<User>('/auth/profile', data);
  }

  // 修改密码
  static async changePassword(data: ChangePasswordRequest): Promise<void> {
    return ApiService.post<void>('/auth/change-password', data);
  }

  // 刷新令牌
  static async refreshToken(refreshToken: string): Promise<{
    token: string;
    expiresIn: number;
  }> {
    return ApiService.post<{
      token: string;
      expiresIn: number;
    }>('/auth/refresh', { refreshToken });
  }

  // 用户登出
  static async logout(): Promise<void> {
    return ApiService.post<void>('/auth/logout');
  }
}