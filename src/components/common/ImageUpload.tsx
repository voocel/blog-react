import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { FileService } from '../../services/fileService';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showPreview?: boolean;
  previewSize?: 'sm' | 'md' | 'lg';
  multiple?: boolean;
  onMultipleUpload?: (files: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value = '',
  onChange,
  placeholder = "输入图片URL或点击上传",
  className = "",
  showPreview = true,
  previewSize = 'md',
  multiple = false,
  onMultipleUpload
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `文件 ${file.name} 不是支持的图片格式`;
    }
    if (file.size > maxFileSize) {
      return `文件 ${file.name} 超过10MB大小限制`;
    }
    return null;
  };

  const uploadFile = async (file: File): Promise<string> => {
    const { url } = await FileService.uploadFile(file, 'images');
    return url;
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    if (validFiles.length === 0) return;

    setError('');
    setUploading(true);

    try {
      if (multiple && onMultipleUpload) {
        // 多文件上传
        const uploadPromises = validFiles.map(file => uploadFile(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        onMultipleUpload(uploadedUrls);
      } else {
        // 单文件上传
        const uploadedUrl = await uploadFile(validFiles[0]);
        onChange(uploadedUrl);
      }
    } catch (error) {
      setError('上传失败，请重试');
    } finally {
      setUploading(false);
    }
  }, [multiple, onMultipleUpload, onChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onChange('');
    setError('');
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setError('');
  };

  const getPreviewSize = () => {
    switch (previewSize) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-20 h-20';
      default:
        return 'w-12 h-12';
    }
  };

  const hasImage = value && value.trim() !== '';

  return (
    <div className={`space-y-3 ${className}`}>
      {/* URL输入框和预览 */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={handleUrlChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={placeholder}
          />
          {hasImage && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 预览缩略图 - 更小尺寸 */}
        {showPreview && hasImage && (
          <div className={`${getPreviewSize()} rounded-md overflow-hidden border border-gray-300 bg-gray-50 flex-shrink-0`}>
            <img
              src={value}
              alt="预览"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                `;
              }}
            />
          </div>
        )}

        {/* 上传按钮 */}
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-2 ${
            uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-600'
          } text-white`}
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>上传中...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>上传图片</span>
            </>
          )}
        </button>

        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={uploading}
        />
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700 whitespace-pre-line">{error}</div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;