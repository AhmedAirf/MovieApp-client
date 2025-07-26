import React from "react";

const loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black space-y-4">
      {/* Pulsing red bar */}
      <div className="w-48 h-1 bg-red-600 rounded-md animate-pulse origin-left scale-x-50" />

      <div className="text-red-600 text-4xl font-black font-sans tracking-tighter">
        F
      </div>
    </div>
  );
};

export default loader;
