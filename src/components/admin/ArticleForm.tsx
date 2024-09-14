import React from 'react';
import { Form, Input, Button } from 'antd'; // 假设你使用 Ant Design
import { Article } from '../../types/article'; // 导入 Article 类型

interface ArticleFormProps {
  initialValues?: Article;
  onSubmit: (values: Article) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: Article) => {
    onSubmit(values);
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="内容" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      {/* 添加其他表单项 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ArticleForm;
