import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Popup from "./popup";
import { ContextData } from "@/context/ContextProvider";
import EditCard from "./EditCard";
import Loader from "./Loader";

interface Task {
  title: string;
  description: string;
  status: boolean;
}

const initialTasks: Task[] = [
  {
    title: "Design wire-frames",
    description:
      "Create wire-frames for the new project interface. Include main screens and user flow.",
    status: true,
  },
  {
    title: "Develop Backend API",
    description:
      "Implement RESTful API endpoints for user authentication and data retrieval.",
    status: true,
  },
  {
    title: "Integrate Frontend Components",
    description:
      "Build reusable React components and integrate them with the backend API.",
    status: true,
  },
  {
    title: "Testing and Deployment",
    description:
      "Perform unit and integration tests. Prepare the application for deployment to production.",
    status: true,
  },
];

const Cards: React.FC = () => {
  const { setInputDiv,isLoading } = useContext(ContextData);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.title === selectedTask?.title ? updatedTask : task))
    );
    setIsEditFormOpen(false);
    setSelectedTask(null);
  };

  const handleCancelEdit = () => {
    setIsEditFormOpen(false);
    setSelectedTask(null);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditFormOpen(true);
  };

  const handleDeleteTask = (task: Task, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setTasks((prevTasks) => prevTasks.filter((item) => item.title !== task.title));
  };

  return (
    <div className="relative flex flex-col md:flex-row ">
    <div className="flex-1 p-4   md:grid md:grid-cols-3 md:gap-4 mt-4">
      {isLoading ? (
        // Render loaders if loading
        Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-between bg-gray-800 rounded-xl shadow-sm p-4 animate-pulse"
          >
            <Loader/>
          </div>
        ))
      ) : tasks.length === 0 ? (
        // Render message if no tasks and not loading
        <div className="col-span-3 text-center text-gray-400 p-4">
          No tasks created yet
        </div>
      ) : (
        tasks.map((task, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-between bg-gray-800 rounded-xl shadow-sm p-4 cursor-pointer mb-4 md:mb:0 mt-2 md:mt-0"
            onClick={() => handleTaskClick(task)}
          >
            <div>
              <h1 className="text-xl font-semibold">{task.title}</h1>
              <p className="text-gray-300 my-2 line-clamp-3">{task.description}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  task.status ? "bg-green-800" : "bg-red-400"
                } p-2 rounded w-3/6`}
              >
                {task.status ? "Complete" : "Incomplete"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl flex justify-around">
                <button onClick={() => handleEditTask(task)}>
                  <FaEdit className="text-blue-400" />
                </button>
                <button onClick={(event) => handleDeleteTask(task, event)}>
                  <MdDelete className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

{!isLoading && (
          <button
            onClick={() => setInputDiv("fixed")}
            className=" w-full flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          >
            <IoMdAddCircleOutline className="text-5xl" />
            <h1>Add Task</h1>
          </button>
        )}
    </div>

    {isPopupOpen && !isEditFormOpen && selectedTask && (
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} task={selectedTask} />
    )}
    {isEditFormOpen && selectedTask && (
      <EditCard task={selectedTask} onSave={handleSaveTask} onCancel={handleCancelEdit} />
    )}
  </div>
  );
};

export default Cards;

