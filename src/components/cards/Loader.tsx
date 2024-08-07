import React from "react";

const SkeletonCard: React.FC = () => {
  return (
  <>
    <div>
    <div className="bg-gray-700 h-6 mb-2 rounded"></div>
    <div className="bg-gray-700 h-4 mb-2 rounded w-3/4"></div>
  </div>
  <div className="mt-4 w-full flex items-center">
    <div className="bg-gray-700 h-8 w-1/2 rounded"></div>
    <div className="text-white p-2 w-1/2 flex justify-around">
      <div className="bg-gray-700 h-8 w-8 rounded"></div>
      <div className="bg-gray-700 h-8 w-8 rounded"></div>
    </div>
  </div>
  </>
              
            
  );
};
    
export default SkeletonCard;
