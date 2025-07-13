import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Clock, MessageCircle, Tag } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/layout/HeroSection';
import Pagination from '../components/common/Pagination';
import { formatUsername } from '../utils/apiHelpers';

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: string;
  avatar: string;
  timeAgo: string;
  replyCount: number;
  tags: string[];
}

const DiscussionList: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const discussions: Discussion[] = [
    {
      id: 2,
      title: '斗地主是否与外观实际服务器?',
      content: '因为试验服务器有点卡',
      author: 'Faye',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      timeAgo: '2年前',
      replyCount: 2,
      tags: ['游戏', '服务器']
    },
    {
      id: 1,
      title: 'Modular kitchen Chennai',
      content: 'http://blueprintfordesigns.com/modular-kitchen-design-chennai.html',
      author: 'Ezhil',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
      timeAgo: '7年前',
      replyCount: 0,
      tags: ['cURL', '设计']
    }
  ];

  const totalPages = 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiscussionClick = (id: number) => {
    navigate(`/discussions/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section style={{ backgroundColor: '#597289' }} className="text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-normal mb-2">问题讨论</h2>
            <p className="text-slate-300">欢迎，提出各种问题</p>
          </div>
        </div>
      </section>

      {/* Discussion List */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div 
                key={discussion.id}
                onClick={() => handleDiscussionClick(discussion.id)}
                className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <img 
                    src={discussion.avatar} 
                    alt={discussion.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors">
                        {discussion.title}
                      </h3>
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        {discussion.replyCount}
                      </span>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                      {discussion.content}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex items-center space-x-2 mb-3">
                      {discussion.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span className="username">{formatUsername(discussion.author)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{discussion.timeAgo}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{discussion.replyCount} 回复</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DiscussionList;