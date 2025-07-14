import { useState, useEffect, useCallback } from 'react';
import { PaginatedResponse, FileItem } from '../types/api';
import { FileService } from '../services/fileService';

interface UseManagementOptions<T> {
  fetchData: (params: { page: number; pageSize: number }) => Promise<PaginatedResponse<T>>;
  deleteData: (id: number) => Promise<void>;
  pageSize?: number;
  errorMessage?: string;
  deleteErrorMessage?: string;
}

export function useManagement<T extends { id: number | string }>(
  options: UseManagementOptions<T>
) {
  const {
    fetchData,
    deleteData,
    pageSize = 10,
    errorMessage = '获取数据失败',
    deleteErrorMessage = '删除数据失败'
  } = options;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const deleteItem = useCallback(async (item: T) => {
    try {
      await deleteData(Number(item.id));
      setData(prevData => prevData.filter(d => d.id !== item.id));
    } catch (err) {
      console.error('Failed to delete item:', err);
      setError(deleteErrorMessage);
    }
  }, [deleteData, deleteErrorMessage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const refreshData = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // 直接在useEffect中处理数据获取，避免不必要的依赖
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchData({ page: currentPage, pageSize });
        // 后端返回的数据格式：{ items: [], total: number, page: number, pageSize: number, totalPages: number }
        setData(response.items || []);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        setError(errorMessage);
        console.error('Failed to fetch data:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [currentPage, pageSize, refreshTrigger]);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    deleteItem,
    handlePageChange,
    refreshData
  };
}

export function useFileManagement(initialPath: string = 'root') {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // 标准化路径：将反斜杠转换为正斜杠
  const normalizePath = useCallback((path: string): string => {
    return path.replace(/\\/g, '/');
  }, []);

  // 获取当前目录下的文件列表
  const getCurrentFiles = useCallback(() => {
    const normalizedCurrentPath = normalizePath(currentPath);
    
    return files.filter(file => {
      const normalizedFilePath = normalizePath(file.path || '');
      
      // 计算父目录路径
      const pathParts = normalizedFilePath.split('/');
      const parentPath = pathParts.slice(0, -1).join('/');
      
      // 检查父目录是否与当前路径匹配
      return parentPath === normalizedCurrentPath;
    });
  }, [files, currentPath, normalizePath]);

  // 获取文件列表
  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await FileService.getFiles({
        path: currentPath,
        page: 1,
        pageSize: 100
      });
      setFiles(response.items);
    } catch (error) {
      console.error('获取文件列表失败:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [currentPath]);

  // 上传文件
  const uploadFiles = useCallback(async (filesToUpload: File[]) => {
    setUploading(true);
    try {
      const uploadPromises = filesToUpload.map(file => 
        FileService.uploadFile(file, currentPath)
      );
      
      await Promise.all(uploadPromises);
      await fetchFiles(); // 重新获取文件列表
      return filesToUpload.length;
    } catch (error) {
      console.error('文件上传失败:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  }, [currentPath, fetchFiles]);

  // 删除文件
  const deleteFile = useCallback(async (fileId: number) => {
    try {
      await FileService.deleteFile(fileId);
      await fetchFiles(); // 重新获取文件列表
    } catch (error) {
      console.error('删除文件失败:', error);
      throw error;
    }
  }, [fetchFiles]);

  // 创建文件夹
  const createFolder = useCallback(async (folderName: string) => {
    try {
      await FileService.createFolder({
        name: folderName,
        path: currentPath
      });
      await fetchFiles(); // 重新获取文件列表
    } catch (error) {
      console.error('创建文件夹失败:', error);
      throw error;
    }
  }, [currentPath, fetchFiles]);

  // 路径变化时重新获取文件
  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const currentFiles = getCurrentFiles();

  return {
    // 状态
    currentPath,
    files: currentFiles,
    loading,
    uploading,

    // 操作
    setCurrentPath,
    uploadFiles,
    deleteFile,
    createFolder,
    refreshFiles: fetchFiles,
  };
} 