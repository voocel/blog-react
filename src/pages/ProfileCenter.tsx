import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuthStore } from '../stores/authStore';

const ProfileCenter: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  if (!user) {
    navigate('/login');
    return null;
  }

  const userStats = {
    articles: 0,
    discussions: 0,
    followers: 1
  };

  const recentDiscussions = [
    {
      id: 1,
      title: '斗地主是否与外观实际服务器?',
      content: '因为试验服务器有点卡',
      timeAgo: '1年前'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Profile Header */}
      <div style={{ backgroundColor: '#597289' }} className="text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-8">
              <div className="avatar-container">
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg flex-shrink-0 avatar-image"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-normal mb-2">{user.username}</h1>
                <p className="text-slate-300 mb-4">Nothing in here...</p>
                <button 
                  onClick={() => navigate('/settings')}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  编辑资料
                </button>
              </div>
              
              <div className="flex space-x-12">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{userStats.articles}</div>
                  <div className="text-green-400 text-sm font-medium">文章数</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{userStats.discussions}</div>
                  <div className="text-green-400 text-sm font-medium">讨论数</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{userStats.followers}</div>
                  <div className="text-green-400 text-sm font-medium">关注者</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">最近的讨论</h3>
              </div>
              <div className="p-6">
                {recentDiscussions.length > 0 ? (
                  <div className="space-y-4">
                    {recentDiscussions.map((discussion) => (
                      <div key={discussion.id}>
                        <h4 className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium mb-2">
                          {discussion.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">{discussion.content}</p>
                        <span className="text-xs text-gray-500">{discussion.timeAgo}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nothing in here...</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">最近的讨论</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-center py-8">Nothing in here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfileCenter;