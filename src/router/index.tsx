import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useAnalytics } from '../hooks/useAnalytics';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorBoundary from '../components/ui/ErrorBoundary';

// 懒加载页面组件
const Homepage = React.lazy(() => import('../pages/Homepage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const RegisterPage = React.lazy(() => import('../pages/RegisterPage'));
const ArticleDetail = React.lazy(() => import('../pages/ArticleDetail'));
const ProfileCenter = React.lazy(() => import('../pages/ProfileCenter'));
const ProfileSettings = React.lazy(() => import('../pages/ProfileSettings'));
const AdminDashboard = React.lazy(() => import('../pages/AdminDashboard'));
const ArticleList = React.lazy(() => import('../pages/ArticleList'));
const DiscussionList = React.lazy(() => import('../pages/DiscussionList'));
const DiscussionDetail = React.lazy(() => import('../pages/DiscussionDetail'));

// 路由守卫组件
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// 管理员路由守卫
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn, user } = useAuthStore();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// 公共路由守卫（已登录用户不能访问）
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// 加载组件
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// 路由内容组件
const RouterContent: React.FC = () => {
  // 在 BrowserRouter 内部初始化 Google Analytics
  useAnalytics();

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* 公共路由 */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
          
          {/* 首页路由 */}
          <Route path="/" element={<Homepage />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          
          {/* 讨论路由 */}
          <Route path="/discussions" element={<DiscussionList />} />
          <Route path="/discussions/:id" element={<DiscussionDetail />} />
          
          {/* 受保护的路由 */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfileCenter />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            } 
          />
          
          {/* 管理员路由 */}
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          
          {/* 404 页面 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};