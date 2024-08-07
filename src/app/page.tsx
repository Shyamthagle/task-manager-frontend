'use client'
import AllTask from "@/components/alltask/AllTask";
import Login from "@/components/auth/login/Login";
import SideBar from "@/components/sideBar/SideBar";
import { ContextData } from "@/context/ContextProvider";
import { useState, useEffect, useContext } from "react";

export default function Home() {
  const{isLoggedIn} = useContext(ContextData)

  return (
    <>
      {isLoggedIn ? (
        <>
          <Login />
        </>
      ) : (
        <div className="flex h-screen">
          <SideBar />
          <div className="flex-1  p-4 overflow-y-auto sm:ml-16 md:ml-24 ml-2 lg:ml-64">
            <AllTask />
          </div>
        </div>
      )}
    </>
  );
}

