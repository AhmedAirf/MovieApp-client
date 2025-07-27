import React from "react";
import { useSelector } from "react-redux";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ page, setPage, totalPages }) => {
  const theme = useSelector((state) => state.ui.theme);
  if (totalPages <= 1) return null;

  // Helper to generate page numbers (show up to 5 pages, with ellipsis if needed)
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }
    if (page >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const pageNumbers = getPageNumbers();

  // Theme-based styles
  const isDark = theme === "dark";
  const activeColor = isDark ? "bg-red-600 text-white" : "bg-black text-white";
  const inactiveColor = isDark
    ? "bg-black text-red-600 border border-red-600"
    : "bg-white text-black border border-black";
  const iconColor = isDark ? "text-red-600" : "text-black";

  return (
    <div className="flex items-center gap-2">
      <IconButton
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`rounded-full ${inactiveColor}`}
      >
        <ArrowLeftIcon className={`h-5 w-5 ${iconColor}`} />
      </IconButton>
      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-gray-400 select-none"
          >
            ...
          </span>
        ) : (
          <IconButton
            key={num}
            onClick={() => setPage(num)}
            className={`rounded-full ${
              page === num ? activeColor : inactiveColor
            }`}
          >
            {num}
          </IconButton>
        )
      )}
      <IconButton
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`rounded-full ${inactiveColor}`}
      >
        <ArrowRightIcon className={`h-5 w-5 ${iconColor}`} />
      </IconButton>
    </div>
  );
};

export default Pagination;
