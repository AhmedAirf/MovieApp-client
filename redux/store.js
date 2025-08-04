import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import uiReducer from "./slices/uiSlice";
import searchReducer from "./slices/searchSlice";
import mediaDetailsReducer from "./slices/mediaDetailsSlice";
import adminReducer from "./slices/adminSlice";
import mediaReducer from "./slices/mediaSlice";
import watchlistReducer from "./slices/watchlistSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    search: searchReducer,
    mediaDetails: mediaDetailsReducer,
    admin: adminReducer,
    media: mediaReducer,
    watchlist: watchlistReducer,
  },
});

export default Store;
