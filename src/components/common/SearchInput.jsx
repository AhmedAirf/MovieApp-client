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
    <div className="relative search-container search-input-area">
      <form
        onSubmit={onSearchSubmit}
        className="relative flex items-center w-full lg:w-auto"
      >
        <input
          type="text"
          className={`border rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 w-full lg:w-64 transition-all duration-200 ${
            theme === "dark"
              ? "border-gray-700 bg-gray-900 text-white"
              : "border-gray-300 bg-white text-gray-900"
          }`}
          placeholder="Search movies, series..."
          value={currentQuery}
          onChange={onSearchChange}
          onFocus={() => dispatch(setShowResults(true))}
          autoFocus={autoFocus}
        />
        <IconButton
          variant="text"
          size="sm"
          aria-label="Close search"
          className={`absolute right-1 ${
            theme === "dark"
              ? "text-white"
              : userLayout
              ? "text-gray-900"
              : "text-gray-600"
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
        />
      )}
    </div>
  );
};

export default SearchInput;
