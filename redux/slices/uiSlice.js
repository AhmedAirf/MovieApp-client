import { createSlice } from "@reduxjs/toolkit";

// Get theme from localStorage or default to "dark"
const getStoredTheme = () => {
  try {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "light" ? "light" : "dark";
  } catch (error) {
    console.error("Error reading theme from localStorage:", error);
    return "dark";
  }
};

const initialState = {
  loading: false,
  error: null,
  theme: getStoredTheme(),
  sidebarOpen: false,
  searchQuery: "",
  filters: {
    genre: "",
    year: "",
    sortBy: "popularity",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      // Save to localStorage
      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.error("Error saving theme to localStorage:", error);
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      // Save to localStorage
      try {
        localStorage.setItem("theme", action.payload);
      } catch (error) {
        console.error("Error saving theme to localStorage:", error);
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setSearchQuery,
  setFilters,
  clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
