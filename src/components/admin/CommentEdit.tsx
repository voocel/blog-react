import React, { useState } from 'react';
import MarkdownEditor from '../common/MarkdownEditor';

interface Comment {
  id: number;
  username: string;
  commentType: string;
  commentTitle: string;
  createdAt: string;
  content?: string;
}

interface CommentEditProps {
  comment: Comment;
  onBack: () => void;
}

const CommentEdit: React.FC<CommentEditProps> = ({ comment, onBack }) => {
  const [formData, setFormData] = useState({
    title: comment.commentTitle || '斗地主是否与外观实际服务器?',
    content: comment.content || '因为试验服务器有点卡'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('修改评论:', formData);
    alert('评论修改成功！');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-16px)]">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-600">修改评论</h2>
                <button 
                  onClick={onBack}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  返回
                </button>
              </div>
              <div className="w-full h-px bg-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
              {/* 标题 - 居中显示 */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-medium text-gray-900 mb-4">
                  {formData.title}
                </h1>
                <div className="text-sm text-gray-600">
                  讨论
                </div>
              </div>

              {/* 内容编辑器 */}
              <MarkdownEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="请输入评论内容..."
              />

              {/* 提交按钮 - 居中 */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-slate-600 text-white px-8 py-3 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 shadow-sm font-medium"
                >
                  修改
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentEdit;