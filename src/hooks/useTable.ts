import { useState, useMemo } from 'react';

interface UseTableProps<T> {
  data: T[];
  pageSize?: number;
  searchFields?: (keyof T)[];
}

interface UseTableReturn<T> {
  currentData: T[];
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function useTable<T>({
  data,
  pageSize = 10,
  searchFields = []
}: UseTableProps<T>): UseTableReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm || searchFields.length === 0) {
      return data;
    }

    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, searchFields]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // 当搜索时重置到第一页
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return {
    currentData,
    currentPage,
    totalPages,
    searchTerm,
    setCurrentPage,
    setSearchTerm,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage
  };
}