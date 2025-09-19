export interface User {
  id: string;
  email: string;
  phone: string;
  countryCode: string;
  createdAt: string;
}

export interface Chatroom {
  id: string;
  title: string;
  createdAt: string;
  lastMessage?: Message;
  userId: string;
}

export interface Message {
  id: string;
  content: string;
  type: 'text' | 'image';
  sender: 'user' | 'ai';
  timestamp: string;
  chatroomId: string;
  imageUrl?: string;
}

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export interface ChatState {
  chatrooms: Chatroom[];
  messages: Message[];
  currentChatroomId: string | null;
  isTyping: boolean;
  addChatroom: (chatroom: Omit<Chatroom, 'id'>) => void;
  deleteChatroom: (id: string) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  setCurrentChatroom: (id: string | null) => void;
  setIsTyping: (typing: boolean) => void;
  loadChatrooms: (userId: string) => void;
  loadMessages: (chatroomId: string) => void;
}

export interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}