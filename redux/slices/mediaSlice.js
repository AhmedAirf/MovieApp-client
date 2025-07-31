import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllMovies,
  fetchAllTvShows,
  fetchTrending,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
  fetchPopularMedia,
  fetchTopRatedMedia,
  fetchAiringToday,
  fetchOnTheAir,
  fetchGenres,
} from "../../src/utils/movieApi";

export const getAllMovies = createAsyncThunk(
  "media/getAllMovies",
  async (_, thunkAPI) => {
    try {
      return await fetchAllMovies();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getAllTvShows = createAsyncThunk(
  "media/getAllTvShows",
  async (_, thunkAPI) => {
    try {
      return await fetchAllTvShows();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getTrending = createAsyncThunk(
  "media/getTrending",
  async (_, thunkAPI) => {
    try {
      return await fetchTrending();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUpcoming = createAsyncThunk(
  "media/getUpcoming",
  async (_, thunkAPI) => {
    try {
      return await fetchUpcomingMovies();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getNowPlayingMovies = createAsyncThunk(
  "media/nowPlaying",
  async (_, thunkAPI) => {
    try {
      return await fetchNowPlayingMovies();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getPopularMedia = createAsyncThunk(
  "media/popular",
  async (type = "movie", thunkAPI) => {
    try {
      return { type, data: await fetchPopularMedia(type) };
    } catch (err) {
      return thunkAPI.rejectWithValue({ type, error: err.message });
    }
  }
);

export const getTopRatedMedia = createAsyncThunk(
  "media/topRated",
  async (type = "movie", thunkAPI) => {
    try {
      return { type, data: await fetchTopRatedMedia(type) };
    } catch (err) {
      return thunkAPI.rejectWithValue({ type, error: err.message });
    }
  }
);

export const getAiringToday = createAsyncThunk(
  "media/airingToday",
  async (_, thunkAPI) => {
    try {
      return await fetchAiringToday();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getOnTheAir = createAsyncThunk(
  "media/onTheAir",
  async (_, thunkAPI) => {
    try {
      return await fetchOnTheAir();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getGenres = createAsyncThunk(
  "media/getGenres",
  async (_, thunkAPI) => {
    try {
      return await fetchGenres();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  movies: { data: [], loading: false, error: null },
  tvShows: { data: [], loading: false, error: null },
  trending: { data: [], loading: false, error: null },
  upcoming: { data: [], loading: false, error: null },
  nowPlaying: { data: [], loading: false, error: null },
  popular: {
    movie: { data: [], loading: false, error: null },
    tv: { data: [], loading: false, error: null },
  },
  topRated: {
    movie: { data: [], loading: false, error: null },
    tv: { data: [], loading: false, error: null },
  },
  airingToday: { data: [], loading: false, error: null },
  onTheAir: { data: [], loading: false, error: null },
  genres: { data: [], loading: false, error: null },
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Movies
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.movies.loading = true;
        state.movies.error = null;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.movies.loading = false;
        if (action.payload.data) {
          const d = action.payload.data;
          // Combine all movies into one array
          const allMovies = [
            ...(d.popularMovies || []),
            ...(d.topRatedMovies || []),
            ...(d.nowPlayingMovies || []),
            ...(d.upcomingMovies || []),
            ...(d.trendingMovies || []),
          ];
          // Deduplicate by sorting and filtering
          const uniqueMovies = allMovies
            .slice()
            .sort((a, b) => a.id - b.id)
            .filter(
              (movie, index, arr) =>
                index === 0 || movie.id !== arr[index - 1].id
            );
          state.movies.data = uniqueMovies;
          // Log the total number of unique movies
          // console.log("Total unique movies:", uniqueMovies.length);
        } else {
          state.movies.data = action.payload;
        }
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.movies.loading = false;
        state.movies.error = action.payload;
      })
      // TV Shows
      .addCase(getAllTvShows.pending, (state) => {
        state.tvShows.loading = true;
        state.tvShows.error = null;
      })
      .addCase(getAllTvShows.fulfilled, (state, action) => {
        state.tvShows.loading = false;
        if (action.payload.data) {
          const d = action.payload.data;
          const allTvShows = [
            ...(d.popularTvShows || []),
            ...(d.topRatedTvShows || []),
            ...(d.onTheAirTvShows || []),
            ...(d.airingTodayTvShows || []),
            ...(d.trendingTvShows || []),
          ];
          const uniqueTvShows = allTvShows
            .slice()
            .sort((a, b) => a.id - b.id)
            .filter(
              (tvshow, index, arr) =>
                index === 0 || tvshow.id !== arr[index - 1].id
            );
          state.tvShows.data = uniqueTvShows;
        } else {
          state.tvShows.data = action.payload;
        }
      })
      .addCase(getAllTvShows.rejected, (state, action) => {
        state.tvShows.loading = false;
        state.tvShows.error = action.payload;
      })
      // Trending
      .addCase(getTrending.pending, (state) => {
        state.trending.loading = true;
        state.trending.error = null;
      })
      .addCase(getTrending.fulfilled, (state, action) => {
        state.trending.loading = false;
        state.trending.data = action.payload.results || action.payload;
        // console.log(state.trending.data);
      })
      .addCase(getTrending.rejected, (state, action) => {
        state.trending.loading = false;
        state.trending.error = action.payload;
      })
      // Upcoming
      .addCase(getUpcoming.pending, (state) => {
        state.upcoming.loading = true;
        state.upcoming.error = null;
      })
      .addCase(getUpcoming.fulfilled, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.data = action.payload.results || action.payload;
      })
      .addCase(getUpcoming.rejected, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.error = action.payload;
      })
      // Now Playing
      .addCase(getNowPlayingMovies.pending, (state) => {
        state.nowPlaying.loading = true;
        state.nowPlaying.error = null;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying.loading = false;
        state.nowPlaying.data = action.payload.results || action.payload;
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        state.nowPlaying.loading = false;
        state.nowPlaying.error = action.payload;
      })
      // Popular (movie/tv)
      .addCase(getPopularMedia.pending, (state, action) => {
        const type = action.meta.arg || "movie";
        state.popular[type].loading = true;
        state.popular[type].error = null;
      })
      .addCase(getPopularMedia.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state.popular[type].loading = false;
        state.popular[type].data = data.results || data;
      })
      .addCase(getPopularMedia.rejected, (state, action) => {
        const type =
          (action.payload && action.payload.type) || action.meta.arg || "movie";
        state.popular[type].loading = false;
        state.popular[type].error =
          (action.payload && action.payload.error) || action.error.message;
      })
      // Top Rated (movie/tv)
      .addCase(getTopRatedMedia.pending, (state, action) => {
        const type = action.meta.arg || "movie";
        state.topRated[type].loading = true;
        state.topRated[type].error = null;
      })
      .addCase(getTopRatedMedia.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state.topRated[type].loading = false;
        state.topRated[type].data = data.results || data;
        // console.log(state.topRated[type].data);
      })
      .addCase(getTopRatedMedia.rejected, (state, action) => {
        const type =
          (action.payload && action.payload.type) || action.meta.arg || "movie";
        state.topRated[type].loading = false;
        state.topRated[type].error =
          (action.payload && action.payload.error) || action.error.message;
      })
      // Airing Today
      .addCase(getAiringToday.pending, (state) => {
        state.airingToday.loading = true;
        state.airingToday.error = null;
      })
      .addCase(getAiringToday.fulfilled, (state, action) => {
        state.airingToday.loading = false;
        state.airingToday.data = action.payload.results || action.payload;
      })
      .addCase(getAiringToday.rejected, (state, action) => {
        state.airingToday.loading = false;
        state.airingToday.error = action.payload;
      })
      // On The Air
      .addCase(getOnTheAir.pending, (state) => {
        state.onTheAir.loading = true;
        state.onTheAir.error = null;
      })
      .addCase(getOnTheAir.fulfilled, (state, action) => {
        state.onTheAir.loading = false;
        state.onTheAir.data = action.payload.results || action.payload;
      })
      .addCase(getOnTheAir.rejected, (state, action) => {
        state.onTheAir.loading = false;
        state.onTheAir.error = action.payload;
      })
      // Genres
      .addCase(getGenres.pending, (state) => {
        state.genres.loading = true;
        state.genres.error = null;
      })
      .addCase(getGenres.fulfilled, (state, action) => {
        state.genres.loading = false;
        state.genres.data = action.payload;
      })
      .addCase(getGenres.rejected, (state, action) => {
        state.genres.loading = false;
        state.genres.error = action.payload;
      });
  },
});

export default mediaSlice.reducer;
