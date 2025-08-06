import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NavigationSectionArrows = ({
  onScrollLeft,
  onScrollRight,
  theme = "dark",
  className = "",
}) => {
  return (
    <>
      <button
        onClick={onScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${className} ${
          theme === "dark"
            ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
            : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
        }`}
        aria-label="Scroll left"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      <button
        onClick={onScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${className} ${
          theme === "dark"
            ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
            : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
        }`}
        aria-label="Scroll right"
      >
        <FaChevronRight className="text-xl" />
      </button>
    </>
  );
};

export default NavigationSectionArrows;
