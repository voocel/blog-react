import React, { useState } from 'react';
import { Folder, File, Eye, Trash2, X, Image, FileText, Archive, Music, Video, Upload, FolderPlus } from 'lucide-react';
import ConfirmDialog from '../ui/ConfirmDialog';
import ImageUploadModal from './ImageUploadModal';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  mimeType?: string;
  createdAt?: string;
  path: string;
  url?: string;
}

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (folderName: string) => void;
}

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [folderName, setFolderName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (folderName.trim()) {
      onConfirm(folderName.trim());
      setFolderName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">创建文件夹</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            文件夹名
          </label>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="文件夹名"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ isOpen, onClose, imageUrl, imageName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">{imageName}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <img 
          src={imageUrl} 
          alt={imageName}
          className="max-w-full max-h-[70vh] object-contain mx-auto"
        />
      </div>
    </div>
  );
};

const FileManagement: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('root');
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    file: FileItem | null;
  }>({
    isOpen: false,
    file: null
  });
  const [previewImage, setPreviewImage] = useState<{
    isOpen: boolean;
    url: string;
    name: string;
  }>({
    isOpen: false,
    url: '',
    name: ''
  });

  const [files, setFiles] = useState<FileItem[]>([]);

  const getCurrentFiles = () => {
    return files.filter(file => file.path === currentPath);
  };

  const handleFolderClick = (folderName: string) => {
    setCurrentPath(currentPath === 'root' ? `root/${folderName}` : `${currentPath}/${folderName}`);
  };

  const handlePathClick = (pathIndex: number) => {
    const pathParts = currentPath.split('/');
    const newPath = pathParts.slice(0, pathIndex + 1).join('/');
    setCurrentPath(newPath);
  };

  const handleCreateFolder = (folderName: string) => {
    const newFolder: FileItem = {
      id: Date.now().toString(),
      name: folderName,
      type: 'folder',
      path: currentPath
    };
    setFiles([...files, newFolder]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageUpload = (uploadedFiles: File[]) => {
    const newFiles: FileItem[] = uploadedFiles.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: 'file' as const,
      mimeType: file.type,
      size: formatFileSize(file.size),
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      path: currentPath
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDeleteClick = (file: FileItem) => {
    setDeleteDialog({
      isOpen: true,
      file: file
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.file) {
      setFiles(files.filter(file => file.id !== deleteDialog.file!.id));
      setDeleteDialog({ isOpen: false, file: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, file: null });
  };

  const handleImagePreview = (file: FileItem) => {
    const imageUrl = file.url || file.path;
    setPreviewImage({
      isOpen: true,
      url: imageUrl,
      name: file.name
    });
  };

  const isImageFile = (file: FileItem) => {
    return file.mimeType?.startsWith('image/');
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return <Folder className="w-4 h-4 text-blue-500" />;
    }

    if (!file.mimeType) {
      return <File className="w-4 h-4 text-gray-500" />;
    }

    // 根据文件类型返回对应图标
    if (file.mimeType.startsWith('image/')) {
      return <Image className="w-4 h-4 text-green-500" />;
    } else if (file.mimeType.startsWith('video/')) {
      return <Video className="w-4 h-4 text-purple-500" />;
    } else if (file.mimeType.startsWith('audio/')) {
      return <Music className="w-4 h-4 text-orange-500" />;
    } else if (file.mimeType.includes('pdf')) {
      return <FileText className="w-4 h-4 text-red-500" />;
    } else if (file.mimeType.includes('zip') || file.mimeType.includes('rar') || file.mimeType.includes('archive')) {
      return <Archive className="w-4 h-4 text-yellow-500" />;
    } else {
      return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPathBreadcrumbs = () => {
    const parts = currentPath.split('/');
    return parts;
  };

  const currentFiles = getCurrentFiles();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-medium text-gray-900">文件列表</h2>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            {getPathBreadcrumbs().map((part, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>/</span>}
                <button
                  onClick={() => handlePathClick(index)}
                  className={`hover:text-blue-600 transition-colors ${
                    index === 0 ? 'text-gray-800 font-medium' : 'text-gray-600'
                  }`}
                >
                  {part}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowCreateFolderModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <FolderPlus className="w-4 h-4" />
            <span>创建文件夹</span>
          </button>
          <button 
            onClick={() => setShowUploadImageModal(true)}
            className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>上传图片</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名字</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentFiles.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getFileIcon(file)}
                    <span 
                      className={`text-sm ml-2 ${file.type === 'folder' ? 'text-blue-600 cursor-pointer hover:text-blue-800' : 'text-gray-900'}`}
                      onClick={() => file.type === 'folder' && handleFolderClick(file.name)}
                    >
                      {file.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {file.type === 'folder' ? '-' : file.mimeType || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {file.createdAt || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {file.size || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    {file.type === 'file' && isImageFile(file) && (
                      <button 
                        onClick={() => handleImagePreview(file)}
                        className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteClick(file)}
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentFiles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          当前目录为空
        </div>
      )}

      {/* Modals */}
      <CreateFolderModal
        isOpen={showCreateFolderModal}
        onClose={() => setShowCreateFolderModal(false)}
        onConfirm={handleCreateFolder}
      />

      <ImageUploadModal
        isOpen={showUploadImageModal}
        onClose={() => setShowUploadImageModal(false)}
        onUpload={handleImageUpload}
        currentPath={currentPath}
      />

      <ImagePreviewModal
        isOpen={previewImage.isOpen}
        onClose={() => setPreviewImage({ isOpen: false, url: '', name: '' })}
        imageUrl={previewImage.url}
        imageName={previewImage.name}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title={`删除${deleteDialog.file?.type === 'folder' ? '文件夹' : '文件'}`}
        message={`确定要删除${deleteDialog.file?.type === 'folder' ? '文件夹' : '文件'} "${deleteDialog.file?.name}" 吗？此操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        type="danger"
      />
    </div>
  );
};

export default FileManagement;