import { ApiService } from './api';
import { 
  Article, 
  PaginatedResponse, 
  ArticleQueryParams, 
  CreateArticleRequest 
} from '../types/api';

export class ArticleService {
  // 获取文章列表
  static async getArticles(params?: ArticleQueryParams): Promise<PaginatedResponse<Article>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);
    if (params?.category) queryString.append('category', params.category);
    if (params?.tag) queryString.append('tag', params.tag);
    if (params?.status) queryString.append('status', params.status);

    const url = `/articles${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<Article>>(url);
  }

  // 获取文章详情
  static async getArticle(id: number): Promise<Article> {
    return ApiService.get<Article>(`/articles/${id}`);
  }

  // 创建文章
  static async createArticle(data: CreateArticleRequest): Promise<Article> {
    return ApiService.post<Article>('/articles', data);
  }

  // 更新文章
  static async updateArticle(id: number, data: Partial<CreateArticleRequest>): Promise<Article> {
    return ApiService.put<Article>(`/articles/${id}`, data);
  }

  // 删除文章
  static async deleteArticle(id: number): Promise<void> {
    return ApiService.delete<void>(`/articles/${id}`);
  }

  // 获取热门文章
  static async getPopularArticles(limit = 10): Promise<Article[]> {
    return ApiService.get<Article[]>(`/articles/popular?limit=${limit}`);
  }

  // 获取相关文章
  static async getRelatedArticles(id: number, limit = 5): Promise<Article[]> {
    return ApiService.get<Article[]>(`/articles/${id}/related?limit=${limit}`);
  }
}