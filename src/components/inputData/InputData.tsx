import { ContextData } from "@/context/ContextProvider";
import React, { useContext } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData: React.FC = () => {
  const { setInputDiv, inputDiv } = useContext(ContextData);
  return (
    <>
      <div
        className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
></div>
      <div
        className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded ">
          <div className="flex justify-end">
            <button onClick={() => setInputDiv("hidden")}>
              <RxCross2 className="text-2xl" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded bg-gray-700  w-full my-3"
          />
          <textarea
            name="description"
            placeholder="Enter Description...."
            cols={30}
            rows={10}
            className=" px-3 py-2 rounded bg-gray-700 w-full my-3"
          />
          <button className="px-3 py-3 bg-blue-400 rounded text-black text-2xl font-semibold">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
