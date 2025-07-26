import React from "react";

const MovieCard = ({ movie, genres = [], className = "" }) => {
  if (!movie) return null;

  // Fix: Use TMDB image base URL if poster_path exists
  const posterUrl =
    movie.imageUrl ||
    (movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=Movie+Poster");

  // Map genre_ids to genre names
  let genreNames = [];
  if (Array.isArray(movie.genre_ids) && genres && genres.length > 0) {
    genreNames = movie.genre_ids
      .map((id) => {
        const found = genres.find((g) => g.id === id);
        return found ? found.name : null;
      })
      .filter(Boolean);
  } else if (
    Array.isArray(movie.genres) &&
    typeof movie.genres[0] === "string"
  ) {
    genreNames = movie.genres;
  }

  return (
    <div
      className={`relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:z-10 w-full ${className}`}
    >
      {/* Movie Poster */}
      <div className="relative pb-[150%]">
        {" "}
        {/* 2:3 aspect ratio */}
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        {/* Top Info Overlay - Only visible on hover */}
        <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              <span className="text-[10px] sm:text-xs bg-gray-800 text-gray-300 px-1 py-0.5 rounded border border-gray-700">
                {movie.rating || movie.vote_average || "NR"}
              </span>
              <span className="text-[10px] sm:text-xs bg-gray-800 text-gray-300 px-1 py-0.5 rounded border border-gray-700">
                {movie.original_language}
              </span>
            </div>
          </div>
        </div>
        {/* Play Button - Only visible on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 sm:p-3 shadow-lg transform transition hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {/* Bottom Info Overlay - Only visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base md:text-lg line-clamp-1">
                {movie.title || movie.name}
              </h3>
              <p className="text-gray-300 text-[10px] sm:text-xs mt-0.5">
                {movie.year ||
                  (movie.release_date && movie.release_date.slice(0, 4)) ||
                  ""}{" "}
                {" | "}
                {genreNames.length > 0 ? genreNames.slice(0, 2).join(", ") : ""}
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
            {movie.description || movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
