import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { selectIsAuthenticated } from "./../../../redux/slices/authslice";
import { useSelector } from "react-redux";
import UnauthenticatedAlert from "./UnauthenticatedAlert";
import { useWatchlist } from "../../hooks/useWatchlist";

const MediaCarousel = ({
  items,
  theme = "dark",
  onCurrentItemChange,
  mediaType = "movie",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  // Auto-advance slides when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(items?.length, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, items?.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Notify parent component when current item changes
  useEffect(() => {
    if (onCurrentItemChange && items && items.length > 0) {
      onCurrentItemChange(items[currentIndex]);
    }
  }, [currentIndex, items, onCurrentItemChange]);

  // Avoid rendering if no items
  if (!items || items.length === 0) return null;

  const handleAuthAlert = () => {
    if (!isAuthenticated) {
      setShowAuthAlert(true);
      return false; // Prevent navigation
    }
    return true; // Allow navigation
  };

  const handleWatchlistClick = () => {
    if (!isAuthenticated) {
      setShowAuthAlert(true);
      return;
    }

    const currentItem = items[currentIndex];
    // Ensure the item has media_type field
    const itemWithType = {
      ...currentItem,
      media_type: currentItem.media_type || mediaType, // Use the mediaType prop
    };
    toggleWatchlist(itemWithType);
  };

  return (
    <div
      className={`relative w-full h-[45vh] md:h-[70vh] lg:h-[85vh] xl:h-[90vh] overflow-hidden ${
        theme === "dark" ? "" : "bg-gray-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div className="relative h-full w-full flex">
        {items.slice(0, 5).map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Enhanced gradient overlay - stronger at top for header contrast */}
            <div
              className={`absolute inset-0 z-10 ${
                theme === "dark"
                  ? "bg-gradient-to-t from-black via-black/40 to-transparent"
                  : "bg-transparent"
              }`}
            ></div>
            <div
              className={`absolute top-0 h-32 w-full z-10 ${
                theme === "dark"
                  ? "bg-gradient-to-b from-black to-transparent"
                  : "bg-transparent"
              }`}
            ></div>
            <div
              className={`absolute inset-0 z-10 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-black via-black/40 to-transparent"
                  : "bg-transparent"
              }`}
            ></div>
            {/* Background image */}
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt={item.title || item.name || "Media item"}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-backdrop.jpg";
              }}
            />

            {/* Content */}
            <div className="absolute bottom-20 sm:bottom-16 md:bottom-10 left-0 z-20 p-4 sm:p-6 md:p-8 max-w-2xl">
              <h1
                className={`text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-200"
                }`}
              >
                {item.title || item.name || ""}
              </h1>
              <p
                className={`text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-200"
                }`}
              >
                {item.overview || "No description available"}
              </p>
            </div>

            {/* Buttons */}
            <div className="absolute   bottom-10 md:bottom-2 left-4 md:left-8 z-30 flex   sm:flex-row gap-3 md:gap-4 lg:gap-6  sm:w-auto max-w-xs sm:max-w-none">
              {isAuthenticated ? (
                <Link
                  to={`/media/${mediaType}/${item.id}`}
                  className="w-full sm:w-auto"
                >
                  <Button className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 border border-white/20 backdrop-blur-sm">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="relative">
                      Details
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={handleAuthAlert}
                  className="group w-full sm:w-auto bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 border border-white/20 backdrop-blur-sm"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="relative">
                    Details
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Button>
              )}
              <Button
                onClick={handleWatchlistClick}
                size="sm"
                className={`group w-full sm:w-auto text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 border border-white/20 backdrop-blur-sm ${
                  isInWatchlist(items[currentIndex]?.id)
                    ? "bg-green-700    hover:bg-green-800  text-white"
                    : "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
                }`}
              >
                {isInWatchlist(items[currentIndex]?.id) ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <span className="relative">
                  <span className="hidden sm:inline">
                    {isInWatchlist(items[currentIndex]?.id)
                      ? "Remove from "
                      : "Add to "}
                  </span>
                  Watchlist
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {items.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? theme === "dark"
                  ? "w-6 bg-white"
                  : "w-6 bg-black"
                : theme === "dark"
                ? "w-2 bg-white/50"
                : "w-2 bg-black/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auth Alert */}
      {showAuthAlert && (
        <UnauthenticatedAlert
          isOpen={showAuthAlert}
          onClose={() => setShowAuthAlert(false)}
        />
      )}
    </div>
  );
};

export default MediaCarousel;
