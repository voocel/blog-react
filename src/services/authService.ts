import { ApiService } from './api';
import { User } from '../types/auth';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export class AuthService {
  // 登录
  static async login(data: LoginRequest): Promise<LoginResponse> {
    return ApiService.post<LoginResponse>('/auth/login', data);
  }

  // 注册
  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    return ApiService.post<RegisterResponse>('/auth/register', data);
  }

  // 登出
  static async logout(): Promise<void> {
    return ApiService.post<void>('/auth/logout');
  }

  // 刷新Token
  static async refreshToken(refreshToken: string): Promise<{ token: string; expiresIn: number }> {
    return ApiService.post<{ token: string; expiresIn: number }>('/auth/refresh', {
      refreshToken,
    });
  }

  // 获取当前用户信息
  static async getCurrentUser(): Promise<User> {
    return ApiService.get<User>('/auth/me');
  }

  // 更新用户信息
  static async updateProfile(data: Partial<User>): Promise<User> {
    return ApiService.put<User>('/auth/profile', data);
  }

  // 修改密码
  static async changePassword(data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    return ApiService.post<void>('/auth/change-password', data);
  }

  // 忘记密码
  static async forgotPassword(email: string): Promise<void> {
    return ApiService.post<void>('/auth/forgot-password', { email });
  }

  // 重置密码
  static async resetPassword(data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    return ApiService.post<void>('/auth/reset-password', data);
  }
}