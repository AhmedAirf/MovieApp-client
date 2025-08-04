/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
  optimisticAddToWatchlist,
  optimisticRemoveFromWatchlist,
  clearWatchlistState,
  selectWatchlistItems,
  selectWatchlistLoading,
  selectWatchlistError,
  selectWatchlistTotalItems,
  selectIsInWatchlist,
  selectWatchlistLastUpdated,
} from "../../redux/slices/watchlistSlice";

export const useWatchlist = () => {
  const dispatch = useDispatch();

  // Selectors
  const items = useSelector(selectWatchlistItems);
  const loading = useSelector(selectWatchlistLoading);
  const error = useSelector(selectWatchlistError);
  const totalItems = useSelector(selectWatchlistTotalItems);
  const lastUpdated = useSelector(selectWatchlistLastUpdated);

  // Actions
  const fetchUserWatchlist = useCallback(() => {
    return dispatch(fetchWatchlist());
  }, [dispatch]);

  const addItem = useCallback(
    (mediaItem) => {
      // Optimistically add to UI
      dispatch(optimisticAddToWatchlist(mediaItem));
      // Then make API call
      return dispatch(addToWatchlist(mediaItem));
    },
    [dispatch]
  );

  const removeItem = useCallback(
    (mediaId, mediaType) => {
      // Optimistically remove from UI
      dispatch(optimisticRemoveFromWatchlist({ mediaId, mediaType }));
      // Then make API call
      return dispatch(removeFromWatchlist({ mediaId, mediaType }));
    },
    [dispatch]
  );

  const clearAll = useCallback(() => dispatch(clearWatchlist()), [dispatch]);
  const clearState = useCallback(
    () => dispatch(clearWatchlistState()),
    [dispatch]
  );

  // Get the watchlist status from state
  const watchlistStatus = useSelector(
    (state) => state.watchlist.watchlistStatus
  );

  // Helper function to check if an item is in watchlist
  const isInWatchlist = (mediaId) => {
    return watchlistStatus[mediaId] || false;
  };

  // Helper function to toggle watchlist status
  const toggleWatchlist = useCallback(
    (mediaItem) => {
      const currentStatus = isInWatchlist(mediaItem.id);
      if (currentStatus) {
        return removeItem(
          mediaItem.id,
          mediaItem.media_type || mediaItem.mediaType
        );
      } else {
        return addItem(mediaItem);
      }
    },
    [isInWatchlist, removeItem, addItem]
  );

  return {
    // State
    items,
    loading,
    error,
    totalItems,
    lastUpdated,

    // Actions
    fetchUserWatchlist,
    addItem,
    removeItem,
    clearAll,
    clearState,
    toggleWatchlist,

    // Helpers
    isInWatchlist,
  };
};
