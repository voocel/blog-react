import { ApiService } from './api';
import { 
  Category, 
  PaginatedResponse, 
  SearchParams, 
  CreateCategoryRequest 
} from '../types/api';

export class CategoryService {
  // 获取分类列表
  static async getCategories(params?: SearchParams): Promise<PaginatedResponse<Category>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);

    const url = `/categories${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<Category>>(url);
  }

  // 获取所有分类（不分页）
  static async getAllCategories(): Promise<Category[]> {
    const result = await this.getCategories({ pageSize: 999 });
    return result.items;
  }

  // 创建分类
  static async createCategory(data: CreateCategoryRequest): Promise<Category> {
    return ApiService.post<Category>('/categories', data);
  }

  // 更新分类
  static async updateCategory(id: number, data: Partial<CreateCategoryRequest>): Promise<Category> {
    return ApiService.put<Category>(`/categories/${id}`, data);
  }

  // 删除分类
  static async deleteCategory(id: number): Promise<void> {
    return ApiService.delete<void>(`/categories/${id}`);
  }
}