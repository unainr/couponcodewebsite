'use client';

import { useState } from 'react';
import { Eye, Edit, Bold, Italic, Link, List, ListOrdered, Quote, Code, Image, Hash } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  label?: string;
  required?: boolean;
}

export default function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = "Enter your content with markdown support...",
  height = "300px",
  label,
  required = false
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const renderPreview = (markdown: string) => {
    if (!markdown.trim()) {
      return '<p class="text-gray-500 italic">Nothing to preview...</p>';
    }

    // Simple markdown to HTML conversion
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 text-gray-900">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 text-gray-900">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 text-gray-900">$1</h1>')
      
      // Bold and Italic
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold"><em class="italic">$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>')
      
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/\n/g, '<br>');

    // Handle lists
    html = html.replace(/^[\s]*\* (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>');
    html = html.replace(/^[\s]*\d+\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>');
    
    // Handle blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>');

    // Wrap in paragraph if not already wrapped
    if (!html.includes('<h1>') && !html.includes('<h2>') && !html.includes('<h3>') && !html.includes('<p>')) {
      html = `<p class="mb-3">${html}</p>`;
    }

    return html;
  };

  const toolbarButtons = [
    { icon: Hash, action: () => insertMarkdown('# '), title: 'Heading' },
    { icon: Bold, action: () => insertMarkdown('**', '**'), title: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), title: 'Italic' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: List, action: () => insertMarkdown('* '), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('1. '), title: 'Numbered List' },
    { icon: Quote, action: () => insertMarkdown('> '), title: 'Quote' },
    { icon: Code, action: () => insertMarkdown('`', '`'), title: 'Inline Code' },
    { icon: Image, action: () => insertMarkdown('![alt text](', ')'), title: 'Image' },
  ];

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="border border-gray-300 rounded-md overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {toolbarButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.action}
                title={button.title}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
              >
                <button.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
          
          <div className="flex bg-gray-200 rounded">
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1 text-sm rounded-l transition-colors ${
                activeTab === 'edit' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Edit className="w-4 h-4 inline mr-1" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 text-sm rounded-r transition-colors ${
                activeTab === 'preview' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Preview
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ height }}>
          {activeTab === 'edit' ? (
            <textarea
              id="markdown-textarea"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full h-full p-4 border-none outline-none resize-none font-mono text-sm focus:ring-0"
              style={{ minHeight: height }}
            />
          ) : (
            <div 
              className="w-full h-full p-4 overflow-y-auto prose prose-sm max-w-none"
              style={{ minHeight: height }}
              dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
            />
          )}
        </div>

        {/* Help Text */}
        <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-500">
          <div className="flex flex-wrap gap-4">
            <span><strong>**bold**</strong></span>
            <span><em>*italic*</em></span>
            <span>[link](url)</span>
            <span>* list item</span>
            <span>1. numbered list</span>
            <span>&gt; quote</span>
            <span>`code`</span>
            <span># heading</span>
          </div>
        </div>
      </div>
    </div>
  );
}