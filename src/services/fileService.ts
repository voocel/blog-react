import { ApiService } from './api';
import { 
  FileItem, 
  PaginatedResponse, 
  FileQueryParams 
} from '../types/api';

export class FileService {
  // 上传文件
  static async uploadFile(file: File, path?: string): Promise<FileItem> {
    const formData = new FormData();
    formData.append('file', file);
    if (path) formData.append('path', path);

    return ApiService.post<FileItem>('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // 获取文件列表
  static async getFiles(params?: FileQueryParams): Promise<PaginatedResponse<FileItem>> {
    const queryString = new URLSearchParams();
    
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.pageSize) queryString.append('pageSize', params.pageSize.toString());
    if (params?.search) queryString.append('search', params.search);
    if (params?.path) queryString.append('path', params.path);
    if (params?.type) queryString.append('type', params.type);

    const url = `/files${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    return ApiService.get<PaginatedResponse<FileItem>>(url);
  }

  // 删除文件
  static async deleteFile(id: number): Promise<void> {
    return ApiService.delete<void>(`/files/${id}`);
  }

  // 创建文件夹
  static async createFolder(data: { name: string; path: string }): Promise<FileItem> {
    return ApiService.post<FileItem>('/files/folder', data);
  }

  // 重命名文件
  static async renameFile(id: number, name: string): Promise<FileItem> {
    return ApiService.put<FileItem>(`/files/${id}/rename`, { name });
  }

  // 移动文件
  static async moveFile(id: number, path: string): Promise<FileItem> {
    return ApiService.put<FileItem>(`/files/${id}/move`, { path });
  }
}