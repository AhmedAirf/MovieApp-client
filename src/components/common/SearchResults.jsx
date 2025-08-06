import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchResults = ({
  currentQuery,
  searchResults,
  searchLoading,
  searchHistory,
  onSearchResultClick,
  onHistoryClick,
  maxResults = 6,
  isDesktop = true,
}) => {
  const theme = useSelector((state) => state.ui.theme);
  const navigate = useNavigate();

  const containerClass = isDesktop
    ? `absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`
    : `rounded-lg shadow-lg border max-h-96 overflow-y-auto ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`;

  const itemClass = isDesktop ? "p-3" : "p-4";
  const imageClass = isDesktop ? "w-10 h-14" : "w-12 h-16";
  const titleClass = isDesktop ? "font-medium" : "font-medium text-lg";
  const subtitleClass = "text-sm";

  return (
    <div className={containerClass}>
      {searchLoading && (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div>
        </div>
      )}

      {!searchLoading && currentQuery && searchResults?.data?.length > 0 && (
        <>
          <div
            className={`p-2 text-xs font-semibold ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Search Results
          </div>
          {searchResults.data.slice(0, maxResults).map((item) => (
            <div
              key={item.id}
              className={`${itemClass} hover:bg-opacity-10 hover:bg-red-500 cursor-pointer flex items-center gap-3 ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
              onClick={() => onSearchResultClick(item)}
            >
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                    : "/placeholder-poster.jpg"
                }
                alt={item.title || item.name}
                className={`${imageClass} object-cover rounded`}
                onError={(e) => {
                  e.target.src = "/placeholder-poster.jpg";
                }}
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`${titleClass} truncate ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title || item.name}
                </div>
                <div
                  className={`${subtitleClass} ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.media_type === "tv" ? "TV Show" : "Movie"} •{" "}
                  {item.release_date || item.first_air_date
                    ? new Date(
                        item.release_date || item.first_air_date
                      ).getFullYear()
                    : "N/A"}
                </div>
              </div>
            </div>
          ))}
          {searchResults.data.length > maxResults && (
            <div
              className={`p-3 text-center cursor-pointer border-t ${
                theme === "dark"
                  ? "text-red-400 hover:bg-gray-700 border-gray-700"
                  : "text-red-600 hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => {
                navigate(`/search?q=${encodeURIComponent(currentQuery)}`);
              }}
            >
              View all {searchResults.data.length} results
            </div>
          )}
        </>
      )}

      {!searchLoading && currentQuery && searchResults?.data?.length === 0 && (
        <div
          className={`p-4 text-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No results found for "{currentQuery}"
        </div>
      )}

      {!currentQuery && searchHistory.length > 0 && (
        <>
          <div
            className={`p-2 text-xs font-semibold ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Recent Searches
          </div>
          {searchHistory.slice(0, 5).map((query, index) => (
            <div
              key={index}
              className={`${itemClass} cursor-pointer flex items-center gap-2 ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
              onClick={() => onHistoryClick(query)}
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              <span
                className={theme === "dark" ? "text-white" : "text-gray-900"}
              >
                {query}
              </span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchResults;
