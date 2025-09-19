import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 rounded-full bg-gray-100 p-2 dark:bg-gray-800">
        <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      </div>
      <div className="max-w-[75%]">
        <div className="rounded-2xl bg-gray-100 px-4 py-3 dark:bg-gray-800">
          <div className="flex space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0.1s]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0.2s]" />
          </div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          AI is typing...
        </span>
      </div>
    </div>
  );
};