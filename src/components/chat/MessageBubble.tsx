import React, { useState } from 'react';
import { Copy, Check, User, Bot } from 'lucide-react';
import { Message } from '../../types';
import toast from 'react-hot-toast';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      toast.success('Message copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy message');
    }
  };

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`flex-shrink-0 rounded-full p-2 ${
        isUser 
          ? 'bg-blue-100 dark:bg-blue-900/30' 
          : 'bg-gray-100 dark:bg-gray-800'
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        ) : (
          <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </div>

      <div className={`group max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`relative rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
        }`}>
          {message.type === 'image' && message.imageUrl && (
            <img
              src={message.imageUrl}
              alt="Uploaded"
              className="max-w-xs rounded-lg mb-2"
            />
          )}
          <p className="break-words">{message.content}</p>
          
          <button
            onClick={handleCopy}
            className={`absolute -right-8 top-2 opacity-0 group-hover:opacity-100 rounded p-1 transition-opacity ${
              isUser 
                ? 'text-gray-400 hover:text-gray-600' 
                : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        
        <span className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};