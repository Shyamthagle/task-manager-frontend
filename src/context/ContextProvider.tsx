"use client";
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

type ContextDataType = {
  inputDiv: string;
  setInputDiv: Dispatch<SetStateAction<string>>;
  isLoggedIn:boolean,
  setIsLoggedIn:Dispatch<SetStateAction<boolean>>;
  isLoading:boolean;
  setIsLoading:Dispatch<SetStateAction<boolean>>;
};

export const ContextData = createContext<ContextDataType>({
  inputDiv: "hidden",
  setInputDiv: () => {},
  isLoggedIn:false,
  setIsLoggedIn:() => {},
  isLoading:false,
  setIsLoading:() => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ContextDataValue = {
    inputDiv,
    setInputDiv,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading
  };

  return (
    <ContextData.Provider value={ContextDataValue}>
      {children}
    </ContextData.Provider>
  );
}
