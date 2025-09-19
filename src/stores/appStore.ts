import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from '../types';

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'app-storage',
    }
  )
);