import { useCallback } from 'react';
import { ArticleService } from '../services/articleService';
import { useApi, usePaginatedApi } from './useApi';

// 获取文章列表的hook
export const useArticles = (params?: any) => {
  const apiFunction = useCallback(
    (queryParams: any) => ArticleService.getArticles(queryParams),
    []
  );
  
  return usePaginatedApi(apiFunction, params);
};

// 获取单个文章的hook
export const useArticle = (id: string) => {
  const apiFunction = useCallback(
    () => ArticleService.getArticle(parseInt(id)),
    [id]
  );
  
  return useApi(apiFunction, { immediate: !!id && !isNaN(parseInt(id)) });
};

// 获取热门文章的hook
export const usePopularArticles = (limit = 10) => {
  const apiFunction = useCallback(
    () => ArticleService.getPopularArticles(limit),
    [limit]
  );
  
  return useApi(apiFunction, { immediate: true });
};

// 获取相关文章的hook
export const useRelatedArticles = (articleId: string, limit = 5) => {
  const apiFunction = useCallback(
    () => ArticleService.getRelatedArticles(parseInt(articleId), limit),
    [articleId, limit]
  );
  
  return useApi(apiFunction, { immediate: !!articleId && !isNaN(parseInt(articleId)) });
}; 