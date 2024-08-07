import { updateTask } from "@/api/task";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const EditCard: React.FC<{
  task: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}> = ({ task, onSave, onCancel }) => {
  
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleSave = async () => {
    try {
      const updatedTask = { ...task, title, description, completed };
      console.log("Updated task:", updatedTask);
      const response = await updateTask(task._id, updatedTask);
      console.log("API response:", response);
      const savedTask = response.data;
      onSave(savedTask); 
      console.log("-------------------:");
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center h-screen w-full">
      <div className="w-11/12 md:w-4/6 lg:w-3/6 bg-gray-900 p-4 rounded">
        <div className="flex justify-end">
          <button onClick={onCancel}> 
            <RxCross2 className="text-2xl" />
          </button>
        </div>
        <h2 className="text-2xl mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 w-full my-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 w-full my-3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Status</label>
          <select
            value={completed ? "complete" : "incomplete"}
            onChange={(e) => setCompleted(e.target.value === "complete")}
            className="px-3 py-2 rounded bg-gray-700 w-full my-3"
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
