import React, { useState } from 'react';
import ImageUpload from '../common/ImageUpload';

interface FriendLink {
  id: number;
  name: string;
  url: string;
  logo: string;
  isActive: boolean;
  createdAt: string;
  description?: string;
}

interface FriendLinkEditProps {
  friendLink: FriendLink;
  onBack: () => void;
}

const FriendLinkEdit: React.FC<FriendLinkEditProps> = ({ friendLink, onBack }) => {
  const [formData, setFormData] = useState({
    name: friendLink.name || 'google',
    url: friendLink.url || 'https://google.com',
    logo: friendLink.logo || 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    isActive: friendLink.isActive
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      logo: imageUrl
    }));
  };

  const handleToggleChange = () => {
    setFormData(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('修改友链:', formData);
    alert('友链修改成功！');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-16px)]">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium text-gray-600">修改友链</h2>
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
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      链接名
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="链接名"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                      链接
                    </label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      placeholder="链接"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      图像
                    </label>
                    <ImageUpload
                      value={formData.logo}
                      onChange={handleImageChange}
                      placeholder="点击或拖拽上传友链图标"
                      previewSize="md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      是否开启
                    </label>
                    <button
                      type="button"
                      onClick={handleToggleChange}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        formData.isActive ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
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

export default FriendLinkEdit;