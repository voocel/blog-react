import api from './api';
import { AxiosResponse } from 'axios';  // 假设你使用的是 axios

export interface DashboardStats {
  userCount: number;
  totalArticles: number;
  totalComments: number;
  totalViews: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response: AxiosResponse<DashboardStats> = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('获取仪表盘统计数据失败:', error);
    // 如果API调用失败，返回默认值
    return {
      userCount: 0,
      totalArticles: 0,
      totalComments: 0,
      totalViews: 0
    };
  }
}