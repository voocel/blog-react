import api from './api';

export interface DashboardStats {
  userCount: number;
  viewCount: number;
  articleCount: number;
  commentCount: number;
  totalArticles: number;
  totalComments: number;
  totalViews: number;
  // ... 其他可能的统计数据
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return api.get<DashboardStats>('/dashboard/stats');
};