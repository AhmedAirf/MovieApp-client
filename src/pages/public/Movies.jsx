import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies, getGenres } from "../../../redux/slices/mediaSlice";
import MediaCard from "../../components/common/MediaCard";
import Loader from "../../components/common/loader";
import Pagination from "../../components/common/Pagination";
import MediaCarousel from "./../../components/common/MediaCarousel";

const Movies = () => {
  const dispatch = useDispatch();
  const {
    data: movies,
    loading,
    error,
  } = useSelector((state) => state.media.movies);
  const genres = useSelector((state) => state.media.genres.data);
  const theme = useSelector((state) => state.ui.theme);

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
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Hero section as true background with carousel */}
      <div className="absolute top-0 left-0 w-full h-[65vh] z-10">
        <MediaCarousel items={movies} mediaType="movie" theme={theme} />
      </div>
      {/* Content Area - Starts below hero */}
      <div className="relative pt-[65vh] z-30">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Popular on Flicksy
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pagedMovies?.map((movie, index) => (
              <MediaCard
                key={index}
                media={movie}
                genres={genres}
                media_type="movie"
              />
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 mb-8">
              <div className="bg-gray-900 p-4 rounded-xl shadow-lg w-fit">
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
