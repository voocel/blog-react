import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '../stores/authStore';
import { navigationManager } from '../utils/navigation';

// API响应格式
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

// 分页响应格式
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 创建axios实例
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 请求拦截器
  client.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  client.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      const { data } = response;
      
      // 检查业务状态码
      if (data.code !== 200) {
        throw new Error(data.message || '请求失败');
      }
      
      return response;
    },
    (error) => {
      // 处理HTTP错误
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 401:
            // 未授权，清除登录状态
            useAuthStore.getState().logout();
            navigationManager.navigate('/login');
            break;
          case 403:
            throw new Error('没有权限访问该资源');
          case 404:
            throw new Error('请求的资源不存在');
          case 500:
            throw new Error('服务器内部错误');
          default:
            throw new Error(data?.message || '网络请求失败');
        }
      } else if (error.request) {
        throw new Error('网络连接失败，请检查网络设置');
      } else {
        throw new Error(error.message || '请求配置错误');
      }
    }
  );

  return client;
};

export const apiClient = createApiClient();

// 通用API方法
export class ApiService {
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  static async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  static async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  static async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }
}