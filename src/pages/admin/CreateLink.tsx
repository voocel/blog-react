import React from 'react';
import { Form, Input, Button, Switch, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import { createLink } from '../../services/links';
import styles from '../../styles/CreateLink.module.css';

interface ContextType {
  collapsed: boolean;
  toggle: () => void;
}

const CreateLink: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { collapsed, toggle } = useOutletContext<ContextType>();

  const onFinish = async (values: any) => {
    try {
      await createLink(values);
      message.success('友链创建成功');
      navigate('/admin/links');
    } catch (error) {
      message.error('创建友链失败');
    }
  };

  const handleReturn = () => {
    navigate('/admin/links');
  };

  return (
    <div className={styles.createLinkContainer}>
      <AdminPageHeader title="创建友链" collapsed={collapsed} toggle={toggle} />
      <div className={styles.content}>
        <div className={styles.header}>
          <Button onClick={handleReturn}>返回</Button>
        </div>
        <div className={styles.formWrapper}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className={styles.form}
          >
            <Form.Item
              name="name"
              label="链接名"
              rules={[{ required: true, message: '请输入链接名' }]}
            >
              <Input placeholder="链接名" />
            </Form.Item>
            <Form.Item
              name="url"
              label="链接"
              rules={[{ required: true, message: '请输入链接' }]}
            >
              <Input placeholder="链接" />
            </Form.Item>
            <Form.Item name="image" label="图像">
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload" // 替换为实际的上传 API
                beforeUpload={(file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  if (!isJpgOrPng) {
                    message.error('只能上传 JPG/PNG 文件!');
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    message.error('图片必须小于 2MB!');
                  }
                  return isJpgOrPng && isLt2M;
                }}
                onChange={(info) => {
                  if (info.file.status === 'done') {
                    form.setFieldsValue({ image: info.file.response.url });
                  }
                }}
              >
                {form.getFieldValue('image') ? (
                  <img src={form.getFieldValue('image')} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item name="isActive" label="是否开启" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
