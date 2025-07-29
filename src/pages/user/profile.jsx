import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  logout,
  selectUser,
  updateUser,
} from "../../../redux/slices/authslice";
import { updateUserProfile } from "../../../src/utils/api";
import Loader from "../../components/common/loader";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  UserCircleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  CalendarIcon,
  BookmarkIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useSelector((state) => state.ui.theme);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditName = () => {
    setIsEditingName(true);
    setNewName(user.name || "");
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewName(user.name || "");
  };

  const handleSaveName = async () => {
    if (!newName.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      // Update the user profile on the server
      const updatedProfile = await updateUserProfile({ name: newName.trim() });

      // Update the user in Redux state with the server response
      dispatch(updateUser(updatedProfile.user || { name: newName.trim() }));
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update name:", error);
      // You could add a toast notification here for better UX
    }
  };

  // Format creation date
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            } mb-2`}
          >
            Profile Settings
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } shadow-xl`}
            >
              {/* Profile Header */}
              <div className="relative p-8 bg-gradient-to-r from-red-600 to-red-700 rounded-t-xl">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white border-4 border-white/30">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {user.name || "User"}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                        {user.role}
                      </span>
                      <span className="text-white/80 text-sm">
                        Member since {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Account Information
                </h3>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      className={`flex items-center gap-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <UserCircleIcon className="w-4 h-4" />
                      Full Name
                    </label>
                    {isEditingName ? (
                      <div className="flex items-center gap-3">
                        <Input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="flex-1"
                          color="red"
                          size="lg"
                          placeholder="Enter your name"
                          labelProps={{
                            className:
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600",
                          }}
                        />
                        <Button
                          size="sm"
                          color="red"
                          onClick={handleSaveName}
                          disabled={isSaving || !newName.trim()}
                          className="flex items-center gap-1"
                        >
                          {isSaving ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <CheckIcon className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outlined"
                          color="red"
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                        <span
                          className={`text-lg font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.name || "Not provided"}
                        </span>
                        <Button
                          size="sm"
                          variant="text"
                          color="red"
                          onClick={handleEditName}
                          className="p-1"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      className={`flex items-center gap-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <EnvelopeIcon className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                      <span
                        className={`text-lg font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {user.email || "Not provided"}
                      </span>
                    </div>
                  </div>

                  {/* Role Field */}
                  <div className="space-y-2">
                    <label
                      className={`flex items-center gap-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <ShieldCheckIcon className="w-4 h-4" />
                      Account Role
                    </label>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                      <span
                        className={`text-lg font-medium capitalize ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                  </div>

                  {/* Member Since Field */}
                  <div className="space-y-2">
                    <label
                      className={`flex items-center gap-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <CalendarIcon className="w-4 h-4" />
                      Member Since
                    </label>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                      <span
                        className={`text-lg font-medium ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <Card
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } shadow-xl`}
            >
              <div className="p-6">
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    to="/watchlist"
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <BookmarkIcon className="w-5 h-5" />
                    <span className="font-medium">My Watchlist</span>
                  </Link>

                  <Link
                    to="/"
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span className="font-medium">Back to Home</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 w-full text-left ${
                      theme === "dark"
                        ? "bg-red-900/20 hover:bg-red-900/30 text-red-400"
                        : "bg-red-50 hover:bg-red-100 text-red-600"
                    }`}
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </Card>

            {/* Account Stats */}
            <Card
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } shadow-xl`}
            >
              <div className="p-6">
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Account Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Account Status
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Theme
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {theme === "dark" ? "Dark" : "Light"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
