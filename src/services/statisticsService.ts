import { ApiService } from './api';
import { 
  DashboardStats, 
  VisitRecord, 
  PaginatedResponse, 
  VisitQueryParams,
  SystemInfo 
} from '../types/api';

export class StatisticsService {
  // 获取仪表盘统计
  static async getDashboardStats(): Promise<DashboardStats> {
    return ApiService.get<DashboardStats>('/admin/statistics/dashboard');
  }

  // 获取访问统计
  static async getVisitStatistics(params?: VisitQueryParams): Promise<PaginatedResponse<VisitRecord>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);
    if (params?.startDate) queryString.append('startDate', params.startDate);
    if (params?.endDate) queryString.append('endDate', params.endDate);

    const url = `/admin/statistics/visits${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<VisitRecord>>(url);
  }

  // 获取系统信息
  static async getSystemInfo(): Promise<SystemInfo> {
    return ApiService.get<SystemInfo>('/admin/system/info');
  }

  // 记录访问
  static async recordVisit(data: {
    articleId?: string;
    ip?: string;
    userAgent?: string;
    referer?: string;
  }): Promise<void> {
    return ApiService.post<void>('/statistics/visit', data);
  }
}