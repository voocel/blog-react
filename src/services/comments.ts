import api from './api';
import { Comment } from '../types/comment';

interface CommentResponse {
  data: Comment[];
  total: number;
}

export const getComments = async (page: number, pageSize: number): Promise<CommentResponse> => {
  return api.get<CommentResponse>('/comments', { params: { page, pageSize } });
};

export const getArticleComments = async (articleId: number): Promise<Comment[]> => {
  return api.get<Comment[]>(`/articles/${articleId}/comments`);
};

export const deleteComment = async (id: number): Promise<void> => {
  await api.delete(`/comments/${id}`);
};

export const createComment = async (articleId: number, comment: Partial<Comment>): Promise<Comment> => {
  return api.post<Comment>(`/articles/${articleId}/comments`, comment);
};

export const updateComment = async (id: number, comment: Partial<Comment>): Promise<Comment> => {
  return api.put<Comment>(`/comments/${id}`, comment);
};
