import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "customer" | "admin";

type LoginPayload = {
  role: UserRole;
  userName?: string;
  userPhone?: string;
  userEmail?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  role: UserRole | null;
  userName: string;
  userPhone: string;
  userEmail: string;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  updateUserName: (userName: string) => void;
  updateUserPhone: (userPhone: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      userName: "",
      userPhone: "",
      userEmail: "",
      login: ({ role, userName = "", userPhone = "", userEmail = "" }) =>
        set({ isAuthenticated: true, role, userName, userPhone, userEmail }),
      logout: () =>
        set({
          isAuthenticated: false,
          role: null,
          userName: "",
          userPhone: "",
          userEmail: "",
        }),
      updateUserName: (userName) => set({ userName }),
      updateUserPhone: (userPhone) => set({ userPhone }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export const homePathFor = (role: UserRole | null) =>
  role === "admin" ? "/admin" : "/";
