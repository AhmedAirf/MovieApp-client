import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  fetchUserProfile,
  setAuthToken,
} from "../../src/utils/api";
import { setToken, getToken, removeToken } from "../../src/utils/helpers";
import { clearWatchlistState } from "./watchlistSlice";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      const { token, user } = response;
      setToken(token);
      setAuthToken(token);
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      const { token, user } = response;
      setToken(token);
      setAuthToken(token);
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");

      setAuthToken(token);
      const user = await fetchUserProfile();
      return user;
    } catch (error) {
      removeToken();
      setAuthToken(null);
      return rejectWithValue(error.message);
    }
  }
);

// Add logout thunk that handles both auth logout and watchlist clearing
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    // Clear watchlist state first
    dispatch(clearWatchlistState());

    // Clear token from localStorage and API
    removeToken();
    setAuthToken(null);

    // Return success (the reducer will handle the state updates)
    return { success: true };
  }
);

// const token = getToken();

const initialState = {
  user: null, // Should be null initially
  token: getToken(),
  isAuthenticated: !!getToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // Normalize: store user object directly
        state.user = action.payload.user?.user || action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // Normalize: store user object directly
        state.user = action.payload.user?.user || action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Load User
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // Normalize: store user object directly
        state.user = action.payload?.user || action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearError, updateUser } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => {
  const user = state.auth.user;
  return user?.role === "admin";
};

export default authSlice.reducer;
