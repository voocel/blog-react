import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (urls: string[]) => void;
  currentPath: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpload, 
  currentPath 
}) => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const urls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Simulate upload process
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockUrl = `${currentPath}/${file.name}`;
        urls.push(mockUrl);
      }
      
      setUploadedUrls(prev => [...prev, ...urls]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmUpload = () => {
    onUpload(uploadedUrls);
    setUploadedUrls([]);
    onClose();
  };

  const handleCancel = () => {
    setUploadedUrls([]);
    onClose();
  };

  const removeUploadedFile = (index: number) => {
    setUploadedUrls(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            上传图片到 {currentPath}
          </h3>
          <button 
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">点击选择文件或拖拽文件到此处</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={isUploading}
            />
            <label
              htmlFor="file-upload"
              className={`inline-flex items-center px-4 py-2 rounded-md text-white cursor-pointer transition-colors ${
                isUploading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  上传中...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  选择文件
                </>
              )}
            </label>
          </div>
        </div>

        {uploadedUrls.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-900 mb-3">已上传的文件</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {uploadedUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={url}
                      alt={`上传的图片 ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgMTZMMTAuNTg2IDkuNDE0QTIgMiAwIDAxMTMuNDE0IDkuNDE0TDE2IDEyTTE4IDEwTDE5LjU4NiA4LjQxNEEyIDIgMCAwMTIyLjQxNCA4LjQxNEwyNCAyTTYgMjBIMThBMiAyIDAgMDAyMCAxOFY2QTIgMiAwIDAwMTggNEg2QTIgMiAwIDAwNCA2VjE4QTIgMiAwIDAwNiAyMFoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  <button
                    onClick={() => removeUploadedFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <p className="mt-2 text-sm text-gray-600 truncate">
                    {url.split('/').pop()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleConfirmUpload}
            disabled={uploadedUrls.length === 0 || isUploading}
            className={`px-4 py-2 rounded-md transition-colors ${
              uploadedUrls.length === 0 || isUploading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            确认上传 ({uploadedUrls.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;