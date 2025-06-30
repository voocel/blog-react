import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Quote, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Eye, 
  Table, 
  Code, 
  HelpCircle,
  EyeOff
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  showStats?: boolean;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "请输入内容...",
  minHeight = "300px",
  showStats = true
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [stats, setStats] = useState({ lines: 1, words: 0, chars: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const lines = value.split('\n').length;
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    const chars = value.length;
    setStats({ lines, words, chars });
  }, [value]);

  const insertMarkdown = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let insertText;
    if (selectedText) {
      insertText = before + selectedText + after;
    } else {
      insertText = before + (placeholder || '') + after;
    }

    const newValue = value.substring(0, start) + insertText + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      const newCursorPos = start + before.length + (selectedText || placeholder).length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const insertList = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lines = value.split('\n');
    const currentLineIndex = value.substring(0, start).split('\n').length - 1;
    
    lines[currentLineIndex] = prefix + lines[currentLineIndex];
    
    const newValue = lines.join('\n');
    onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      textarea.focus();
    }, 0);
  };

  const insertTable = () => {
    const tableMarkdown = `| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |`;
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newValue = value.substring(0, start) + tableMarkdown + value.substring(start);
    onChange(newValue);

    setTimeout(() => {
      textarea.setSelectionRange(start + tableMarkdown.length, start + tableMarkdown.length);
      textarea.focus();
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/`([^`]*)`/gim, '<code>$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      .replace(/\n/gim, '<br>');
  };

  const toolbarButtons = [
    {
      icon: Bold,
      title: '粗体',
      action: () => insertMarkdown('**', '**', '粗体文本')
    },
    {
      icon: Italic,
      title: '斜体',
      action: () => insertMarkdown('*', '*', '斜体文本')
    },
    {
      icon: Underline,
      title: '标题',
      action: () => insertMarkdown('# ', '', '标题')
    },
    {
      icon: Quote,
      title: '引用',
      action: () => insertList('> ')
    },
    {
      icon: List,
      title: '无序列表',
      action: () => insertList('- ')
    },
    {
      icon: ListOrdered,
      title: '有序列表',
      action: () => insertList('1. ')
    },
    {
      icon: Link,
      title: '链接',
      action: () => insertMarkdown('[', '](url)', '链接文本')
    },
    {
      icon: Image,
      title: '图片',
      action: () => insertMarkdown('![', '](url)', '图片描述')
    },
    {
      icon: isPreview ? EyeOff : Eye,
      title: isPreview ? '编辑' : '预览',
      action: () => setIsPreview(!isPreview)
    },
    {
      icon: Table,
      title: '表格',
      action: insertTable
    },
    {
      icon: Code,
      title: '代码',
      action: () => insertMarkdown('`', '`', '代码')
    },
    {
      icon: HelpCircle,
      title: '帮助',
      action: () => {
        alert(`Markdown语法帮助：
# 标题
**粗体** *斜体*
> 引用
- 列表项
1. 有序列表
[链接](url)
![图片](url)
\`代码\`
        `);
      }
    }
  ];

  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="bg-gray-50 p-2 border-b border-gray-300 flex items-center space-x-1">
        {toolbarButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              type="button"
              onClick={button.action}
              className="p-1.5 hover:bg-gray-200 rounded transition-colors"
              title={button.title}
            >
              <Icon className="w-4 h-4 text-gray-600" />
            </button>
          );
        })}
      </div>

      <div className="relative">
        {isPreview ? (
          <div 
            className="p-4 prose max-w-none"
            style={{ minHeight }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 border-0 focus:outline-none resize-none font-mono text-sm"
            style={{ 
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              minHeight 
            }}
          />
        )}
      </div>

      {showStats && (
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-300 flex justify-between items-center text-xs text-gray-500">
          <div className="flex space-x-4">
            <span>lines: {stats.lines}</span>
            <span>words: {stats.words}</span>
            <span>0.0</span>
          </div>
          <div>
            {isPreview ? '预览模式' : '编辑模式'}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;