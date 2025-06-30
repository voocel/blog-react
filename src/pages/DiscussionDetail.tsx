import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Clock, MessageCircle, Tag } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const DiscussionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  // 模拟讨论数据
  const discussion = {
    id: parseInt(id || '1'),
    title: '斗地主是否与外观实际服务器?',
    content: '因为试验服务器有点卡',
    author: 'Faye',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    timeAgo: '2年前',
    tags: ['游戏', '服务器'],
    replies: [
      {
        id: 1,
        author: 'voocel',
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: '可能是网络延迟的问题，建议检查一下网络连接。',
        timeAgo: '1年前'
      },
      {
        id: 2,
        author: 'zigo',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: '我也遇到过类似的问题，重启服务器后就好了。',
        timeAgo: '1年前'
      }
    ]
  };

  const handleBackToList = () => {
    navigate('/discussions');
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      console.log('提交评论:', comment);
      setComment('');
      // 这里应该调用API提交评论
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Discussion Title */}
      <section style={{ backgroundColor: '#597289' }} className="text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={handleBackToList}
              className="text-slate-300 hover:text-white mb-4 text-sm"
            >
              ← 返回讨论列表
            </button>
            <h1 className="text-2xl font-normal mb-2">{discussion.title}</h1>
            
            <div className="flex items-center space-x-6 text-sm text-slate-300">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span className="username">{discussion.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                {discussion.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{discussion.timeAgo}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4" />
                <span>{discussion.replies.length} 回复</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discussion Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Original Post */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <img 
                src={discussion.avatar} 
                alt={discussion.author}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-700 username">{discussion.author}</h3>
                  <span className="text-sm text-gray-500">{discussion.timeAgo}</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-600">{discussion.content}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-6">
              回复 ({discussion.replies.length})
            </h3>
            
            <div className="space-y-6">
              {discussion.replies.map((reply) => (
                <div key={reply.id} className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-b-0">
                  <img 
                    src={reply.avatar} 
                    alt={reply.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-gray-700 username">{reply.author}</h4>
                      <span className="text-sm text-gray-500">{reply.timeAgo}</span>
                    </div>
                    <p className="text-gray-600">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-lg font-medium text-gray-700 mb-6">添加回复</h3>
            
            <div className="flex space-x-4">
              <img 
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100" 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Markdown</span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  rows={4}
                  placeholder="写下你的回复..."
                />
                <div className="flex justify-end mt-3">
                  <button 
                    onClick={handleSubmitComment}
                    className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition-colors"
                  >
                    发布回复
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiscussionDetail;