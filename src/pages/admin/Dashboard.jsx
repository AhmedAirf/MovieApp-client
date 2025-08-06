// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/slices/adminSlice";
import { selectAuth } from "../../../redux/slices/authslice";
import { Button, Card, Typography, Chip } from "@material-tailwind/react";
import {
  UserCircleIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ArrowPathIcon,
  ChartBarIcon,
  UsersIcon,
  FilmIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Loader from "../../components/common/loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const { users, loading, error } = useSelector((state) => state.admin);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, refreshCount]);

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  if (!user) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2 sm:p-4 lg:p-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
            <FilmIcon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
          </div>
          <div>
            <Typography
              variant="h3"
              className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold"
            >
              Dashboard
            </Typography>
            <Typography className="text-gray-300 text-xs sm:text-sm lg:text-base">
              Welcome back, {user.name}
            </Typography>
          </div>
        </div>
        <Button
          variant="gradient"
          color="red"
          size="sm"
          className="flex items-center gap-1 sm:gap-2 text-xs lg:text-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg w-full sm:w-auto"
          onClick={handleRefresh}
        >
          <ArrowPathIcon className="h-3 w-3 lg:h-4 lg:w-4" />
          Refresh
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 sm:mb-6 p-3 lg:p-4 bg-red-900 border-l-4 border-red-500 text-white rounded text-xs sm:text-sm lg:text-base">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        {/* User Info Card */}
        <Card className="p-3 sm:p-4 lg:p-6 bg-gray-800 border border-gray-700 lg:col-span-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <Typography
                variant="h5"
                className="text-white text-base sm:text-lg lg:text-xl truncate"
              >
                {user.name}
              </Typography>
              <Typography className="text-gray-300 font-medium text-xs sm:text-sm lg:text-base truncate">
                {user.email}
              </Typography>
            </div>
          </div>

          <div className="space-y-2 lg:space-y-3">
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-4 w-4 lg:h-5 lg:w-5 text-red-400 flex-shrink-0" />
              <Typography
                as="span"
                className="text-gray-300 text-xs sm:text-sm lg:text-base"
              >
                <span className="font-semibold">Role:</span>{" "}
                <Chip
                  value={user.role}
                  color={user.role === "admin" ? "red" : "gray"}
                  size="sm"
                  className="inline"
                />
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4 lg:h-5 lg:w-5 text-red-400 flex-shrink-0" />
              <Typography
                as="span"
                className="text-gray-300 text-xs sm:text-sm lg:text-base"
              >
                <span className="font-semibold">Status:</span>{" "}
                <Chip
                  value="Active"
                  color="green"
                  size="sm"
                  className="inline"
                />
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 lg:h-5 lg:w-5 text-red-400 flex-shrink-0" />
              <Typography
                as="span"
                className="text-gray-300 text-xs sm:text-sm lg:text-base"
              >
                <span className="font-semibold">Member since:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <Card className="p-3 sm:p-4 lg:p-6 lg:col-span-3 bg-gray-800 border border-gray-700">
          <Typography
            variant="h5"
            className="text-white mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl"
          >
            Quick Stats
          </Typography>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
            <Card className="p-2 sm:p-3 lg:p-4 text-center bg-gray-700 border border-gray-600">
              <UsersIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto text-red-400" />
              <Typography
                variant="h4"
                className="mt-1 sm:mt-2 text-white text-lg sm:text-xl lg:text-2xl"
              >
                {users.length}
              </Typography>
              <Typography
                variant="small"
                className="text-gray-300 text-xs lg:text-sm"
              >
                Total Users
              </Typography>
            </Card>
            <Card className="p-2 sm:p-3 lg:p-4 text-center bg-gray-700 border border-gray-600">
              <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto text-red-400" />
              <Typography
                variant="h4"
                className="mt-1 sm:mt-2 text-white text-lg sm:text-xl lg:text-2xl"
              >
                {users.filter((u) => u.role === "admin").length}
              </Typography>
              <Typography
                variant="small"
                className="text-gray-300 text-xs lg:text-sm"
              >
                Admins
              </Typography>
            </Card>
            <Card className="p-2 sm:p-3 lg:p-4 text-center bg-gray-700 border border-gray-600">
              <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto text-red-400" />
              <Typography
                variant="h4"
                className="mt-1 sm:mt-2 text-white text-lg sm:text-xl lg:text-2xl"
              >
                {users.filter((u) => u.role === "user").length}
              </Typography>
              <Typography
                variant="small"
                className="text-gray-300 text-xs lg:text-sm"
              >
                Regular Users
              </Typography>
            </Card>
            <Card className="p-2 sm:p-3 lg:p-4 text-center bg-gray-700 border border-gray-600 col-span-2 sm:col-span-2 lg:col-span-1">
              <ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mx-auto text-red-400" />
              <Typography
                variant="h4"
                className="mt-1 sm:mt-2 text-white text-lg sm:text-xl lg:text-2xl"
              >
                {users.length > 0
                  ? Math.round(
                      (users.filter((u) => u.role === "admin").length /
                        users.length) *
                        100
                    )
                  : 0}
                %
              </Typography>
              <Typography
                variant="small"
                className="text-gray-300 text-xs lg:text-sm"
              >
                Admin Ratio
              </Typography>
            </Card>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden bg-gray-800 border border-gray-700 w-full">
        <div className="flex justify-between items-center p-3 lg:p-4 border-b border-gray-700">
          <Typography
            variant="h5"
            className="text-white text-base sm:text-lg lg:text-xl"
          >
            User Management
          </Typography>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden">
          {users.map((user, index) => (
            <div
              key={index}
              className="p-3 border-b border-gray-700 hover:bg-slate-700 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-300">{user.email}</div>
                  </div>
                </div>
                <Chip
                  value={user.role}
                  color={user.role === "admin" ? "red" : "gray"}
                  size="sm"
                  className="font-bold"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-300">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </div>
                <Link to="/admin/users">
                  <Button
                    variant="gradient"
                    size="sm"
                    color="red"
                    className="text-xs bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg"
                  >
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
              <tr>
                <th className="px-4 lg:px-8 py-3 lg:py-6 text-left text-xs font-bold text-white uppercase tracking-wider w-1/4">
                  User
                </th>
                <th className="px-4 lg:px-8 py-3 lg:py-6 text-left text-xs font-bold text-white uppercase tracking-wider w-1/4">
                  Email
                </th>
                <th className="px-4 lg:px-8 py-3 lg:py-6 text-left text-xs font-bold text-white uppercase tracking-wider w-1/6">
                  Role
                </th>
                <th className="px-4 lg:px-8 py-3 lg:py-6 text-left text-xs font-bold text-white uppercase tracking-wider hidden md:table-cell w-1/6">
                  Status
                </th>
                <th className="px-4 lg:px-8 py-3 lg:py-6 text-left text-xs font-bold text-white uppercase tracking-wider hidden lg:table-cell w-1/6">
                  Joined
                </th>
                <th className="px-4 lg:px-8 py-3 lg:py-6 text-left text-xs font-bold text-white uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-br from-slate-800 to-slate-900 divide-y divide-slate-700">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-700 transition-colors duration-200"
                >
                  <td className="px-4 lg:px-8 py-3 lg:py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12">
                        <div className="h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                          <UserCircleIcon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                        </div>
                      </div>
                      <div className="ml-3 lg:ml-6 min-w-0 flex-1">
                        <div className="text-sm font-bold text-white truncate">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-8 py-3 lg:py-6 whitespace-nowrap text-sm text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 lg:px-8 py-3 lg:py-6 whitespace-nowrap">
                    <Chip
                      value={user.role}
                      color={user.role === "admin" ? "red" : "gray"}
                      size="sm"
                      className="font-bold"
                    />
                  </td>
                  <td className="px-4 lg:px-8 py-3 lg:py-6 whitespace-nowrap hidden md:table-cell">
                    <Chip
                      value="Active"
                      color="green"
                      size="sm"
                      className="font-bold"
                    />
                  </td>
                  <td className="px-4 lg:px-8 py-3 lg:py-6 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 lg:px-8 py-3 lg:py-6 whitespace-nowrap text-sm font-medium">
                    <Link to="/admin/users">
                      <Button
                        variant="gradient"
                        size="sm"
                        color="red"
                        className="text-xs bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg"
                      >
                        Manage
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <Typography className="text-gray-400 mb-2 text-sm lg:text-base">
              No users found
            </Typography>
            <Button
              variant="gradient"
              size="sm"
              color="red"
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
