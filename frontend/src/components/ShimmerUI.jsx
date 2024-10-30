import React from "react";

const ShimmerUI = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="h-10 w-1/4 bg-gray-300 rounded-md animate-pulse mb-2"></div>
      <div className="h-4 w-1/3 bg-gray-300 rounded-md animate-pulse mb-4"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-md animate-pulse mb-2"></div>

      <div className="flex items-center justify-between mt-6">
        <div className="h-16 w-16 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse mb-2"></div>
          <div className="h-4 w-48 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerUI;
