import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const EditCard: React.FC<{
  task: { title: string; description: string; status: boolean };
  onSave: (task: { title: string; description: string; status: boolean }) => void;
  onCancel: () => void;
}> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    onSave({ title, description, status });
  };

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center h-screen w-full">
      <div className="w-3/6 bg-gray-900 p-4 rounded">
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
            value={status ? "complete" : "incomplete"}
            onChange={(e) => setStatus(e.target.value === "complete")}
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
