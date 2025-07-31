import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTvShows, getGenres } from "../../../redux/slices/mediaSlice";
import { selectIsAuthenticated } from "../../../redux/slices/authslice";
import MediaCard from "../../components/common/MediaCard";
import Loader from "../../components/common/loader";
import Pagination from "../../components/common/Pagination";
import MediaCarousel from "./../../components/common/MediaCarousel";
import PublicHeader from "../../components/common/PublicHeader";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Tv = () => {
  const dispatch = useDispatch();
  const {
    data: tvShows,
    loading,
    error,
  } = useSelector((state) => state.media.tvShows);
  const genres = useSelector((state) => state.media.genres.data);
  const theme = useSelector((state) => state.ui.theme);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [page, setPage] = useState(1);
  const tvPerPage = 20;
  const totalPages = Math.ceil((tvShows?.length || 0) / tvPerPage);
  const pagedTvShows = tvShows?.slice((page - 1) * tvPerPage, page * tvPerPage);
  const [currentCarouselItem, setCurrentCarouselItem] = useState(null);
  useEffect(() => {
    dispatch(getAllTvShows());
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
        <MediaCarousel
          items={tvShows}
          mediaType="tv"
          theme={theme}
          onCurrentItemChange={setCurrentCarouselItem}
        />
        <div className=" bottom-12 left-8 z-10 flex gap-3 relative ">
          {currentCarouselItem?.id && (
            <Link to={`/media/tv/${currentCarouselItem.id}`}>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Details
              </button>
            </Link>
          )}
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
            <FaPlus className="w-5 h-5" />
            Add to Watchlist
          </button>
        </div>
      </div>

      {/* Header remains absolute positioned */}
      <div className="absolute top-0 left-0 w-full z-50">
        <PublicHeader transparent />
      </div>
      {/* Content Area - Starts below hero */}
      <div className="relative    ">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            Popular on Flicksy
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pagedTvShows?.map((tvShow, index) => (
              <MediaCard
                key={index}
                media={tvShow}
                genres={genres}
                media_type="tv"
                isAuthenticated={isAuthenticated}
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

export default Tv;
