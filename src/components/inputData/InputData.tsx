import { ContextData } from "@/context/ContextProvider";
import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { createTask, getTasks } from "@/api/task"; 
import { useRouter } from "next/navigation";

const InputData: React.FC = () => {
  const { setInputDiv, inputDiv, setTasks ,setTasksCount} = useContext(ContextData);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: true,
  });


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function createUserTask() {
    const token = localStorage.getItem("token"); 
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await createTask(formData,token);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTasksCount((prevCount) => prevCount + 1); 
      setInputDiv("hidden");
      setFormData({ title: "", description: "", completed: true });
      router.push("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserTask();
  };

  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-11/12 md:w-4/6 lg:w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button onClick={() => setInputDiv("hidden")}>
              <RxCross2 className="text-2xl" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="px-3 py-2 rounded bg-gray-700 w-full my-3"
            />
            <textarea
              name="description"
              placeholder="Enter Description...."
              cols={30}
              rows={10}
              value={formData.description}
              onChange={handleChange}
              className="px-3 py-2 rounded bg-gray-700 w-full my-3"
            />
            <button
              type="submit"
              className="px-3 py-3 bg-blue-400 rounded text-black text-2xl font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputData;
