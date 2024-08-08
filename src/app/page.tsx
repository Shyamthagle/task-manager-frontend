"use client";
import AllTask from "@/components/alltask/AllTask";
import SideBar from "@/components/sideBar/SideBar";
import { ContextData } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

function Home() {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(ContextData);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-1 p-4 overflow-y-auto sm:ml-16 md:ml-24 ml-2 lg:ml-64">
          <AllTask />
        </div>
      </div>
    </>
  );
}
export default Home;
