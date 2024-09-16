import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Upload, Switch, DatePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../../styles/ArticleForm.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { createArticle, getArticle, updateArticle } from '../../services/articles';
import { Article } from '../../types/article';
import moment from 'moment';

const { Option } = Select;

const ArticleForm: React.FC = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle(parseInt(id, 10));
    }
  }, [id]);

  const fetchArticle = async (articleId: number) => {
    setLoading(true);
    try {
      const article: Article = await getArticle(articleId);
      form.setFieldsValue({
        ...article,
        category: article.category.id,
        publishTime: article.publishTime ? moment(article.publishTime) : null,
        tags: article.tags,
        isPublished: article.published,
      });
      setContent(article.content);
    } catch (error) {
      message.error('获取文章失败');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const articleData = {
        ...values,
        content,
        category: { id: values.category },
        tags: values.tags,
        published: values.isPublished,
        publishTime: values.publishTime ? values.publishTime.format('YYYY-MM-DD HH:mm:ss') : null,
      };
      if (id) {
        await updateArticle(parseInt(id, 10), articleData);
        message.success('文章更新成功');
      } else {
        await createArticle(articleData);
        message.success('文章创建成功');
      }
      navigate('/admin/articles');
    } catch (error) {
      message.error(id ? '更新文章失败' : '创建文章失败');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = () => {
    navigate('/admin/articles');
  };

  return (
    <div className={styles.articleFormContainer}>
      <h1>{id ? '修改文章' : '创建文章'}</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <Form.Item name="category" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
          <Select placeholder="Select option">
            <Option value="category1">分类1</Option>
            <Option value="category2">分类2</Option>
          </Select>
        </Form.Item>
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="subtitle" label="副标题">
          <Input />
        </Form.Item>
        <Form.Item label="页面图像">
          <div className={styles.imageUploadGroup}>
            <Form.Item name="coverImage" noStyle>
              <Input className={styles.imageInput} placeholder="ex: /uploads/default_avatar.png" />
            </Form.Item>
            <Upload>
              <Button icon={<UploadOutlined />} className={styles.uploadButton}>上传文件</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item label="内容">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </Form.Item>
        <Form.Item name="tags" label="标签">
          <Select mode="tags" style={{ width: '100%' }} placeholder="选择标签">
            {/* 标签可以直接输入 */}
          </Select>
        </Form.Item>
        <Form.Item name="summary" label="主要描述">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="publishTime" label="发布时间">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="isPublished" label="是否发布?" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {id ? '保存' : '创建'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleForm;
