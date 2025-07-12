import React from 'react';
import { Users, Eye, FileText, MessageCircle } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const stats = {
    users: 0,
    visits: 0,
    articles: 0,
    comments: 0
  };

  return (
    <main className="p-6">
      {/* Notice Banner */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
        <div className="flex items-center justify-between">
          <p className="text-yellow-800">Notice For Everyone.</p>
          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
            NEW
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">用户数</p>
              <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs">
                +2%
              </span>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.users.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">访问数</p>
              <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs">
                +5%
              </span>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.visits.toLocaleString()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">文章数</p>
              <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs">
                +8%
              </span>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.articles}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">评论数</p>
              <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs">
                +1%
              </span>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {stats.comments}
          </div>
        </div>
      </div>

      {/* Additional Content Area */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">系统概览</h3>
        <p className="text-gray-600">
          欢迎来到管理员后台。这里您可以管理用户、文章、评论等各种内容。
        </p>
      </div>
    </main>
  );
};

export default AdminOverview;