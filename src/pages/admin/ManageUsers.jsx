// ManageUsers.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  updateUserAction,
  deleteUserAction,
} from "../../../redux/slices/adminSlice";
import {
  Button,
  Card,
  Typography,
  Chip,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckIcon,
  FilmIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Loader from "../../components/common/loader";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      await dispatch(
        updateUserAction({
          userId: selectedUser._id,
          userData: editForm,
        })
      ).unwrap();
      setShowEditModal(false);
      setSelectedUser(null);
      setEditForm({ name: "", email: "", role: "user" });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteUserAction(selectedUser._id)).unwrap();
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRefresh = () => {
    dispatch(getAllUsers());
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
            <FilmIcon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
          </div>
          <div>
            <Typography
              variant="h3"
              className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold"
            >
              Manage Users
            </Typography>
            <Typography className="text-gray-300 text-sm lg:text-base">
              User administration and management
            </Typography>
          </div>
        </div>
        <Button
          variant="gradient"
          color="red"
          size="sm"
          className="flex items-center gap-2 text-xs lg:text-sm bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg"
          onClick={handleRefresh}
        >
          <ArrowPathIcon className="h-3 w-3 lg:h-4 lg:w-4" />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-red-900 border-l-4 border-red-500 text-white rounded text-sm lg:text-base">
          <p>{error}</p>
        </div>
      )}

      <Card className="p-3 lg:p-4 mb-4 lg:mb-6 bg-gray-800 border border-gray-700 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="lg:col-span-2">
            <Typography
              variant="small"
              className="mb-2 text-gray-300 text-xs lg:text-sm"
            >
              Search Users
            </Typography>
            <Input
              label="Search by name or email"
              icon={
                <MagnifyingGlassIcon className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" />
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-white text-sm lg:text-base"
              color="red"
              size="lg"
            />
          </div>
          <div>
            <Typography
              variant="small"
              className="mb-2 text-gray-300 text-xs lg:text-sm"
            >
              Filter by Role
            </Typography>
            <Select
              label="Select Role"
              value={filterRole}
              onChange={(value) => setFilterRole(value)}
              color="red"
              className="text-white text-sm lg:text-base"
              size="lg"
            >
              <Option value="all" className="text-gray-900">
                All Roles
              </Option>
              <Option value="admin" className="text-gray-900">
                Admin
              </Option>
              <Option value="user" className="text-gray-900">
                User
              </Option>
            </Select>
          </div>
          <div className="flex items-end">
            <Typography
              variant="small"
              className="text-gray-300 text-xs lg:text-sm"
            >
              Showing {filteredUsers.length} of {users.length} users
            </Typography>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden bg-gray-800 border border-gray-700 w-full">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/4">
                  User
                </th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell w-1/4">
                  Email
                </th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Role
                </th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell w-1/6">
                  Joined
                </th>
                <th className="px-3 lg:px-6 py-2 lg:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-1/6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-700">
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 lg:h-10 lg:w-10"></div>
                        <div className="ml-2 lg:ml-4 min-w-0 flex-1">
                          <div className="text-sm font-medium text-white truncate">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-300 truncate sm:hidden">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-gray-300 hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                      <Chip
                        value={user.role}
                        color={user.role === "admin" ? "red" : "gray"}
                        size="sm"
                      />
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-red-400" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col sm:flex-row gap-1 lg:gap-2">
                        <Button
                          variant="gradient"
                          size="sm"
                          color="red"
                          className="flex items-center gap-1 text-xs"
                          onClick={() => handleEditUser(user)}
                        >
                          <PencilIcon className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          variant="gradient"
                          size="sm"
                          color="red"
                          className="flex items-center gap-1 text-xs"
                          onClick={() => handleDeleteUser(user)}
                        >
                          <TrashIcon className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-3 lg:px-6 py-4 text-center text-sm text-gray-400"
                  >
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gray-800 border border-gray-700">
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4">
                <Typography
                  variant="h5"
                  className="text-white text-lg lg:text-xl"
                >
                  Edit User
                </Typography>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <Input
                  label="Name"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  icon={
                    <UserCircleIcon className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" />
                  }
                  color="red"
                  className="text-white text-sm lg:text-base"
                  size="lg"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  icon={
                    <UserCircleIcon className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" />
                  }
                  color="red"
                  className="text-white text-sm lg:text-base"
                  size="lg"
                />
                <Select
                  label="Role"
                  name="role"
                  value={editForm.role}
                  onChange={(value) =>
                    setEditForm((prev) => ({ ...prev, role: value }))
                  }
                  icon={
                    <ShieldCheckIcon className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" />
                  }
                  color="red"
                  className="text-white text-sm lg:text-base"
                  size="lg"
                >
                  <Option value="user" className="text-gray-900">
                    User
                  </Option>
                  <Option value="admin" className="text-gray-900">
                    Admin
                  </Option>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-4 lg:mt-6">
                <Button
                  color="red"
                  size="sm"
                  className="flex items-center gap-1 text-xs lg:text-sm"
                  onClick={handleUpdateUser}
                >
                  <CheckIcon className="h-3 w-3 lg:h-4 lg:w-4" />
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="red"
                  size="sm"
                  className="text-xs lg:text-sm"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-gray-800 border border-gray-700">
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4">
                <Typography
                  variant="h5"
                  color="red"
                  className="text-lg lg:text-xl"
                >
                  Confirm Delete
                </Typography>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>
              </div>

              <Typography className="mb-4 lg:mb-6 text-gray-300 text-sm lg:text-base">
                Are you sure you want to delete user{" "}
                <strong className="text-white">{selectedUser?.name}</strong>?
                This action cannot be undone.
              </Typography>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  color="red"
                  size="sm"
                  className="flex items-center gap-1 text-xs lg:text-sm"
                  onClick={handleConfirmDelete}
                >
                  <TrashIcon className="h-3 w-3 lg:h-4 lg:w-4" />
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="red"
                  size="sm"
                  className="text-xs lg:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
