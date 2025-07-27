import React from "react";
import { Link } from "react-router-dom";

const MediaCard = ({
  media,
  genres = [],
  className = "",
  media_type = "movie" || "tv", // movie or tv
}) => {
  if (!media) return null;

  // Fix: Use TMDB image base URL if poster_path exists
  const posterUrl =
    media.imageUrl ||
    (media.poster_path
      ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23f3f4f6'/%3E%3Ctext x='150' y='200' font-family='Arial, sans-serif' font-size='16' fill='%236b7280' text-anchor='middle'%3ENo Image%3C/text%3E%3Ctext x='150' y='220' font-family='Arial, sans-serif' font-size='14' fill='%239ca3af' text-anchor='middle'%3EAvailable%3C/text%3E%3C/svg%3E");

  // Map genre_ids to genre names
  let genreNames = [];
  if (Array.isArray(media.genre_ids) && genres && genres.length > 0) {
    genreNames = media.genre_ids
      .map((id) => {
        const found = genres.find((g) => g.id === id);
        return found ? found.name : null;
      })
      .filter(Boolean);
  } else if (
    Array.isArray(media.genres) &&
    typeof media.genres[0] === "string"
  ) {
    genreNames = media.genres;
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:z-10 w-full ${className}`}
    >
      {/* Movie Poster */}
      <Link to={`/media/${media_type}/${media.id}`}>
        <div className="relative pb-[150%]">
          {" "}
          {/* 2:3 aspect ratio */}
          <img
            src={posterUrl}
            alt={media.title || media.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23f3f4f6'/%3E%3Ctext x='150' y='200' font-family='Arial, sans-serif' font-size='16' fill='%236b7280' text-anchor='middle'%3ENo Image%3C/text%3E%3Ctext x='150' y='220' font-family='Arial, sans-serif' font-size='14' fill='%239ca3af' text-anchor='middle'%3EAvailable%3C/text%3E%3C/svg%3E";
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
          {/* Top Info Overlay - Only visible on hover */}
          <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="text-[10px] sm:text-xs bg-gray-800 text-gray-300 px-1 py-0.5 rounded border border-gray-700">
                  {media.rating || media.vote_average || "NR"}
                </span>
                <span className="text-[10px] sm:text-xs bg-gray-800 text-gray-300 px-1 py-0.5 rounded border border-gray-700">
                  {media.original_language}
                </span>
              </div>
            </div>
          </div>
          {/* Bottom Info Overlay - Only visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg line-clamp-1">
                  {media.title || media.name}
                </h3>
                <p className="text-gray-300 text-[10px] sm:text-xs mt-0.5">
                  {media.year ||
                    (media.release_date && media.release_date.slice(0, 4)) ||
                    ""}{" "}
                  {" | "}
                  {genreNames.length > 0
                    ? genreNames.slice(0, 2).join(", ")
                    : ""}
                </p>
              </div>
              <button className="bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full p-1 sm:p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-300 text-[10px] sm:text-xs mt-1 line-clamp-2">
              {media.description || media.overview}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MediaCard;

//
