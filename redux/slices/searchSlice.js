import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchContent } from "../../src/utils/movieApi";

// Async thunk for search
export const performSearch = createAsyncThunk(
  "search/performSearch",
  async (query) => {
    const response = await searchContent(query);
    return response;
  }
);

const initialState = {
  searchResults: [],
  searchHistory: [],
  currentQuery: "",
  loading: false,
  error: null,
  hasSearched: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.currentQuery = "";
      state.hasSearched = false;
    },
    addToHistory: (state, action) => {
      const query = action.payload;
      if (!state.searchHistory.includes(query)) {
        state.searchHistory.unshift(query);
        // Keep only last 10 searches
        if (state.searchHistory.length > 10) {
          state.searchHistory.pop();
        }
      }
    },
    clearHistory: (state) => {
      state.searchHistory = [];
    },
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        state.hasSearched = true;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSearch, addToHistory, clearHistory, setCurrentQuery } =
  searchSlice.actions;

export default searchSlice.reducer;
