import React from 'react';
import { MessageCircle, Trash2 } from 'lucide-react';
import { Chatroom } from '../../types';
import { Button } from '../ui/Button';

interface ChatroomCardProps {
  chatroom: Chatroom;
  isActive?: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export const ChatroomCard: React.FC<ChatroomCardProps> = ({
  chatroom,
  isActive = false,
  onClick,
  onDelete,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-md ${
        isActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
            <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {chatroom.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {chatroom.lastMessage?.content || 'No messages yet'}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {new Date(chatroom.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};