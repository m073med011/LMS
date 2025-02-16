"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // NEW: Prevents redirects before hydration

  // ✅ Login function with Zustand + Local Storage
  const signIn = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      const { token, user } = response;

      login(token, user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.replace("/"); // Redirect after login
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // ✅ Fixed Logout function (Clears everything & reloads)
  

  // ✅ Improved Fetch User function
  const fetchUser = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      login(storedToken, JSON.parse(storedUser));
    }
  };

  // ✅ Ensures Zustand is Hydrated Before Redirecting
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && !isAuthenticated) {
      fetchUser();
    }

    setLoading(false); // Mark as loaded after fetching user
  }, [isAuthenticated]);

  return { user, token, isAuthenticated, signIn, fetchUser, loading };
};
