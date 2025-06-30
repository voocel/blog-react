import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/auth';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      isLoggedIn: false,
      user: null,
      token: null,

      // Actions
      login: (user, token) => {
        set({
          isLoggedIn: true,
          user,
          token,
        });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
          token: null,
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        token: state.token,
      }),
    }
  )
);