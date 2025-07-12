import { ApiService } from './api';
import { 
  Comment, 
  PaginatedResponse, 
  CommentQueryParams, 
  CreateCommentRequest 
} from '../types/api';

export class CommentService {
  // 获取评论列表
  static async getComments(params?: CommentQueryParams): Promise<PaginatedResponse<Comment>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);
    if (params?.articleId) queryString.append('articleId', params.articleId.toString());
    if (params?.discussionId) queryString.append('discussionId', params.discussionId.toString());
    if (params?.status) queryString.append('status', params.status);

    const url = `/comments${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<Comment>>(url);
  }

  // 创建评论
  static async createComment(data: CreateCommentRequest): Promise<Comment> {
    return ApiService.post<Comment>('/comments', data);
  }

  // 更新评论
  static async updateComment(id: number, data: Partial<CreateCommentRequest>): Promise<Comment> {
    return ApiService.put<Comment>(`/comments/${id}`, data);
  }

  // 删除评论
  static async deleteComment(id: number): Promise<void> {
    return ApiService.delete<void>(`/comments/${id}`);
  }

  // 审核评论
  static async approveComment(id: number): Promise<Comment> {
    return ApiService.put<Comment>(`/comments/${id}/approve`);
  }

  // 拒绝评论
  static async rejectComment(id: number): Promise<Comment> {
    return ApiService.put<Comment>(`/comments/${id}/reject`);
  }
}