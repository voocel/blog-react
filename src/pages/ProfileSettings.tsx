import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Settings, Check } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuthStore } from '../stores/authStore';
import { useAuth } from '../hooks/useAuth';

// 成功提示组件
const SuccessToast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4" />
        </div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { updateProfile, changePassword } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'account'>('profile');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || '');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || 'voocel',
    email: user?.email || 'admin@163.com',
    nickname: user?.nickname || '',
    website: user?.website || '',
    weiboName: '',
    weiboUrl: '',
    github: '',
    description: user?.description || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [accountBindings, setAccountBindings] = useState({
    github: false,
    weibo: false,
    qq: false,
    wechat: false
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理头像点击上传
  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploadingAvatar(true);
        try {
          // 模拟上传过程
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // 创建本地预览URL
          const newAvatarUrl = URL.createObjectURL(file);
          setCurrentAvatar(newAvatarUrl);
          
          setSuccessMessage('头像上传成功！');
          setShowSuccessToast(true);
        } catch (error) {
          console.error('头像上传失败:', error);
        } finally {
          setIsUploadingAvatar(false);
        }
      }
    };
    input.click();
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await updateProfile({
      ...profileData,
      avatar: currentAvatar
    });
    if (result.success) {
      setSuccessMessage('资料更新成功！');
      setShowSuccessToast(true);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('新密码和确认密码不一致');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('密码长度至少6位');
      return;
    }
    
    const result = await changePassword({
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword
    });
    
    if (result.success) {
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccessMessage('密码更新成功！');
      setShowSuccessToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex">
            {/* Left Sidebar */}
            <div className="w-64 bg-white rounded-lg shadow-sm p-6 mr-8 h-fit" style={{ backgroundColor: '#597289' }}>
              <h3 className="text-gray-300 font-medium mb-4">个人设置</h3>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>基本设置</span>
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-colors ${
                    activeTab === 'password'
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>密码设置</span>
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-colors ${
                    activeTab === 'account'
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>账号绑定</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <form onSubmit={handleProfileSubmit} className="max-w-2xl mx-auto space-y-6">
                    {/* 头像部分 - 点击上传 */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative">
                        <div 
                          className="avatar-container cursor-pointer mb-4 relative group"
                          onClick={handleAvatarClick}
                        >
                          <img 
                            src={currentAvatar} 
                            alt={user.username}
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 avatar-image transition-all duration-300 group-hover:opacity-80"
                          />
                          
                          {/* 上传状态覆盖层 */}
                          {isUploadingAvatar && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                          
                          {/* 悬停提示 */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-300">
                            <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              点击更换头像
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 表单字段 */}
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right">
                        用户名
                      </label>
                      <div className="col-span-9">
                        <input
                          type="text"
                          name="username"
                          value={profileData.username}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right">
                        邮箱地址
                      </label>
                      <div className="col-span-9">
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right">
                        昵称
                      </label>
                      <div className="col-span-9">
                        <input
                          type="text"
                          name="nickname"
                          value={profileData.nickname}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right">
                        网站
                      </label>
                      <div className="col-span-9">
                        <input
                          type="url"
                          name="website"
                          value={profileData.website}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right">
                        微博名
                      </label>
                      <div className="col-span-9">
                        <input
                          type="text"
                          name="weiboName"
                          value={profileData.weiboName}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right">
                        微博主页
                      </label>
                      <div className="col-span-9">
                        <input
                          type="url"
                          name="weiboUrl"
                          value={profileData.weiboUrl}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right">
                        GitHub
                      </label>
                      <div className="col-span-9">
                        <input
                          type="text"
                          name="github"
                          value={profileData.github}
                          onChange={handleProfileChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-start">
                      <label className="col-span-3 text-sm font-medium text-gray-700 text-right pt-2">
                        个人简微
                      </label>
                      <div className="col-span-9">
                        <textarea
                          name="description"
                          value={profileData.description}
                          onChange={handleProfileChange}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          placeholder="介绍一下自己..."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-3"></div>
                      <div className="col-span-9">
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
                        >
                          更新资料
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'password' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <form onSubmit={handlePasswordSubmit} className="max-w-md mx-auto space-y-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">修改密码</h3>
                    
                    <div>
                      <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        当前密码
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        新密码
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        确认新密码
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        更新密码
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg font-medium text-gray-900 mb-6 text-center">账号绑定</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">G</span>
                          </div>
                          <span className="font-medium">GitHub</span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            accountBindings.github
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                          onClick={() => setAccountBindings(prev => ({ ...prev, github: !prev.github }))}
                        >
                          {accountBindings.github ? '解绑' : '绑定'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">微</span>
                          </div>
                          <span className="font-medium">微博</span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            accountBindings.weibo
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                          onClick={() => setAccountBindings(prev => ({ ...prev, weibo: !prev.weibo }))}
                        >
                          {accountBindings.weibo ? '解绑' : '绑定'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">Q</span>
                          </div>
                          <span className="font-medium">QQ</span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            accountBindings.qq
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                          onClick={() => setAccountBindings(prev => ({ ...prev, qq: !prev.qq }))}
                        >
                          {accountBindings.qq ? '解绑' : '绑定'}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                            <span className="text-white text-sm font-bold">微</span>
                          </div>
                          <span className="font-medium">微信</span>
                        </div>
                        <button
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            accountBindings.wechat
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                          onClick={() => setAccountBindings(prev => ({ ...prev, wechat: !prev.wechat }))}
                        >
                          {accountBindings.wechat ? '解绑' : '绑定'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* 成功提示 */}
      {showSuccessToast && (
        <SuccessToast 
          message={successMessage} 
          onClose={() => setShowSuccessToast(false)} 
        />
      )}
    </div>
  );
};

export default ProfileSettings;