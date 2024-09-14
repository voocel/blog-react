import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../utils/constants';

// 创建自定义的 Axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// API 对象
const api = {
  get: <T>(url: string, config?: any): Promise<T> => 
    axiosInstance.get<T, AxiosResponse<T>>(url, config).then((res) => res.data),
  post: <T>(url: string, data?: any, config?: any): Promise<T> => 
    axiosInstance.post<T, AxiosResponse<T>>(url, data, config).then((res) => res.data),
  put: <T>(url: string, data?: any, config?: any): Promise<T> => 
    axiosInstance.put<T, AxiosResponse<T>>(url, data, config).then((res) => res.data),
  patch: <T>(url: string, data?: any, config?: any): Promise<T> => 
    axiosInstance.patch<T, AxiosResponse<T>>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config?: any): Promise<T> => 
    axiosInstance.delete<T, AxiosResponse<T>>(url, config).then((res) => res.data),
};

export default api;
