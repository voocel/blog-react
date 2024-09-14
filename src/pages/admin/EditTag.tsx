import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getTag, updateTag } from '../../services/tags';
import styles from '../../styles/EditTag.module.css';

const { TextArea } = Input;

const EditTag: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTag = async () => {
      if (!id) {
        message.error('无效的标签 ID');
        setLoading(false);
        return;
      }

      try {
        const tagId = parseInt(id);
        if (isNaN(tagId)) {
          message.error('无效的标签 ID');
          setLoading(false);
          return;
        }

        const tag = await getTag(tagId);
        form.setFieldsValue(tag);
        setLoading(false);
      } catch (error) {
        message.error('获取标签信息失败');
        setLoading(false);
      }
    };

    fetchTag();
  }, [id, form]);

  const onFinish = async (values: any) => {
    if (!id) {
      message.error('无效的标签 ID');
      return;
    }

    try {
      const tagId = parseInt(id);
      if (isNaN(tagId)) {
        message.error('无效的标签 ID');
        return;
      }

      await updateTag(tagId, values);
      message.success('标签修改成功');
      navigate('/admin/tags');
    } catch (error) {
      message.error('修改标签失败');
    }
  };

  return (
    <div className={styles.editTagContainer}>
      <h1>编辑标签</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="标签名称"
          rules={[{ required: true, message: '请输入标签名称' }]}
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

export default EditTag;
