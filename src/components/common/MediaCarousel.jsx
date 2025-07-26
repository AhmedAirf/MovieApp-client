import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MediaCarousel = ({ items, mediaType = "movie", theme = "dark" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance slides when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(items.length, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Avoid rendering if no items
  if (!items || items.length === 0) return null;

  return (
    <div
      className={`relative h-[65vh] w-full overflow-hidden ${
        theme === "dark" ? "" : "bg-gray-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {items.slice(0, 5).map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Gradient overlays */}
            <div
              className={`absolute inset-0 z-10 ${
                theme === "dark"
                  ? "bg-gradient-to-t from-black via-black/30 to-transparent"
                  : "bg-gradient-to-t from-gray-300/0 via-gray-200/0 to-transparent"
              }`}
            ></div>
            <div
              className={`absolute inset-0 z-10 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-black via-black/40 to-transparent"
                  : "bg-gradient-to-r from-gray-400/0 via-gray-200/0 to-transparent"
              }`}
            ></div>

            {/* Background image */}
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt={item.title || item.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-backdrop.jpg";
              }}
            />

            {/* Content */}
            <div className="absolute bottom-10 left-0 z-20 p-8 max-w-2xl">
              <h1
                className={`text-3xl md:text-5xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-200"
                }`}
              >
                {item.title || item.name}
              </h1>
              <p
                className={`text-sm md:text-base mb-4 line-clamp-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-200"
                }`}
              >
                {item.overview}
              </p>
              <div className="flex space-x-4">
                <Link
                  to={`/${mediaType}/${item.id}`}
                  className={`px-4 py-1 md:px-6 md:py-2 rounded-md font-semibold flex items-center hover:bg-opacity-80 transition ${
                    theme === "dark"
                      ? "bg-white text-black"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Details
                </Link>
                <button
                  className={`px-4 py-1 md:px-6 md:py-2 rounded-md font-semibold flex items-center transition ${
                    theme === "dark"
                      ? "bg-gray-600 bg-opacity-70 text-white hover:bg-opacity-50"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  My List
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
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
    </div>
  );
};

export default MediaCarousel;
