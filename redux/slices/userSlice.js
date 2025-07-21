import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserProfile } from "../../src/utils/api";

// Async thunk for fetching user profile
export const fetchUserProfileAsync = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const response = await fetchUserProfile();
    return response;
  }
);

const initialState = {
  profile: null,
  preferences: {
    theme: "light",
    language: "en",
    notifications: true,
    emailNotifications: true,
  },
  settings: {
    privacy: "public",
    autoPlay: false,
    quality: "hd",
  },
  activity: {
    recentlyViewed: [],
    favorites: [],
    ratings: [],
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    addRecentlyViewed: (state, action) => {
      const item = action.payload;
      // Remove if already exists
      state.activity.recentlyViewed = state.activity.recentlyViewed.filter(
        (viewed) => viewed.id !== item.id
      );
      // Add to beginning
      state.activity.recentlyViewed.unshift(item);
      // Keep only last 20 items
      if (state.activity.recentlyViewed.length > 20) {
        state.activity.recentlyViewed.pop();
      }
    },
    addToFavorites: (state, action) => {
      const item = action.payload;
      if (!state.activity.favorites.find((fav) => fav.id === item.id)) {
        state.activity.favorites.push(item);
      }
    },
    removeFromFavorites: (state, action) => {
      const itemId = action.payload;
      state.activity.favorites = state.activity.favorites.filter(
        (fav) => fav.id !== itemId
      );
    },
    addRating: (state, action) => {
      const { mediaId, rating } = action.payload;
      const existingRating = state.activity.ratings.find(
        (r) => r.mediaId === mediaId
      );
      if (existingRating) {
        existingRating.rating = rating;
      } else {
        state.activity.ratings.push({ mediaId, rating });
      }
    },
    clearUserData: (state) => {
      state.profile = null;
      state.activity = initialState.activity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setProfile,
  updateProfile,
  setPreferences,
  setSettings,
  addRecentlyViewed,
  addToFavorites,
  removeFromFavorites,
  addRating,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
