import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWatchlist } from "../../hooks/useWatchlist";
import { selectIsAuthenticated } from "../../../redux/slices/authslice";
import MediaCard from "../../components/common/MediaCard";
import Loader from "../../components/common/loader";
import { Button } from "@material-tailwind/react";
import { FaTrash, FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const theme = useSelector((state) => state.ui.theme);
  const {
    items,
    loading,
    error,
    totalItems,
    fetchUserWatchlist,
    clearAll,
    removeItem,
  } = useWatchlist();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserWatchlist();
    }
  }, [isAuthenticated, fetchUserWatchlist]);

  const handleClearWatchlist = async () => {
    try {
      await clearAll();
      setShowClearConfirm(false);
    } catch (error) {
      console.error("Failed to clear watchlist:", error);
    }
  };

  const handleRemoveItem = async (mediaId, mediaType) => {
    try {
      await removeItem(mediaId, mediaType);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <FaHeart className="mx-auto text-6xl text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4">
            Sign in to view your watchlist
          </h1>
          <p className="text-gray-600 mb-6">
            Create an account to save your favorite movies and TV shows
          </p>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black" : "bg-gray-50"
        }`}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading watchlist</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={fetchUserWatchlist}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <FaHeart className="text-red-500" />
              My Watchlist
            </h1>
            <p className="text-gray-600 mt-2">
              {totalItems} {totalItems === 1 ? "item" : "items"} saved
            </p>
          </div>

          {totalItems > 0 && (
            <div className="flex gap-3">
              <Button
                onClick={() => setShowClearConfirm(true)}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 flex items-center gap-2"
              >
                <FaTrash className="w-4 h-4" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {totalItems === 0 && (
          <div className="text-center py-16">
            <FaEye className="mx-auto text-8xl text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your watchlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your watchlist by adding movies and TV shows you
              want to watch later.
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Browse Movies & TV Shows
              </Button>
            </Link>
          </div>
        )}

        {/* Watchlist Items */}
        {totalItems > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${item.media_type}-${index}`}
                className="relative group"
              >
                <MediaCard
                  media={{
                    ...item,
                    id: item.id,
                    title: item.title,
                    name: item.title,
                    poster_path: item.poster_path,
                    overview: item.overview,
                    release_date: item.release_date,
                    vote_average: item.vote_average,
                  }}
                  media_type={item.media_type}
                  isAuthenticated={isAuthenticated}
                  className="w-full"
                />

                {/* Remove Button Overlay */}
                <button
                  onClick={() => handleRemoveItem(item.id, item.media_type)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                  title="Remove from watchlist"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className={`rounded-lg p-6 max-w-md w-full ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Clear Watchlist</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your watchlist?
                This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={() => setShowClearConfirm(false)}
                  variant="outlined"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClearWatchlist}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
