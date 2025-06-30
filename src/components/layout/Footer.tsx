import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleGithubClick = () => {
    window.open('https://github.com/voocel', '_blank');
  };

  return (
    <footer style={{ backgroundColor: '#52697f' }} className="text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mb-4">
            <Home 
              className="w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors" 
              onClick={handleHomeClick}
            />
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
            版权所有 © 版权归voocel.com2022007314号-1
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;