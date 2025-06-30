import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '../utils/analytics';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // 初始化 Google Analytics
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (trackingId && typeof window !== 'undefined') {
      initGA(trackingId);
    }
  }, []);

  useEffect(() => {
    // 跟踪页面浏览
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (trackingId && typeof window !== 'undefined') {
      // 延迟一点时间确保页面标题已更新
      setTimeout(() => {
        trackPageView(location.pathname + location.search);
      }, 100);
    }
  }, [location]);

  return {
    trackPageView,
  };
};

// 页面停留时间跟踪
export const usePageEngagement = () => {
  useEffect(() => {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const engagementTime = Date.now() - startTime;
      // 只有停留时间超过5秒才记录
      if (engagementTime > 5000) {
        import('../utils/analytics').then(({ trackEngagement }) => {
          trackEngagement(engagementTime, document.title);
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // 组件卸载时也记录停留时间
      const engagementTime = Date.now() - startTime;
      if (engagementTime > 5000) {
        import('../utils/analytics').then(({ trackEngagement }) => {
          trackEngagement(engagementTime, document.title);
        });
      }
    };
  }, []);
};