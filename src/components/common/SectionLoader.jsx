import React from "react";

const SectionLoader = ({ count = 6, className = "" }) => {
  return (
    <div className={`flex space-x-4 px-4 md:px-8 w-max ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex-none w-40 sm:w-48">
          <div className="relative pb-[150%] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse">
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-400 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionLoader;
