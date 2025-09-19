import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { useAuthStore } from './stores/authStore';
import { useAppStore } from './stores/appStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { isDarkMode } = useAppStore();

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {isAuthenticated ? <DashboardPage /> : <AuthPage />}
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#f3f4f6' : '#111827',
            border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  );
}

export default App;
