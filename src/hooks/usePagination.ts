import { useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10
}: UsePaginationProps = {}): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  return {
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize
  };
};

// 如果你想使用默认导出，可以这样写：
// export default usePagination;
