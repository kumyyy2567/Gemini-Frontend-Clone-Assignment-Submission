import React, { useEffect, useRef } from 'react';
import { MessageBubble } from '../chat/MessageBubble';
import { ChatInput } from '../chat/ChatInput';
import { TypingIndicator } from '../chat/TypingIndicator';
import { MessageSkeleton } from '../ui/LoadingSkeleton';
import { Message } from '../../types';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string, type: 'text' | 'image', imageUrl?: string) => void;
  isTyping?: boolean;
  loading?: boolean;
  chatroomTitle?: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  onSendMessage,
  isTyping = false,
  loading = false,
  chatroomTitle,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!chatroomTitle) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to Gemini Clone
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select a conversation from the sidebar or create a new one to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-full flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/images/gemini-logo.png')" }}
    >
      <div className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {chatroomTitle}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <MessageSkeleton />
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Start a conversation by sending your first message.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  );
};