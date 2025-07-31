import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import {
  FilmIcon,
  UserGroupIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-black ">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Admin Sidebar - Red & Black Theme */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-80 lg:w-96 bg-gradient-to-b from-gray-900 to-black shadow-2xl border-r border-red-900 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg">
                <FilmIcon className="h-8 w-8 text-white" />
              </div>
              <Typography
                as={Link}
                to="/"
                className="cursor-pointer py-1.5 font-bold text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent hover:from-red-400 hover:to-red-600 transition-all duration-300"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: "2px",
                }}
              >
                FLICKSY
              </Typography>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-300 hover:text-red-400 p-2 rounded-lg hover:bg-red-900 hover:bg-opacity-50 transition-all duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-3 lg:space-y-4">
            <div className="mb-6">
              <h3 className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Administration
              </h3>
            </div>

            <Link
              to="/admin"
              className={`flex items-center px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-300 text-sm lg:text-base group ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-600/25"
                  : "text-gray-300 hover:bg-red-900 hover:bg-opacity-50 hover:text-red-300"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                  isActive("/admin")
                    ? "bg-white bg-opacity-20"
                    : "group-hover:bg-red-800 group-hover:bg-opacity-50"
                }`}
              >
                <HomeIcon className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
              <span className="font-medium">Dashboard</span>
            </Link>

            <Link
              to="/admin/users"
              className={`flex items-center px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-300 text-sm lg:text-base group ${
                isActive("/admin/users")
                  ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-600/25"
                  : "text-gray-300 hover:bg-red-900 hover:bg-opacity-50 hover:text-red-300"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                  isActive("/admin/users")
                    ? "bg-white bg-opacity-20"
                    : "group-hover:bg-red-800 group-hover:bg-opacity-50"
                }`}
              >
                <UserGroupIcon className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>
              <span className="font-medium">Manage Users</span>
            </Link>

            {/* Back to Home Button */}
            <div className="pt-6 border-t border-red-900 mt-6">
              <Link
                to="/"
                className="flex items-center px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all duration-300 text-gray-300 hover:bg-red-900 hover:bg-opacity-50 hover:text-red-300 text-sm lg:text-base group"
                onClick={() => setSidebarOpen(false)}
              >
                <div className="p-2 rounded-lg mr-3 group-hover:bg-red-800 group-hover:bg-opacity-50 transition-all duration-300">
                  <ArrowLeftOnRectangleIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                </div>
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Admin Header - Red & Black Theme */}
        <header className="bg-gradient-to-r from-gray-900 to-black shadow-lg border-b border-red-900 px-6 lg:px-8 py-4 lg:py-6 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-300 hover:text-red-400 p-2 rounded-lg hover:bg-red-900 hover:bg-opacity-50 transition-all duration-200"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <div>
                <Typography
                  variant="h4"
                  className="font-bold text-white text-xl lg:text-2xl xl:text-3xl"
                >
                  {isActive("/admin") ? "Admin Dashboard" : "User Management"}
                </Typography>
                <Typography className="text-red-300 text-sm lg:text-base">
                  {isActive("/admin")
                    ? "Overview and analytics"
                    : "User administration"}
                </Typography>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg">
                <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <Typography className="text-white font-bold text-sm">
                    A
                  </Typography>
                </div>
                <Typography className="text-white font-medium text-sm lg:text-base">
                  Admin
                </Typography>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
