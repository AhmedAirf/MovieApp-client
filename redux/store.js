import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import uiReducer from "./slices/uiSlice";
import searchReducer from "./slices/searchSlice";
import mediaDetailsReducer from "./slices/mediaDetailsSlice";
import userReducer from "./slices/userSlice";
import adminReducer from "./slices/adminSlice";
// import movieReducer from "./slices/mediaSlice";
// import watchlistReducer from "./slices/watchlistSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    search: searchReducer,
    mediaDetails: mediaDetailsReducer,
    user: userReducer,
    admin: adminReducer,
    // movies: movieReducer,
    // watchlist: watchlistReducer,
  },
});

export default Store;
