import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input, Upload } from 'antd';
import { DeleteOutlined, FolderAddOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { getFiles, deleteFile, createFolder, uploadFile } from '../../services/files';
import { File } from '../../types/file';
import styles from '../../styles/FileManagement.module.css';

const { Dragger } = Upload;

const FileManagement: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [folderForm] = Form.useForm();
  const [uploadForm] = Form.useForm();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      message.error('获取文件列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFile(id);
      message.success('文件删除成功');
      fetchFiles();
    } catch (error) {
      message.error('文件删除失败');
    }
  };

  const showFolderModal = () => {
    setIsFolderModalVisible(true);
  };

  const handleFolderOk = async () => {
    try {
      const values = await folderForm.validateFields();
      await createFolder(values.folderName);
      setIsFolderModalVisible(false);
      folderForm.resetFields();
      message.success('文件夹创建成功');
      fetchFiles();
    } catch (error) {
      message.error('文件夹创建失败');
    }
  };

  const handleFolderCancel = () => {
    setIsFolderModalVisible(false);
    folderForm.resetFields();
  };

  const showUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleUploadOk = async () => {
    try {
      const values = await uploadForm.validateFields();
      if (values.file && values.file.fileList && values.file.fileList.length > 0) {
        const formData = new FormData();
        formData.append('file', values.file.fileList[0].originFileObj);
        formData.append('fileName', values.fileName);
        await uploadFile(formData);
        setIsUploadModalVisible(false);
        uploadForm.resetFields();
        message.success('文件上传成功');
        fetchFiles();
      } else {
        message.error('请选择要上传的文件');
      }
    } catch (error) {
      message.error('文件上传失败');
    }
  };

  const handleUploadCancel = () => {
    setIsUploadModalVisible(false);
    uploadForm.resetFields();
  };

  const columns = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: File) => (
        <span>
          {record.type === 'folder' ? '📁 ' : '📄 '}
          {text}
        </span>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '日期',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => text ? new Date(text).toLocaleString() : '-',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      render: (text: number) => text ? `${(text / 1024).toFixed(2)} KB` : '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: File) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div className={styles.fileManagement}>
      <div className={styles.header}>
        <h1>文件列表</h1>
        <div>
          <Button
            type="primary"
            icon={<FolderAddOutlined />}
            onClick={showFolderModal}
            style={{ marginRight: 8 }}
          >
            创建文件夹
          </Button>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={showUploadModal}
          >
            上传图片
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={files}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title="创建文件夹"
        visible={isFolderModalVisible}
        onOk={handleFolderOk}
        onCancel={handleFolderCancel}
      >
        <Form form={folderForm} layout="vertical">
          <Form.Item
            name="folderName"
            label="文件夹名"
            rules={[{ required: true, message: '请输入文件夹名' }]}
          >
            <Input placeholder="请输入文件夹名" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="上传文件"
        visible={isUploadModalVisible}
        onOk={handleUploadOk}
        onCancel={handleUploadCancel}
      >
        <Form form={uploadForm} layout="vertical">
          <Form.Item
            name="fileName"
            label="文件名"
            rules={[{ required: true, message: '请输入文件名' }]}
          >
            <Input placeholder="请输入文件名" />
          </Form.Item>
          <Form.Item
            name="file"
            label="上传图片"
            rules={[{ required: true, message: '请选择要上传的文件' }]}
          >
            <Dragger accept="image/*" multiple={false}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FileManagement;
