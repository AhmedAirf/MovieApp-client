import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black space-y-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-red-600 rounded-full animate-ping opacity-75" />
        <div className="absolute inset-2 border-4 border-red-600 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-red-600 text-3xl font-black font-sans tracking-tighter">
            F
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
