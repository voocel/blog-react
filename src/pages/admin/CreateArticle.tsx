import React, { useState } from 'react';
import { Form, Input, Select, Upload, Button, Switch, DatePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createArticle } from '../../services/articles';
import styles from '../../styles/CreateArticle.module.css';

const { Option } = Select;
const { TextArea } = Input;

const CreateArticle: React.FC = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');

  const onFinish = async (values: any) => {
    const articleData = {
      ...values,
      content,
    };
    try {
      await createArticle(articleData);
      message.success('文章创建成功');
      form.resetFields();
      setContent('');
    } catch (error) {
      message.error('文章创建失败');
    }
  };

  return (
    <div className={styles.createArticle}>
      <h1>创建文章</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="category" label="分类" rules={[{ required: true }]}>
          <Select placeholder="选择分类">
            <Option value="technology">技术</Option>
            <Option value="lifestyle">生活</Option>
            <Option value="other">其他</Option>
          </Select>
        </Form.Item>

        <Form.Item name="title" label="标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="subtitle" label="副标题">
          <Input />
        </Form.Item>

        <Form.Item name="coverImage" label="页面图像">
          <Upload>
            <Button icon={<UploadOutlined />}>上传文件</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="内容" required>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </Form.Item>

        <Form.Item name="tags" label="标签">
          <Select mode="tags" placeholder="选择或创建标签">
            <Option value="react">React</Option>
            <Option value="javascript">JavaScript</Option>
            <Option value="typescript">TypeScript</Option>
          </Select>
        </Form.Item>

        <Form.Item name="description" label="主要描述">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="publishDate" label="发布时间">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item name="isTop" label="是否置顶" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="isOriginal" label="是否原创" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateArticle;
