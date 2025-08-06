import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWatchlist as fetchWatchlistAPI,
  addToWatchlist as addToWatchlistAPI,
  removeFromWatchlist as removeFromWatchlistAPI,
  clearWatchlist as clearWatchlistAPI,
} from "../../src/utils/api";

// Async thunk for fetching user's watchlist from API
export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchWatchlistAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding item to watchlist
export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async (mediaItem, { rejectWithValue }) => {
    try {
      const data = await addToWatchlistAPI(mediaItem);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for removing item from watchlist
export const removeFromWatchlist = createAsyncThunk(
  "watchlist/removeFromWatchlist",
  async ({ mediaId, mediaType }, { rejectWithValue }) => {
    try {
      const normalizedType = mediaType?.toLowerCase();
      const data = await removeFromWatchlistAPI(mediaId, normalizedType);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for clearing entire watchlist
export const clearWatchlist = createAsyncThunk(
  "watchlist/clearWatchlist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await clearWatchlistAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  watchlistStatus: {}, // Track status of individual items
  totalItems: 0,
  lastUpdated: null,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    // Clear watchlist state on logout
    clearWatchlistState: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.watchlistStatus = {};
      state.totalItems = 0;
      state.lastUpdated = null;
    },

    // Optimistically add item to watchlist
    optimisticAddToWatchlist: (state, action) => {
      const mediaItem = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === mediaItem.id &&
          item.media_type === (mediaItem.media_type || mediaItem.mediaType)
      );

      if (existingIndex === -1) {
        state.items.push({
          id: mediaItem.id,
          media_type: mediaItem.media_type || mediaItem.mediaType,
          title: mediaItem.title || mediaItem.name,
          poster_path: mediaItem.poster_path,
          overview: mediaItem.overview,
          release_date: mediaItem.release_date || mediaItem.first_air_date,
          vote_average: mediaItem.vote_average,
          addedAt: new Date().toISOString(),
        });
        state.totalItems = state.items.length;
        state.watchlistStatus[mediaItem.id] = true;
      }
    },

    // Optimistically remove item from watchlist
    optimisticRemoveFromWatchlist: (state, action) => {
      const { mediaId, mediaType } = action.payload;
      const normalizedType = mediaType?.toLowerCase();

      state.items = state.items.filter(
        (item) => !(item.id === mediaId && item.media_type === normalizedType)
      );

      state.totalItems = state.items.length;
      state.watchlistStatus[mediaId] = false;
    },

    // Set watchlist status for an item
    setWatchlistStatus: (state, action) => {
      const { mediaId, isInWatchlist } = action.payload;
      state.watchlistStatus[mediaId] = isInWatchlist;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch watchlist
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        const watchlistItems = action.payload.watchlist || [];

        // Remove duplicates based on id and media_type combination
        const uniqueItems = watchlistItems.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.id === item.id && t.media_type === item.media_type
            )
        );

        state.items = uniqueItems;
        state.totalItems = uniqueItems.length;
        state.lastUpdated = new Date().toISOString();

        // Update watchlist status for all items
        state.items.forEach((item) => {
          state.watchlistStatus[item.id] = true;
        });
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWatchlist.fulfilled, (state) => {
        state.loading = false;
        // The server returns the updated watchlist, so we need to fetch it again
        // For now, we'll just mark the item as added optimistically
        // The actual item will be added when fetchWatchlist is called
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWatchlist.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear watchlist
      .addCase(clearWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearWatchlist.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalItems = 0;
        state.watchlistStatus = {};
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(clearWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearWatchlistState,
  optimisticAddToWatchlist,
  optimisticRemoveFromWatchlist,
  setWatchlistStatus,
  clearError,
} = watchlistSlice.actions;

// Export selectors
export const selectWatchlistItems = (state) => state.watchlist.items;
export const selectWatchlistLoading = (state) => state.watchlist.loading;
export const selectWatchlistError = (state) => state.watchlist.error;
export const selectWatchlistTotalItems = (state) => state.watchlist.totalItems;
export const selectWatchlistStatus = (state) => state.watchlist.watchlistStatus;
export const selectIsInWatchlist = (state, mediaId) =>
  state.watchlist.watchlistStatus[mediaId] || false;
export const selectWatchlistLastUpdated = (state) =>
  state.watchlist.lastUpdated;

// Export reducer
export default watchlistSlice.reducer;
