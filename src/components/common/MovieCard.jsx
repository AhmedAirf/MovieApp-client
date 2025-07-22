import React from "react";

const MovieCard = () => {
  // Mock movie data
  const movie = {
    title: "Stranger Things",
    year: 2023,
    rating: "TV-14",
    duration: "2h 15m",
    genres: ["Sci-Fi", "Horror", "Drama"],
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
    imageUrl: "https://via.placeholder.com/300x450?text=Movie+Poster",
  };

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:z-10 w-full max-w-xs mx-auto">
      {/* Movie Poster */}
      <div className="relative pb-[150%]">
        {" "}
        {/* 2:3 aspect ratio container */}
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        {/* Top Info Overlay */}
        <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-center">
            <span className="text-green-500 font-bold text-sm">98% Match</span>
            <div className="flex space-x-2">
              <span className="text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">
                {movie.rating}
              </span>
              <span className="text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700">
                {movie.duration}
              </span>
            </div>
          </div>
        </div>
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transform transition hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
        {/* Bottom Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-white font-bold text-lg">{movie.title}</h3>
              <p className="text-gray-300 text-sm mt-1">
                {movie.year} | {movie.genres.join(", ")}
              </p>
            </div>
            <button className="bg-gray-800/80 hover:bg-gray-700/90 text-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

          <p className="text-gray-300 text-xs mt-2 line-clamp-2">
            {movie.description}
          </p>
        </div>
      </div>

      {/* Badge Ribbon */}
      <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
        NEW
      </div>
    </div>
  );
};

export default MovieCard;
