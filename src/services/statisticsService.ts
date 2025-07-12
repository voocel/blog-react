import { ApiService } from './api';
import { 
  DashboardStats, 
  VisitRecord, 
  PaginatedResponse, 
  VisitQueryParams 
} from '../types/api';

export class StatisticsService {
  // 获取仪表盘统计数据
  static async getDashboardStats(): Promise<DashboardStats> {
    return ApiService.get<DashboardStats>('/admin/statistics/dashboard');
  }

  // 获取访问统计
  static async getVisitStats(params?: VisitQueryParams): Promise<PaginatedResponse<VisitRecord>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);
    if (params?.startDate) queryString.append('startDate', params.startDate);
    if (params?.endDate) queryString.append('endDate', params.endDate);

    const url = `/admin/statistics/visits${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<VisitRecord>>(url);
  }

  // 记录访问
  static async recordVisit(data: {
    articleId?: number;
    path: string;
    userAgent: string;
    referer?: string;
  }): Promise<void> {
    await ApiService.post<void>('/statistics/visit', data);
  }

  // 获取热门文章
  static async getPopularArticles(limit = 10): Promise<Array<{
    id: number;
    title: string;
    viewCount: number;
  }>> {
    return ApiService.get<Array<{
      id: number;
      title: string;
      viewCount: number;
    }>>(`/statistics/popular-articles?limit=${limit}`);
  }
}