import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, Chatroom, Message } from '../types';

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatrooms: [],
      messages: [],
      currentChatroomId: null,
      isTyping: false,

      addChatroom: (chatroomData) => {
        const newChatroom: Chatroom = {
          ...chatroomData,
          id: Date.now().toString(),
        };
        set((state) => ({
          chatrooms: [newChatroom, ...state.chatrooms],
        }));
      },

      deleteChatroom: (id) => {
        set((state) => ({
          chatrooms: state.chatrooms.filter((room) => room.id !== id),
          messages: state.messages.filter((msg) => msg.chatroomId !== id),
          currentChatroomId: state.currentChatroomId === id ? null : state.currentChatroomId,
        }));
      },

      addMessage: (messageData) => {
        const newMessage: Message = {
          ...messageData,
          id: Date.now().toString(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      setCurrentChatroom: (id) => {
        set({ currentChatroomId: id });
      },

      setIsTyping: (typing) => {
        set({ isTyping: typing });
      },

      loadChatrooms: (userId) => {
        const { chatrooms } = get();
        // Filter chatrooms for the current user
        const userChatrooms = chatrooms.filter((room) => room.userId === userId);
        set({ chatrooms: userChatrooms });
      },

      loadMessages: (chatroomId) => {
        const { messages } = get();
        // Filter messages for the current chatroom
        const chatroomMessages = messages.filter((msg) => msg.chatroomId === chatroomId);
        set({ messages: chatroomMessages });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);