import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  theme: "dark", // or "dark"
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
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
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
