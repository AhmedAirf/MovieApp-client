import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicHeader from "../components/common/PublicHeader";

const UserLayout = () => {
  const theme = useSelector((state) => state.ui.theme);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <PublicHeader transparent={false} userLayout={true} />

      {/* Main Content */}
      <main className="relative">
        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div
            className={`rounded-lg shadow-sm ${
              theme === "dark"
                ? "bg-gray-800/50 border border-gray-700/50"
                : "bg-white border border-gray-200/50"
            } backdrop-blur-sm`}
          >
            <div className="p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern (subtle) */}
      <div
        className={`fixed inset-0 -z-10 ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.05),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.02),transparent_50%)]"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default UserLayout;
