import React from "react";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { setShowResults } from "../../../redux/slices/searchSlice";
import SearchResults from "./SearchResults";

const SearchInput = ({
  currentQuery,
  onSearchChange,
  onSearchSubmit,
  onClose,
  showResults,
  searchResults,
  searchLoading,
  searchHistory,
  onSearchResultClick,
  onHistoryClick,
  userLayout = false,
  autoFocus = false,
}) => {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  return (
    <div className="relative search-container search-input-area group z-[99999]">
      <form
        onSubmit={onSearchSubmit}
        className="relative flex items-center w-full lg:w-auto"
      >
        {userLayout && (
          <MagnifyingGlassIcon
            className={`absolute left-3 h-5 w-5 pointer-events-none ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
        )}
        <input
          type="text"
          className={`border rounded-lg py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 w-full lg:w-72 transition-all duration-200 shadow-sm ${
            userLayout ? "pl-10 pr-12" : "px-4"
          } ${
            userLayout
              ? theme === "dark"
                ? "border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800 focus:border-red-500"
                : "border-gray-300 bg-white/80 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-red-500 backdrop-blur-sm"
              : theme === "dark"
              ? "border-gray-700 bg-gray-900 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
          placeholder="Search movies, shows, people..."
          value={currentQuery}
          onChange={onSearchChange}
          onFocus={() => dispatch(setShowResults(true))}
          autoFocus={autoFocus}
        />
        <IconButton
          variant="text"
          size="sm"
          aria-label="Close search"
          className={`absolute right-2 rounded-full hover:bg-gray-100/20 transition-all duration-200 ${
            userLayout
              ? theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              : theme === "dark"
              ? "text-white hover:text-gray-300"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={onClose}
        >
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <SearchResults
          currentQuery={currentQuery}
          searchResults={searchResults}
          searchLoading={searchLoading}
          searchHistory={searchHistory}
          onSearchResultClick={onSearchResultClick}
          onHistoryClick={onHistoryClick}
          maxResults={6}
          isDesktop={true}
          userLayout={userLayout}
        />
      )}
    </div>
  );
};

export default SearchInput;
