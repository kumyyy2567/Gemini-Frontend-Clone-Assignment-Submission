import React from 'react';
import { LogOut } from 'lucide-react';
import { ChatroomCard } from '../chat/ChatroomCard';
import { ChatroomSkeleton } from '../ui/LoadingSkeleton';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { Chatroom } from '../../types';

interface SidebarProps {
  chatrooms: Chatroom[];
  currentChatroomId: string | null;
  onSelectChatroom: (id: string) => void;
  onDeleteChatroom: (id: string) => void;
  loading?: boolean;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chatrooms,
  currentChatroomId,
  onSelectChatroom,
  onDeleteChatroom,
  loading = false,
  isOpen,
}) => {
  const { logout } = useAuthStore();
  return (
    <aside className={`${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-80 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800`}>
      <div className="flex h-full flex-col">
        <div className="border-b border-gray-200 p-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Conversations
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <ChatroomSkeleton />
          ) : chatrooms.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No conversations yet. Create your first chatroom to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {chatrooms.map((chatroom) => (
                <ChatroomCard
                  key={chatroom.id}
                  chatroom={chatroom}
                  isActive={chatroom.id === currentChatroomId}
                  onClick={() => onSelectChatroom(chatroom.id)}
                  onDelete={() => onDeleteChatroom(chatroom.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-all duration-300"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
};