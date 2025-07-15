import { create } from 'zustand';
import { AuthUser } from '@/types';

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  isInitialized: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isInitialized: false,

  login: (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isInitialized: true });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isInitialized: true });
  },

  initialize: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        const parsedUser: AuthUser = JSON.parse(user);
        set({ user: parsedUser, token, isInitialized: true });
      } catch (e) {
        // if JSON fails
        set({ user: null, token: null, isInitialized: true });
      }
    } else {
      set({ user: null, token: null, isInitialized: true });
    }
  },
}));
