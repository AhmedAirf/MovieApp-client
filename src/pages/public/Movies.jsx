import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies, getGenres } from "../../../redux/slices/mediaSlice";
import { selectIsAuthenticated } from "../../../redux/slices/authslice";
import MediaCard from "../../components/common/MediaCard";
import Loader from "../../components/common/loader";
import Pagination from "../../components/common/Pagination";
import MediaCarousel from "./../../components/common/MediaCarousel";
import PublicHeader from "../../components/common/PublicHeader";

const Movies = () => {
  const dispatch = useDispatch();
  const {
    data: movies,
    loading,
    error,
  } = useSelector((state) => state.media.movies);
  const genres = useSelector((state) => state.media.genres.data);
  const theme = useSelector((state) => state.ui.theme);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [page, setPage] = useState(1);
  const moviesPerPage = 20;
  const totalPages = Math.ceil((movies?.length || 0) / moviesPerPage);
  const pagedMovies = movies?.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getGenres());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Hero section with adjusted height */}
      <div className=" top-0 left-0 w-full h-[45vh] md:h-[70vh] lg:h-[85vh] xl:h-[90vh] z-0 relative">
        <MediaCarousel items={movies} mediaType="movie" theme={theme} />
      </div>

      {/* Header remains absolute positioned */}
      <div className="absolute top-0 left-0 w-full z-50">
        <PublicHeader transparent />
      </div>

      {/* Content Area - Starts below hero */}
      <div className="relative    ">
        <div className="container mx-auto px-4 py-8">
          <h2
            className={`text-xl md:text-2xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Popular on Flicksy
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pagedMovies?.map((movie, index) => (
              <MediaCard
                key={index}
                media={movie}
                genres={genres}
                media_type="movie"
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 mb-8">
              <div
                className={`p-4 rounded-xl shadow-lg w-fit ${
                  theme === "dark"
                    ? "bg-gray-900"
                    : "bg-white border border-gray-200"
                }`}
              >
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
