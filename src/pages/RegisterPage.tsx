import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Github, Twitter } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 验证密码
    if (formData.password !== formData.confirmPassword) {
      setError('密码不一致');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少6位');
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/', { replace: true });
      } else {
        setError(result.error || '注册失败');
      }
    } catch (err) {
      setError('注册失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubClick = () => {
    window.open('https://github.com/voocel', '_blank');
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
                className="text-lg font-normal hover:text-gray-200 transition-colors"
              >
                voocel
              </Link>
              <nav className="flex space-x-6 text-sm">
                <Link to="/" className="hover:text-gray-200 transition-colors">文章</Link>
                <a href="#" className="hover:text-gray-200 transition-colors">讨论</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="hover:text-gray-200 transition-colors">搜索</a>
              <Link 
                to="/login"
                className="hover:text-gray-200 transition-colors"
              >
                登录
              </Link>
              <Link 
                to="/register"
                className="hover:text-gray-200 transition-colors"
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
          <h2 className="text-xl font-medium text-center text-gray-900 mb-8">注册</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 错误提示 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* 用户名 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                用户名
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="请输入用户名"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

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
                placeholder="请输入密码（至少6位）"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* 确认密码 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                确认密码
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="请再次输入密码"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={isLoading}
              />
            </div>

            {/* 注册按钮 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ backgroundColor: '#52697f' }}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  注册中...
                </>
              ) : (
                '注册'
              )}
            </button>

            {/* 已有账号 */}
            <div className="text-center">
              <span className="text-sm text-gray-600">您已经有账号? </span>
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                点击此处
              </Link>
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

export default RegisterPage;