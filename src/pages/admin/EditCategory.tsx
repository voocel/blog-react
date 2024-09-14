import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategory, updateCategory } from '../../services/categories';
import styles from '../../styles/EditCategory.module.css';

const { TextArea } = Input;

const EditCategory: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        message.error('无效的分类 ID');
        setLoading(false);
        return;
      }

      try {
        const categoryId = parseInt(id);
        if (isNaN(categoryId)) {
          message.error('无效的分类 ID');
          setLoading(false);
          return;
        }

        const category = await getCategory(categoryId);
        form.setFieldsValue(category);
        setLoading(false);
      } catch (error) {
        message.error('获取分类信息失败');
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, form]);

  const onFinish = async (values: any) => {
    if (!id) {
      message.error('无效的分类 ID');
      return;
    }

    try {
      const categoryId = parseInt(id);
      if (isNaN(categoryId)) {
        message.error('无效的分类 ID');
        return;
      }

      await updateCategory(categoryId, values);
      message.success('分类修改成功');
      navigate('/admin/categories');
    } catch (error) {
      message.error('修改分类失败');
    }
  };

  return (
    <div className={styles.editCategoryContainer}>
      <h1>编辑分类</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCategory;
