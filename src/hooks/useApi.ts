import { useState, useEffect, useCallback } from 'react';
import { PaginatedResponse } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
}

interface PaginatedParams {
  page: number;
  pageSize: number;
  search?: string;
  [key: string]: unknown;
}

export function useApi<T>(
  apiFunction: (...args: unknown[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: unknown[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiFunction(...args);
      setState({ data: result, loading: false, error: null });
      onSuccess?.(result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '请求失败';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      onError?.(errorMessage);
      throw error;
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
  };
}

// 专门用于分页数据的 Hook
export function usePaginatedApi<T>(
  apiFunction: (params: PaginatedParams) => Promise<PaginatedResponse<T>>,
  initialParams: Partial<PaginatedParams> = {}
) {
  const [params, setParams] = useState<PaginatedParams>({ page: 1, pageSize: 10, ...initialParams });
  const [state, setState] = useState<UseApiState<PaginatedResponse<T>>>({
    data: null,
    loading: false,
    error: null,
  });

  // 稳定的API调用函数
  const executeApi = useCallback(async (currentParams: PaginatedParams) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiFunction(currentParams);
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '请求失败';
      setState(prev => ({ ...prev, loading: false, error: errorMessage }));
      throw error;
    }
  }, [apiFunction]);

  const setPage = useCallback((page: number) => {
    setParams((prev: PaginatedParams) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setParams((prev: PaginatedParams) => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setParams((prev: PaginatedParams) => ({ ...prev, search, page: 1 }));
  }, []);

  const refresh = useCallback(() => {
    executeApi(params);
  }, [executeApi, params]);

  const updateParams = useCallback((newParams: Partial<PaginatedParams>) => {
    setParams((prev: PaginatedParams) => ({ ...prev, ...newParams }));
  }, []);

  // 只在参数变化时调用API
  useEffect(() => {
    executeApi(params);
  }, [executeApi, params]);

  return {
    data: state.data?.items || [],  // 空数据时返回空数组
    total: state.data?.total || 0,
    page: state.data?.page || params.page,
    pageSize: state.data?.pageSize || params.pageSize,
    totalPages: state.data?.totalPages || 0,
    loading: state.loading,
    error: state.error,
    setPage,
    setPageSize,
    setSearch,
    setParams: updateParams,
    refresh,
  };
}