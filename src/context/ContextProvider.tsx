"use client";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { logout as apiLogout } from "@/api/user";
export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}
type ContextDataType = {
  inputDiv: string;
  setInputDiv: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  login: (token: string) => void;
  logout: () => void;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const ContextData = createContext<ContextDataType>({
  inputDiv: "hidden",
  setInputDiv: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: false,
  setIsLoading: () => {},
  login: () => {},
  logout: () => {},
  tasks: [],
  setTasks: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await apiLogout(token);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } catch (error: any) {
        console.error("Logout failed:", error.message);
      }
    }
  };
  const ContextDataValue = {
    inputDiv,
    setInputDiv,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    login,
    logout,
    tasks,
    setTasks,
  };

  return (
    <ContextData.Provider value={ContextDataValue}>
      {children}
    </ContextData.Provider>
  );
}
