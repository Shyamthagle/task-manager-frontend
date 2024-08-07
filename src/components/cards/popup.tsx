import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  task: { title: string; description: string;};
  
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md h-auto max-h-[80vh]">
        <div className="overflow-y-auto pr-4 pb-10">
          <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>
          <p className="text-gray-300 mb-4">{task.description}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute bottom-4 right-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
