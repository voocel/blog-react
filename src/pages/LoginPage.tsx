import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Github, Twitter } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { trackUserLogin, trackEvent } from '../utils/analytics';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: 'admin@gmail.com',
    password: '123456',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData);
      
      if (result.success) {
        // 跟踪登录成功
        trackUserLogin('email');
        trackEvent('login_success', 'authentication', 'email');
        navigate('/', { replace: true });
      } else {
        setError(result.error || '登录失败');
        // 跟踪登录失败
        trackEvent('login_failed', 'authentication', result.error);
      }
    } catch (err) {
      setError('登录失败，请重试');
      trackEvent('login_error', 'authentication', 'network_error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubClick = () => {
    trackEvent('external_link_click', 'social', 'github');
    window.open('https://github.com/voocel', '_blank');
  };

  const handleQuickLogin = (email: string, password: string) => {
    trackEvent('quick_login_click', 'authentication', email);
    setFormData(prev => ({
      ...prev,
      email,
      password
    }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#52697f' }}>
      {/* Header */}
      <header className="text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link 
                to="/"
                className="text-lg font-normal text-white hover:text-gray-200 transition-colors"
              >
                voocel
              </Link>
              <nav className="flex space-x-6 text-sm">
                <Link to="/" className="text-white hover:text-gray-200 transition-colors">文章</Link>
                <a href="#" className="text-white hover:text-gray-200 transition-colors">讨论</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-white hover:text-gray-200 transition-colors">搜索</a>
              <Link 
                to="/login"
                className="text-white hover:text-gray-200 transition-colors"
              >
                登录
              </Link>
              <Link 
                to="/register"
                className="text-white hover:text-gray-200 transition-colors"
              >
                注册
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-xl font-medium text-center text-gray-900 mb-8">登录</h2>
          
          {/* 测试账号提示 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-green-800 mb-3">🎯 测试账号 (点击快速填充)</h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@gmail.com', '123456')}
                className="w-full text-left p-2 rounded bg-green-100 hover:bg-green-200 transition-colors"
              >
                <div className="text-xs text-green-700">
                  <strong>👑 管理员:</strong> admin@gmail.com / 123456
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('testuser@example.com', 'user123')}
                className="w-full text-left p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <div className="text-xs text-blue-700">
                  <strong>👤 普通用户:</strong> testuser@example.com / user123
                </div>
              </button>
            </div>
            <div className="mt-2 text-xs text-green-600">
              💡 点击上方按钮快速填充账号信息
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* 邮箱地址 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="请输入邮箱"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* 密码 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="请输入密码"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* 记住我 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                记住我
              </label>
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  登录中...
                </>
              ) : (
                '登录'
              )}
            </button>

            {/* 忘记密码 */}
            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                忘记密码?
              </a>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <Home className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
              <Github 
                className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" 
                onClick={handleGithubClick}
              />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" />
            </div>
            
            <div className="text-sm text-gray-300 mb-2">
              友情链接
            </div>
            <div className="text-xs text-gray-400">
              备案号: 闽ICP备2022007314号-1
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;