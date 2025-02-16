import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoaded: boolean; // NEW: To prevent flickering issues
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoaded: false, // New state for preventing SSR-related issues

      login: (token, user) => {
        set({ token, user, isAuthenticated: true, isLoaded: true });
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false, isLoaded: false });
        localStorage.removeItem("auth-storage");
        localStorage.removeItem("token"); 
        localStorage.removeItem("user");
        window.location.href = "/en/auth/login"; // Redirect to the login page using window


      },

      // Ensure Zustand initializes `isLoaded` correctly
      hydrate: () => {
        const storedState = get();
        set({ isLoaded: true, isAuthenticated: !!storedState.token });
      },
    }),
    {
      name: "auth-storage", // Local storage key
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.isLoaded = true; // Mark as loaded once rehydrated
      },
    }
  )
);
