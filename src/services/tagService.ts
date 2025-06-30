import { ApiService } from './api';
import { 
  Tag, 
  PaginatedResponse, 
  SearchParams, 
  CreateTagRequest 
} from '../types/api';

export class TagService {
  // 获取标签列表
  static async getTags(params?: SearchParams): Promise<PaginatedResponse<Tag>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);

    const url = `/tags${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<Tag>>(url);
  }

  // 获取所有标签（不分页）
  static async getAllTags(): Promise<Tag[]> {
    return ApiService.get<Tag[]>('/tags/all');
  }

  // 创建标签
  static async createTag(data: CreateTagRequest): Promise<Tag> {
    return ApiService.post<Tag>('/tags', data);
  }

  // 更新标签
  static async updateTag(id: string, data: Partial<CreateTagRequest>): Promise<Tag> {
    return ApiService.put<Tag>(`/tags/${id}`, data);
  }

  // 删除标签
  static async deleteTag(id: string): Promise<void> {
    return ApiService.delete<void>(`/tags/${id}`);
  }

  // 获取热门标签
  static async getPopularTags(limit = 20): Promise<Tag[]> {
    return ApiService.get<Tag[]>(`/tags/popular?limit=${limit}`);
  }
}