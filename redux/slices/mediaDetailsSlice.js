import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMediaById,
  fetchMediaCredits,
  fetchMediaVideos,
  fetchMediaImages,
  fetchMediaRecommendations,
  fetchPersonDetails,
  fetchPersonCredits,
} from "../../src/utils/movieApi";

// Async thunks
export const fetchMediaDetails = createAsyncThunk(
  "mediaDetails/fetchMediaDetails",
  async ({ type, id }) => {
    const response = await fetchMediaById(type, id);
    return response;
  }
);

export const fetchMediaCreditsAsync = createAsyncThunk(
  "mediaDetails/fetchMediaCredits",
  async ({ type, id }) => {
    const response = await fetchMediaCredits(type, id);
    return response;
  }
);

export const fetchMediaVideosAsync = createAsyncThunk(
  "mediaDetails/fetchMediaVideos",
  async ({ type, id }) => {
    const response = await fetchMediaVideos(type, id);
    return response;
  }
);

export const fetchMediaImagesAsync = createAsyncThunk(
  "mediaDetails/fetchMediaImages",
  async ({ type, id }) => {
    const response = await fetchMediaImages(type, id);
    return response;
  }
);

export const fetchMediaRecommendationsAsync = createAsyncThunk(
  "mediaDetails/fetchMediaRecommendations",
  async ({ type, id }) => {
    const response = await fetchMediaRecommendations(type, id);
    return response;
  }
);

export const fetchPersonDetailsAsync = createAsyncThunk(
  "mediaDetails/fetchPersonDetails",
  async (id) => {
    const response = await fetchPersonDetails(id);
    return response;
  }
);

export const fetchPersonCreditsAsync = createAsyncThunk(
  "mediaDetails/fetchPersonCredits",
  async (id) => {
    const response = await fetchPersonCredits(id);
    return response;
  }
);

const initialState = {
  currentMedia: null,
  credits: {
    cast: [],
    crew: [],
  },
  videos: [],
  images: {
    backdrops: [],
    posters: [],
  },
  recommendations: [],
  loading: false,
  error: null,
};

const mediaDetailsSlice = createSlice({
  name: "mediaDetails",
  initialState,
  reducers: {
    clearMediaDetails: (state) => {
      state.currentMedia = null;
      state.credits = { cast: [], crew: [] };
      state.videos = [];
      state.images = { backdrops: [], posters: [] };
      state.recommendations = [];
    },
    setCurrentMedia: (state, action) => {
      state.currentMedia = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Media Details
      .addCase(fetchMediaDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedia = action.payload;
      })
      .addCase(fetchMediaDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Credits
      .addCase(fetchMediaCreditsAsync.fulfilled, (state, action) => {
        state.credits = action.payload;
      })
      // Videos
      .addCase(fetchMediaVideosAsync.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      // Images
      .addCase(fetchMediaImagesAsync.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      // Recommendations
      .addCase(fetchMediaRecommendationsAsync.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      })
      // Person Details
      .addCase(fetchPersonDetailsAsync.fulfilled, (state, action) => {
        state.currentPerson = action.payload;
      })
      // Person Credits
      .addCase(fetchPersonCreditsAsync.fulfilled, (state, action) => {
        state.credits = action.payload;
      });
  },
});

export const { clearMediaDetails, setCurrentMedia } = mediaDetailsSlice.actions;

export default mediaDetailsSlice.reducer;
