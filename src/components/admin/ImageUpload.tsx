import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  value, 
  onChange, 
  placeholder = "ex: /uploads/default_avatar.png" 
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = `/uploads/${file.name}`;
        resolve(mockUrl);
      }, 1500);
    });
  };

  const handleFileUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        try {
          const uploadedUrl = await simulateUpload(file);
          onChange(uploadedUrl);
        } catch (error) {
          console.error('上传失败:', error);
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            onChange(result);
          };
          reader.readAsDataURL(file);
        } finally {
          setIsUploading(false);
        }
      }
    };
    input.click();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const clearImage = () => {
    onChange('');
  };

  const isValidImageUrl = (url: string) => {
    return url && url !== placeholder && (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:'));
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={handleUrlChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
          placeholder={placeholder}
        />
        {isValidImageUrl(value) && (
          <button
            type="button"
            onClick={clearImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isValidImageUrl(value) && (
        <div className="w-16 h-16 border border-gray-300 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
          <img
            src={value}
            alt="预览"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              `;
            }}
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleFileUpload}
        disabled={isUploading}
        className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
          isUploading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-500 hover:bg-teal-600'
        } text-white`}
      >
        {isUploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>上传中...</span>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            <span>上传文件</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ImageUpload;