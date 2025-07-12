import { ApiService } from './api';
import { 
  Discussion, 
  PaginatedResponse, 
  DiscussionQueryParams, 
  CreateDiscussionRequest 
} from '../types/api';

export class DiscussionService {
  // 获取讨论列表
  static async getDiscussions(params?: DiscussionQueryParams): Promise<PaginatedResponse<Discussion>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);
    if (params?.tag) queryString.append('tag', params.tag);
    if (params?.status) queryString.append('status', params.status);

    const url = `/discussions${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<Discussion>>(url);
  }

  // 获取讨论详情
  static async getDiscussion(id: number): Promise<Discussion> {
    return ApiService.get<Discussion>(`/discussions/${id}`);
  }

  // 创建讨论
  static async createDiscussion(data: CreateDiscussionRequest): Promise<Discussion> {
    return ApiService.post<Discussion>('/discussions', data);
  }

  // 更新讨论
  static async updateDiscussion(id: number, data: Partial<CreateDiscussionRequest>): Promise<Discussion> {
    return ApiService.put<Discussion>(`/discussions/${id}`, data);
  }

  // 删除讨论
  static async deleteDiscussion(id: number): Promise<void> {
    return ApiService.delete<void>(`/discussions/${id}`);
  }

  // 获取热门讨论
  static async getPopularDiscussions(limit = 10): Promise<Discussion[]> {
    return ApiService.get<Discussion[]>(`/discussions/popular?limit=${limit}`);
  }
}