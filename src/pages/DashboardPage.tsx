import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { ChatArea } from '../components/layout/ChatArea';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import { generateAIResponse } from '../utils/mockData';
import { Chatroom } from '../types';
import toast from 'react-hot-toast';

export const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newChatroomTitle, setNewChatroomTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredChatrooms, setFilteredChatrooms] = useState<Chatroom[]>([]);

  const { user } = useAuthStore();
  const {
    chatrooms,
    messages,
    currentChatroomId,
    isTyping,
    addChatroom,
    deleteChatroom,
    addMessage,
    setCurrentChatroom,
    setIsTyping,
    loadChatrooms,
  } = useChatStore();

  // Load chatrooms for the user
  useEffect(() => {
    if (user?.id) {
      loadChatrooms(user.id);
    }
  }, [user?.id, loadChatrooms]);

  // Set default current chatroom if none is selected
  useEffect(() => {
    if (!currentChatroomId && chatrooms.length > 0) {
      setCurrentChatroom(chatrooms[0].id);
    }
  }, [currentChatroomId, chatrooms, setCurrentChatroom]);

  // Filter chatrooms based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredChatrooms(chatrooms);
    } else {
      const filtered = chatrooms.filter((room) =>
        room.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChatrooms(filtered);
    }
  }, [chatrooms, searchQuery]);

  // Get current chatroom messages
  const currentMessages = messages.filter(
    (msg) => msg.chatroomId === currentChatroomId
  );

  const currentChatroom = chatrooms.find(
    (room) => room.id === currentChatroomId
  );

  const handleCreateChatroom = () => {
    if (!newChatroomTitle.trim()) {
      toast.error('Please enter a chatroom title');
      return;
    }

    addChatroom({
      title: newChatroomTitle.trim(),
      createdAt: new Date().toISOString(),
      userId: user!.id,
    });

    setNewChatroomTitle('');
    setShowCreateModal(false);
    toast.success('Chatroom created successfully!');
  };

  const handleDeleteChatroom = (id: string) => {
    deleteChatroom(id);
    toast.success('Chatroom deleted successfully!');
  };

  const handleSelectChatroom = (id: string) => {
    setCurrentChatroom(id);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleSendMessage = (content: string, type: 'text' | 'image', imageUrl?: string) => {
    if (!currentChatroomId) return;

    // Add user message
    addMessage({
      content,
      type,
      sender: 'user',
      timestamp: new Date().toISOString(),
      chatroomId: currentChatroomId,
      imageUrl,
    });

    // Simulate AI response with typing indicator
    setIsTyping(true);
    
    const responseDelay = Math.random() * 2000 + 1000; // 1-3 seconds
    
    setTimeout(() => {
      const aiResponse = generateAIResponse();
      
      addMessage({
        content: aiResponse,
        type: 'text',
        sender: 'ai',
        timestamp: new Date().toISOString(),
        chatroomId: currentChatroomId,
      });
      
      setIsTyping(false);
    }, responseDelay);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateChatroom={() => setShowCreateModal(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          chatrooms={filteredChatrooms}
          currentChatroomId={currentChatroomId}
          onSelectChatroom={handleSelectChatroom}
          onDeleteChatroom={handleDeleteChatroom}
          isOpen={isSidebarOpen}
        />

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 flex flex-col bg-white dark:bg-gray-800">
          <ChatArea
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            chatroomTitle={currentChatroom?.title}
          />
        </main>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Chatroom"
      >
        <div className="space-y-4">
          <Input
            label="Chatroom Title"
            value={newChatroomTitle}
            onChange={(e) => setNewChatroomTitle(e.target.value)}
            placeholder="Enter chatroom title"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreateChatroom();
              }
            }}
          />
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateChatroom}>
              Create Chatroom
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};