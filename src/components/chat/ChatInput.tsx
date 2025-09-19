import React, { useState, useRef } from 'react';
import { Send, Image } from 'lucide-react';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface ChatInputProps {
  onSendMessage: (content: string, type: 'text' | 'image', imageUrl?: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), 'text');
      setMessage('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onSendMessage(`Shared an image: ${file.name}`, 'image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex space-x-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Image className="h-5 w-5" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "AI is thinking..." : "Type your message..."}
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 text-black dark:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ minHeight: '40px', maxHeight: '120px' }}
        />
      </div>

      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        size="sm"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
