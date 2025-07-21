import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "../../src/utils/adminApi";
import { isAdmin } from "../../src/utils/helpers";

// Async thunks using adminApi
export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user is admin
      const state = getState();
      const user = state.auth.user;

      if (!isAdmin(user)) {
        throw new Error("Unauthorized: Admin access required");
      }

      const response = await fetchAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUser(userId, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserBy_Id = createAsyncThunk(
  "admin/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserById(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  dashboardStats: {
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
    totalMovies: 0,
    totalTvShows: 0,
  },
  selectedUser: null,
  loading: false,
  error: null,
  filters: {
    role: "all",
    status: "all",
    searchQuery: "",
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateDashboardStats: (state, action) => {
      state.dashboardStats = { ...state.dashboardStats, ...action.payload };
    },
    updateUserInList: (state, action) => {
      const { userId, updates } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates };
      }
    },
    removeUserFromList: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User
      .addCase(updateUserAction.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      // Delete User
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        const deletedUserId = action.payload;
        state.users = state.users.filter((user) => user._id !== deletedUserId);
      })
      // Get User By ID
      .addCase(getUserBy_Id.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
    // Fetch Dashboard Stats
  },
});

export const {
  setSelectedUser,
  clearSelectedUser,
  setFilters,
  clearFilters,

  updateUserInList,
  removeUserFromList,
} = adminSlice.actions;

export default adminSlice.reducer;
