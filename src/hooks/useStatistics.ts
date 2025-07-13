import { useState, useEffect } from 'react';
import { StatisticsService } from '../services/statisticsService';

interface DashboardStats {
  users: number;
  articles: number;
  comments: number;
  visits: number;
}

export const useStatistics = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await StatisticsService.getDashboardStats();
        setStats({
          users: data.users,
          articles: data.articles,
          comments: data.comments,
          visits: data.visits
        });
      } catch (err) {
        setError('获取统计数据失败');
        console.error('Failed to fetch statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}; 