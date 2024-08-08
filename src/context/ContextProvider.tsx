"use client";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { logout as apiLogout } from "@/api/user";
import { getTasks } from "@/api/task";
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
  tasksCount:number;
  setTasksCount:Dispatch<SetStateAction<number>>;
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
  tasksCount:0,
  setTasksCount:() => {},
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
  const [tasksCount,setTasksCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchTasks(token); 
    }
  }, []);

  const fetchTasks = async (token: string) => {
    try {
      const response = await getTasks(token);
      setTasks(response.data);
      setTasksCount(response.count)
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    await fetchTasks(token);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await apiLogout(token);
      } catch (error: any) {
        console.error("Logout failed:", error.message);
      }
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setTasks([]);
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
    tasksCount,
    setTasksCount
  };

  return (
    <ContextData.Provider value={ContextDataValue}>
      {children}
    </ContextData.Provider>
  );
}
