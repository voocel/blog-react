import { ApiService } from './api';
import { 
  FriendLink, 
  PaginatedResponse, 
  SearchParams, 
  CreateFriendLinkRequest 
} from '../types/api';

export class FriendLinkService {
  // 获取友链列表
  static async getFriendLinks(params?: SearchParams & { status?: 'active' | 'inactive' }): Promise<PaginatedResponse<FriendLink>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);
    if (params?.status) queryString.append('status', params.status);

    const url = `/friendlinks${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<FriendLink>>(url);
  }

  // 获取活跃友链（前台显示）
  static async getActiveFriendLinks(): Promise<FriendLink[]> {
    return ApiService.get<FriendLink[]>('/friendlinks/active');
  }

  // 创建友链
  static async createFriendLink(data: CreateFriendLinkRequest): Promise<FriendLink> {
    return ApiService.post<FriendLink>('/friendlinks', data);
  }

  // 更新友链
  static async updateFriendLink(id: string, data: Partial<CreateFriendLinkRequest>): Promise<FriendLink> {
    return ApiService.put<FriendLink>(`/friendlinks/${id}`, data);
  }

  // 删除友链
  static async deleteFriendLink(id: string): Promise<void> {
    return ApiService.delete<void>(`/friendlinks/${id}`);
  }
}