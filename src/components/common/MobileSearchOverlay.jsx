import React from "react";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import SearchResults from "./SearchResults";

const MobileSearchOverlay = ({
  currentQuery,
  onSearchChange,
  onSearchSubmit,
  onClose,
  searchResults,
  searchLoading,
  searchHistory,
  onSearchResultClick,
  onHistoryClick,
  userLayout = false,
}) => {
  const theme = useSelector((state) => state.ui.theme);

  return (
    <div className="fixed inset-0 z-[99998] lg:hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={onClose}
      ></div>

      {/* Search content */}
      <div className="relative z-[99999] flex items-start justify-center p-4 pt-20">
        <div className="w-full max-w-xl search-container search-input-area">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <IconButton
              variant="text"
              size="lg"
              aria-label="Close search"
              className="text-white hover:text-red-400"
              onClick={onClose}
            >
              <XMarkIcon className="h-8 w-8" />
            </IconButton>
          </div>

          <form
            onSubmit={onSearchSubmit}
            className="relative flex items-center w-full mb-4"
          >
            <input
              type="text"
              className={`border rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-lg shadow-lg transition-all duration-200 ${
                userLayout
                  ? theme === "dark"
                    ? "border-gray-600 bg-gray-800/90 text-white placeholder-gray-400 focus:bg-gray-800 focus:border-red-500 backdrop-blur-lg"
                    : "border-gray-300 bg-white/90 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-red-500 backdrop-blur-lg"
                  : theme === "dark"
                  ? "border-gray-700 bg-gray-900 text-white placeholder-gray-400"
                  : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Search movies, shows, people..."
              value={currentQuery}
              onChange={onSearchChange}
              autoFocus
            />
            <IconButton
              variant="text"
              size="lg"
              aria-label="Close search"
              className={`absolute right-2 ${
                theme === "dark"
                  ? "text-white"
                  : userLayout
                  ? "text-gray-900"
                  : "text-gray-600"
              }`}
              onClick={onClose}
            >
              <XMarkIcon className="h-7 w-7" />
            </IconButton>
          </form>

          {/* Mobile Search Results */}
          {(searchLoading ||
            searchResults?.data?.length > 0 ||
            searchHistory.length > 0) && (
            <SearchResults
              currentQuery={currentQuery}
              searchResults={searchResults}
              searchLoading={searchLoading}
              searchHistory={searchHistory}
              onSearchResultClick={onSearchResultClick}
              onHistoryClick={onHistoryClick}
              maxResults={8}
              isDesktop={false}
              userLayout={userLayout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
