import React, { useContext, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Popup from "./popup";
import { ContextData, Task } from "@/context/ContextProvider";
import EditCard from "./EditCard";
import Loader from "./Loader";
import { getTasks, updateTask, deleteTask } from "@/api/task";

const Cards: React.FC = () => {
  const { tasks, setTasks, setInputDiv, isLoading, setIsLoading } =
    useContext(ContextData);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, setIsLoading]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = async (updatedTask: Task) => {
    try {
      const response = await updateTask(updatedTask._id, {
        title: updatedTask.title,
        description: updatedTask.description,
        completed: updatedTask.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === response.data._id ? response.data : task
        )
      );
      setIsEditFormOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditFormOpen(false);
    setSelectedTask(null);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditFormOpen(true);
  };

  const handleDeleteTask = async (
    task: Task,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    try {
      await deleteTask(task._id);
      setTasks((prevTasks) =>
        prevTasks.filter((item) => item._id !== task._id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row">
      <div className="flex-1 p-4 md:grid md:grid-cols-3 md:gap-4 mt-4">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="relative mb:4 flex flex-col justify-between bg-gray-800 rounded-xl shadow-sm p-4 animate-pulse"
            >
              <Loader />
            </div>
          ))
        ) : tasks.length === 0 ? (
          <div className="col-span-3 text-center text-gray-400 p-4">
            No tasks created yet
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="relative flex flex-col justify-between bg-gray-800 rounded-xl shadow-sm p-4 cursor-pointer mb-4 mt-2 md:mt-0"
              onClick={() => handleTaskClick(task)}
            >
              <div>
                <h1 className="text-xl font-semibold">{task.title}</h1>
                <p className="text-gray-300 my-2 line-clamp-3">
                  {task.description}
                </p>
              </div>
              <div className="mt-4 w-full flex items-center">
                <button
                  className={`${
                    task.completed ? "bg-green-800" : "bg-red-400"
                  } p-2 rounded w-3/6`}
                >
                  {task.completed ? "Complete" : "Incomplete"}
                </button>
                <div className="text-white p-2 w-3/6 text-2xl flex justify-around">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleEditTask(task);
                    }}
                  >
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
            className="w-full flex flex-col items-center justify-center bg-gray-800 rounded-xl p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          >
            <IoMdAddCircleOutline className="text-5xl" />
            <h1>Add Task</h1>
          </button>
        )}
      </div>

      {isPopupOpen && !isEditFormOpen && selectedTask && (
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          task={selectedTask}
        />
      )}
      {isEditFormOpen && selectedTask && (
        <EditCard
          task={selectedTask}
          onSave={handleSaveTask}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Cards;
