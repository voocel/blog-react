import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  website: string;
  description: string;
  avatar: string;
}

interface UserEditProps {
  user: User;
  onBack: () => void;
}

const UserEdit: React.FC<UserEditProps> = ({ user, onBack }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    nickname: user.nickname || '',
    website: user.website || '',
    description: user.description || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('修改用户:', formData);
    alert('用户修改成功！');
  };

  const getAvatarColor = () => {
    const colors = [
      'bg-purple-500',
      'bg-pink-500', 
      'bg-green-500',
      'bg-indigo-500',
      'bg-gray-700',
      'bg-purple-400',
      'bg-yellow-400',
      'bg-purple-600',
      'bg-teal-500',
      'bg-pink-400'
    ];
    return colors[user.id % colors.length];
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-16px)]">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-600">修改用户</h2>
                <button 
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  返回
                </button>
              </div>
              <div className="w-full h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 rounded-lg ${getAvatarColor()} flex items-center justify-center`}>
                      <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center">
                        <div className={`w-8 h-8 ${getAvatarColor()} rounded-sm`}></div>
                      </div>
                    </div>
                  </div>

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
                      placeholder="用户名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="邮箱"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                      昵称
                    </label>
                    <input
                      type="text"
                      id="nickname"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleInputChange}
                      placeholder="昵称"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                      网站地址
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="网站地址"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      描述
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="描述"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
                    >
                      修改
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;