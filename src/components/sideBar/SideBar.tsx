
"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { TbNotebookOff } from "react-icons/tb";
import { ContextData } from "@/context/ContextProvider";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi"; 
function SideBar() {
  const { setInputDiv } = useContext(ContextData);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true); 

  const handleLogOut = () => {
    router.push("/login");
  };

  return (
    <>
      {/* Hamburger menu icon */}
      <div
        className="md:hidden fixed top-2 left-2 p-2 cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <GiHamburgerMenu className="text-3xl text-gray-600" />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-2 left-2 h-[96vh] border-2 rounded-xl flex flex-col justify-between items-center bg-gray-800 md:bg-transparent lg:bg-transparent z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 overflow-hidden"} md:w-64
        `}
      >
        <div className="flex flex-col items-center py-12">
          <div className="text-center">
            <h4 className="text-xl font-semibold">Welcome ✌️</h4>
            <h2 className="text-xl font-semibold">User</h2>
            <h4 className="mb-1 text-gray-400">user@gmail.com</h4>
            <hr className="my-2" />
          </div>
          
          <ul className="flex flex-col items-center w-full">
            <li className="my-2 flex items-center gap-2 p-2 rounded cursor-pointer transition-colors">
              <MdLabelImportant />
              Total tasks {" "}: {" "} 0
            </li>
          </ul>
          <div className="flex justify-end items-center px-3 py-1 border-2 rounded-xl">
            <button
              onClick={() => setInputDiv("fixed")}
              className="flex items-center"
            >
              Add Task
              <IoMdAddCircleOutline className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300 ml-2" />
            </button>
          </div>
        </div>
        <div className="mb-4 w-full flex justify-center p-2">
          <button
            onClick={handleLogOut}
            className="bg-gray-600 w-full p-2 rounded text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;




