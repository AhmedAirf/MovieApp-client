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
  userLayout = false,
}) => {
  const theme = useSelector((state) => state.ui.theme);
  const navigate = useNavigate();

  const containerClass = isDesktop
    ? `absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl border z-[99999] max-h-96 overflow-y-auto backdrop-blur-lg ${
        userLayout
          ? theme === "dark"
            ? "bg-gray-800/95 border-gray-600/50 shadow-2xl"
            : "bg-white/95 border-gray-200/50 shadow-2xl"
          : theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`
    : `rounded-xl shadow-lg border max-h-96 overflow-y-auto ${
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
              className={`${itemClass} cursor-pointer flex items-center gap-3 rounded-lg transition-all duration-200 ${
                userLayout
                  ? theme === "dark"
                    ? "hover:bg-gray-700/60 hover:shadow-md"
                    : "hover:bg-gray-50/80 hover:shadow-sm"
                  : theme === "dark"
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onSearchResultClick(item)}
            >
              <img
                src={
                  item.media_type === "person"
                    ? item.profile_path
                      ? `https://image.tmdb.org/t/p/w92${item.profile_path}`
                      : `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiB2aWV3Qm94PSIwIDAgOTIgMTM4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiBmaWxsPSIjMzc0MTUxIi8+CjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxwYXRoIGQ9Ik0yMCAxMDBDMjAgODcuMjk3NCAzMC4yOTc0IDc3IDQzIDc3SDQ5QzYxLjcwMjYgNzcgNzIgODcuMjk3NCA3MiAxMDBWMTM4SDIwVjEwMFoiIGZpbGw9IiM2QjcyODQiLz4KPHN2Zz4K`
                    : item.poster_path
                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                    : `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiB2aWV3Qm94PSIwIDAgOTIgMTM4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjIwIiB5PSIzMCIgd2lkdGg9IjUyIiBoZWlnaHQ9IjM4IiByeD0iNCIgZmlsbD0iIzZCNzI4NCIvPgo8Y2lyY2xlIGN4PSI0NiIgY3k9IjkwIiByPSIxMiIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K`
                }
                alt={item.title || item.name}
                className={`${imageClass} object-cover rounded ${
                  item.media_type === "person" ? "rounded-full" : ""
                }`}
                onError={(e) => {
                  e.target.src =
                    item.media_type === "person"
                      ? `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiB2aWV3Qm94PSIwIDAgOTIgMTM4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiBmaWxsPSIjMzc0MTUxIi8+CjxjaXJjbGUgY3g9IjQ2IiBjeT0iNTAiIHI9IjIwIiBmaWxsPSIjNkI3Mjg0Ii8+CjxwYXRoIGQ9Ik0yMCAxMDBDMjAgODcuMjk3NCAzMC4yOTc0IDc3IDQzIDc3SDQ5QzYxLjcwMjYgNzcgNzIgODcuMjk3NCA3MiAxMDBWMTM4SDIwVjEwMFoiIGZpbGw9IiM2QjcyODQiLz4KPHN2Zz4K`
                      : `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiB2aWV3Qm94PSIwIDAgOTIgMTM4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iOTIiIGhlaWdodD0iMTM4IiBmaWxsPSIjMzc0MTUxIi8+CjxyZWN0IHg9IjIwIiB5PSIzMCIgd2lkdGg9IjUyIiBoZWlnaHQ9IjM4IiByeD0iNCIgZmlsbD0iIzZCNzI4NCIvPgo8Y2lyY2xlIGN4PSI0NiIgY3k9IjkwIiByPSIxMiIgZmlsbD0iIzZCNzI4NCIvPgo8L3N2Zz4K`;
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
                  {item.media_type === "person"
                    ? `Person • ${item.known_for_department || "Actor"}`
                    : item.media_type === "tv"
                    ? "TV Show"
                    : "Movie"}
                  {item.media_type !== "person" &&
                    (item.release_date || item.first_air_date) &&
                    ` • ${new Date(
                      item.release_date || item.first_air_date
                    ).getFullYear()}`}
                </div>
              </div>
            </div>
          ))}
          {searchResults.data.length > maxResults && (
            <div
              className={`p-3 text-center cursor-pointer border-t rounded-b-xl transition-all duration-200 ${
                userLayout
                  ? theme === "dark"
                    ? "text-red-400 hover:bg-gray-700/60 border-gray-600/50 hover:text-red-300"
                    : "text-red-600 hover:bg-red-50/80 border-gray-200/50 hover:text-red-700"
                  : theme === "dark"
                  ? "text-red-400 hover:bg-gray-700 border-gray-700"
                  : "text-red-600 hover:bg-gray-50 border-gray-200"
              }`}
              onClick={() => {
                navigate(`/search?q=${encodeURIComponent(currentQuery)}`);
              }}
            >
              <span className="font-medium">
                View all {searchResults.data.length} results
              </span>
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
