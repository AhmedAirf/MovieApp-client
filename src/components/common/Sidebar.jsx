import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../redux/slices/uiSlice";
import { selectAuth, logoutUser } from "../../../redux/slices/authslice";
import {
  IconButton,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import {
  XMarkIcon,
  FilmIcon,
  HomeIcon,
  PlayIcon,
  TvIcon,
  BookmarkIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ClockIcon,
  FireIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ sidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);
  const { isAuthenticated, user } = useSelector(selectAuth);

  if (!sidebarOpen) return null;

  const handleClose = () => {
    dispatch(toggleSidebar());
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
  };

  // Navigation sections
  const browseItems = [
    {
      icon: HomeIcon,
      label: "Home",
      path: "/",
      description: "Discover trending content",
    },
    {
      icon: PlayIcon,
      label: "Movies",
      path: "/movies",
      description: "Browse all movies",
    },
    {
      icon: TvIcon,
      label: "TV Shows",
      path: "/tv",
      description: "Watch series & shows",
    },
  ];

  return (
    <div className="fixed inset-0 z-[99999] lg:hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <aside
        className={`relative z-50 w-80 h-full shadow-2xl backdrop-blur-xl border-r transform transition-all duration-300 ease-out animate-in slide-in-from-left ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-900/95 via-gray-800/95 to-black/95 border-gray-700/30"
            : "bg-gradient-to-b from-white/95 via-gray-50/95 to-gray-100/95 border-gray-200/30"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-6 border-b ${
            theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <FilmIcon className="h-10 w-10 text-red-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div>
                <Typography
                  variant="h5"
                  className={`font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "1px",
                  }}
                >
                  FLICKSY
                </Typography>
                <Typography
                  variant="small"
                  className={`-mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Your Movie Hub
                </Typography>
              </div>
            </div>

            {/* Close button */}
            <IconButton
              variant="text"
              size="sm"
              onClick={handleClose}
              className={`rounded-full ${
                theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <XMarkIcon className="h-6 w-6" />
            </IconButton>
          </div>

          {/* User Profile Section */}
          {isAuthenticated && user && (
            <div
              className={`p-4 rounded-xl ${
                theme === "dark"
                  ? "bg-gray-800/50 border border-gray-700/30"
                  : "bg-white/50 border border-gray-200/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                  alt={user.name}
                  size="md"
                  className="border-2 border-red-500/20"
                />
                <div className="flex-1 min-w-0">
                  <Typography
                    variant="h6"
                    className={`font-semibold truncate ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className={`${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.role === "admin" ? "Administrator" : "Movie Lover"}
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-transparent">
          {/* Browse Section */}
          <div>
            <Typography
              variant="small"
              className={`font-bold uppercase tracking-wider mb-4 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Browse
            </Typography>
            <div className="space-y-2">
              {browseItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group hover:scale-[1.02] active:scale-[0.98] ${
                    theme === "dark"
                      ? "hover:bg-gray-800/60 hover:shadow-lg"
                      : "hover:bg-white/60 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "bg-gray-700/50 group-hover:bg-red-600/20"
                        : "bg-gray-100 group-hover:bg-red-50"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-colors ${
                        theme === "dark"
                          ? "text-gray-300 group-hover:text-red-400"
                          : "text-gray-600 group-hover:text-red-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <Typography
                      variant="small"
                      className={`font-semibold transition-colors ${
                        theme === "dark"
                          ? "text-white group-hover:text-red-400"
                          : "text-gray-900 group-hover:text-red-600"
                      }`}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="small"
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {item.description}
                    </Typography>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Admin Section */}
        </div>

        {/* Footer */}
        <div
          className={`p-6 border-t ${
            theme === "dark" ? "border-gray-700/50" : "border-gray-200/50"
          }`}
        >
          {isAuthenticated ? (
            <div className="space-y-3">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                onClick={() => handleNavigation("/profile")}
                className={`flex items-center justify-center gap-2 ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Cog6ToothIcon className="h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="filled"
                size="sm"
                fullWidth
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                variant="filled"
                size="sm"
                fullWidth
                onClick={() => handleNavigation("/login")}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
              >
                Sign In
              </Button>
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                onClick={() => handleNavigation("/register")}
                className={
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }
              >
                Create Account
              </Button>
            </div>
          )}

          {/* App Version */}
          <Typography
            variant="small"
            className={`text-center mt-4 ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Flicksy v2.0
          </Typography>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
