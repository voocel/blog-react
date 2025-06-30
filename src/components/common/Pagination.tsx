import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-1 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="flex items-center justify-center w-8 h-8 text-gray-400">
              ...
            </span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`flex items-center justify-center w-8 h-8 rounded text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 rounded ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;