import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: any[]) => {
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
  apiFunction: (params: any) => Promise<{ items: T[]; total: number; page: number; pageSize: number; totalPages: number }>,
  initialParams: any = {}
) {
  const [params, setParams] = useState({ page: 1, pageSize: 10, ...initialParams });
  
  const { data, loading, error, execute } = useApi(
    () => apiFunction(params),
    { immediate: true }
  );

  const setPage = useCallback((page: number) => {
    setParams(prev => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setParams(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setParams(prev => ({ ...prev, search, page: 1 }));
  }, []);

  const refresh = useCallback(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    execute();
  }, [params, execute]);

  return {
    data: data?.items || [],
    total: data?.total || 0,
    page: data?.page || 1,
    pageSize: data?.pageSize || 10,
    totalPages: data?.totalPages || 0,
    loading,
    error,
    setPage,
    setPageSize,
    setSearch,
    setParams,
    refresh,
  };
}