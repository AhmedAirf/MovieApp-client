import React, { useRef } from "react";
import MediaCard from "./MediaCard";
import SectionLoader from "./SectionLoader";
import NavigationSectionArrows from "./NavigationSectionArows";

const MediaSection = ({
  title,
  data,
  loading,
  genres,
  mediaType = "movie",
  isAuthenticated,
  theme,
  maxItems = 20,
  showRanking = false,
  className = "",
}) => {
  const sectionRef = useRef(null);

  // Scroll functions for the section
  const scrollSection = (direction) => {
    if (sectionRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      sectionRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => scrollSection("left");
  const handleScrollRight = () => scrollSection("right");

  return (
    <section className={`mb-12 relative ${className}`}>
      <h2
        className={`text-2xl md:text-3xl font-bold mb-6 flex items-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        <span className="bg-red-600 h-8 w-1 mr-3"></span>
        {title}
      </h2>
      <div className="relative">
        <NavigationSectionArrows
          onScrollLeft={handleScrollLeft}
          onScrollRight={handleScrollRight}
          theme={theme}
        />

        {loading ? (
          <SectionLoader count={maxItems} />
        ) : showRanking ? (
          // Special layout for trending section with ranking
          <div
            ref={sectionRef}
            className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          >
            <ul className="flex flex-row items-center gap-4 w-max">
              {data?.slice(0, maxItems).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 w-full min-w-[230px]"
                >
                  <li
                    className={`text-9xl font-light -mr-8 flex items-center justify-center ${
                      theme === "dark" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    <p>{index + 1}</p>
                  </li>
                  <MediaCard
                    media={item}
                    genres={genres}
                    media_type={item.media_type || mediaType}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              ))}
            </ul>
          </div>
        ) : (
          // Standard layout for other sections
          <div
            ref={sectionRef}
            className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          >
            <div className="flex space-x-4 px-4 md:px-8 w-max">
              {data?.slice(0, maxItems).map((item) => (
                <div key={item.id} className="flex-none w-40 sm:w-48">
                  <MediaCard
                    media={item}
                    genres={genres}
                    media_type={mediaType}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaSection;
