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
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Admin Sidebar - Dark with Red Accents */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-80 bg-gray-800 shadow-lg border-r border-red-900 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <FilmIcon className="h-8 w-8 text-red-500 mr-2" />
              <Typography
                as={Link}
                to="/"
                className="mr-4 cursor-pointer py-1.5 font-bold text-2xl lg:text-3xl xl:text-4xl text-red-600 hover:text-red-500 transition-colors"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  textShadow: "0 0 8px rgba(229, 9, 20, 0.6)",
                  letterSpacing: "1px",
                }}
              >
                FLICKSY
              </Typography>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2 lg:space-y-3">
            <Link
              to="/admin"
              className={`flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all text-sm lg:text-base ${
                isActive("/admin")
                  ? "bg-red-900 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <HomeIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3" />
              Dashboard
            </Link>

            <Link
              to="/admin/users"
              className={`flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all text-sm lg:text-base ${
                isActive("/admin/users")
                  ? "bg-red-900 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <UserGroupIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3" />
              Manage Users
            </Link>

            {/* Back to Home Button */}
            <Link
              to="/"
              className="flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all text-gray-300 hover:bg-gray-700 hover:text-white border-t border-gray-700 mt-4 lg:mt-6 text-sm lg:text-base"
              onClick={() => setSidebarOpen(false)}
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-2 lg:mr-3" />
              Back to Home
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Admin Header - Dark with Red Accents */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700 px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-300 hover:text-white mr-3"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              <Typography
                variant="h4"
                className="font-semibold text-white text-lg lg:text-2xl xl:text-3xl"
              >
                {isActive("/admin") ? "Admin Dashboard" : "User Management"}
              </Typography>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="flex items-center">
                <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full bg-red-900 flex items-center justify-center mr-2">
                  <Typography className="text-white font-bold text-xs lg:text-sm">
                    A
                  </Typography>
                </div>
                <Typography className="text-gray-300 text-sm lg:text-base">
                  Admin
                </Typography>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - Dark Background */}
        <main className="flex-1 bg-gray-900">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
