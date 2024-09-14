import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message, Upload, Switch, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticle, updateArticle, createArticle } from '../../services/articles';
import { getCategories } from '../../services/categories';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import { Article, ArticleFormValues } from '../../types/article';
import { Category } from '../../types/category';
import styles from '../../styles/EditArticle.module.css';

const { Option } = Select;

const EditArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const articleId = parseInt(id);
          const [articleData, categoriesData] = await Promise.all([
            getArticle(articleId),
            getCategories()
          ]);

          form.setFieldsValue({
            title: articleData.title,
            content: articleData.content,
            categoryId: articleData.category.id,
            // ... 其他字段
          });
          setCategories(categoriesData.data);
        } else {
          const categoriesData = await getCategories();
          setCategories(categoriesData.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        message.error('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (id) {
        await updateArticle(parseInt(id), {
          ...values,
          categoryId: values.categoryId, // 确保这里使用 categoryId
        });
        message.success('文章更新成功');
      } else {
        await createArticle({
          ...values,
          categoryId: values.categoryId, // 确保这里使用 categoryId
        });
        message.success('文章创建成功');
      }
      navigate('/admin/articles');
    } catch (error) {
      console.error('Failed to save article:', error);
      message.error('保存文章失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editArticleContainer}>
      <h1>编辑文章</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入文章标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="内容" rules={[{ required: true, message: '请输入文章内容' }]}>
          <ReactQuill theme="snow" />
        </Form.Item>
        <Form.Item name="categoryId" label="分类" rules={[{ required: true, message: '请选择文章分类' }]}>
          <Select>
            {categories.map(category => (
              <Option key={category.id} value={category.id}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="tags" label="标签">
          <Select mode="tags" style={{ width: '100%' }} placeholder="输入标签">
            {/* 可以从后端获取标签列表 */}
          </Select>
        </Form.Item>
        <Form.Item name="coverImage" label="封面图片">
          <Upload>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="published" label="是否发布" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="publishTime" label="发布时间">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            更新
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditArticle;
