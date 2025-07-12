import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useAuth } from '../../hooks/useAuth';
import { resolveImageUrl } from '../../utils/apiHelpers';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header style={{ backgroundColor: '#52697f' }} className="text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Left side - Brand and Nav */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/"
              className="text-lg font-normal text-white hover:text-gray-200 transition-colors"
            >
              voocel
            </Link>
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link 
                to="/" 
                className="text-white hover:text-gray-200 transition-colors"
              >
                {isLoggedIn ? '博客' : '文章'}
              </Link>
              <Link 
                to="/discussions" 
                className="text-white hover:text-gray-200 transition-colors"
              >
                讨论
              </Link>
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-200" />
              <input
                type="text"
                placeholder="搜索"
                className="bg-transparent border border-gray-400 border-opacity-30 rounded px-3 py-1 text-white placeholder-gray-300 text-sm focus:outline-none focus:border-white w-40"
              />
            </div>

            {isLoggedIn && user ? (
              // 已登录状态
              <>
                <Bell className="w-5 h-5 cursor-pointer hover:text-gray-200 transition-colors" />
                
                {/* User Avatar with dropdown */}
                <div className="relative">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer hover:bg-black hover:bg-opacity-10 rounded px-2 py-1 transition-colors"
                    onClick={toggleDropdown}
                  >
                    <span className="text-sm text-white">{user.username}</span>
                    <img 
                      src={resolveImageUrl(user.avatar)} 
                      alt="User Avatar" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    {isDropdownOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-200" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-200" />
                    )}
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div 
                      className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border border-gray-600 py-2 z-50"
                      style={{ backgroundColor: '#52697f' }}
                    >
                      <div className="px-4 py-2 border-b border-gray-600">
                        <p className="text-sm font-medium text-white">{user.username}</p>
                        <p className="text-xs text-gray-300">{user.email}</p>
                        <p className="text-xs text-gray-400">
                          {user.role === 'admin' ? '管理员' : '普通用户'}
                        </p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600 hover:bg-opacity-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        个人中心
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-600 hover:bg-opacity-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        个人设置
                      </Link>
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-600 hover:bg-opacity-50 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          面板
                        </Link>
                      )}
                      <hr className="my-1 border-gray-600" />
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 hover:bg-opacity-50 transition-colors"
                      >
                        退出
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // 未登录状态
              <>
                <Link 
                  to="/login"
                  className="text-sm text-white hover:text-gray-200 transition-colors"
                >
                  登录
                </Link>
                <Link 
                  to="/register"
                  className="text-sm text-white hover:text-gray-200 transition-colors"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;