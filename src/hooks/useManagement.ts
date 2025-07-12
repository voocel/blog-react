import { useState, useEffect, useCallback } from 'react';
import { PaginatedResponse } from '../types/api';

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