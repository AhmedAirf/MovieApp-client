import { useState, useEffect } from "react";

const MediaCarousel = ({ items, theme = "dark", onCurrentItemChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      className={`relative w-full h-[45vh] md:h-[70vh] lg:h-[85vh] xl:h-[90vh] overflow-hidden ${
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
            <div className="absolute bottom-10 left-0 z-20 p-8 max-w-2xl">
              <h1
                className={`text-xl  md:text-5xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-200"
                }`}
              >
                {item.title || item.name || ""}
              </h1>
              <p
                className={`text-sm md:text-base mb-4 line-clamp-3 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-200"
                }`}
              >
                {item.overview || "No description available"}
              </p>
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
    </div>
  );
};

export default MediaCarousel;
