import React, { useState } from 'react';
import { Moon, Sun, Search, Plus, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAppStore } from '../../stores/appStore';
import { useAuthStore } from '../../stores/authStore';
import { useDebounce } from '../../hooks/useDebounce';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateChatroom: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onCreateChatroom,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const { isDarkMode, toggleDarkMode } = useAppStore();
  const { logout, user } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  React.useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="border-b border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center space-x-4 animate-slide-in-left">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden hover-lift"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <h1 className="text-xl font-bold text-gradient animate-float">
            ✨ Gemini Clone
          </h1>
        </div>

        <div className="flex flex-1 justify-center px-4 lg:px-6 animate-fade-in">
          <div className="w-full max-w-lg">
            <Input
              type="search"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="glass shadow-md hover:shadow-lg transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 animate-slide-in-right">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateChatroom}
            className="hover-lift shadow-md"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="hover-lift shadow-md"
          >
            {isDarkMode ? <Sun className="h-5 w-5 animate-spin" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="hover-lift shadow-md text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="hover-lift"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-medium shadow-glow">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl glass shadow-2xl animate-scale-in z-50">
                <div className="p-4 border-b border-white/10">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {user?.phone}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center space-x-3 p-4 text-left text-sm text-red-500 hover:bg-red-500/10 transition-all duration-300 rounded-b-xl"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
