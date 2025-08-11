import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getTrending,
  getPopularMedia,
  getTopRatedMedia,
  getNowPlayingMovies,
  getUpcoming,
  getAiringToday,
  getGenres,
} from "../../../redux/slices/mediaSlice";
import MediaCarousel from "../../components/common/MediaCarousel";
import MediaSection from "../../components/common/MediaSection";
import PublicHeader from "../../components/common/PublicHeader";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { selectIsAuthenticated } from "../../../redux/slices/authslice";
import { Link } from "react-router-dom";
import { useWatchlist } from "../../hooks/useWatchlist";

const Home = () => {
  const dispatch = useDispatch();
  const {
    trending,
    popular,
    topRated,
    nowPlaying,
    upcoming,
    airingToday,
    genres,
  } = useSelector((state) => state.media);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const theme = useSelector((state) => state.ui.theme);
  // const [currentCarouselItem, setCurrentCarouselItem] = useState(null);

  // Watchlist functionality
  const { fetchUserWatchlist } = useWatchlist();

  // Refs are now handled by MediaSection component

  useEffect(() => {
    dispatch(getTrending());
    dispatch(getPopularMedia("movie"));
    dispatch(getPopularMedia("tv"));
    dispatch(getTopRatedMedia("movie"));
    dispatch(getTopRatedMedia("tv"));
    dispatch(getNowPlayingMovies());
    dispatch(getUpcoming());
    dispatch(getAiringToday());
    dispatch(getGenres());

    // Fetch user's watchlist if authenticated
    if (isAuthenticated) {
      fetchUserWatchlist();
    }
  }, [dispatch, isAuthenticated, fetchUserWatchlist]);

  // Scroll functions are now handled by MediaSection component

  // Remove global loading - we'll use individual section loading states

  return (
    <div
      className={`min-h-screen relative ${
        theme === "dark" ? "bg-black" : "bg-gray-50"
      }`}
    >
      {/* Hero section with adjusted height */}
      <div className="top-0 left-0 w-full h-[45vh] md:h-[70vh] lg:h-[85vh] xl:h-[90vh] z-0 relative">
        <MediaCarousel
          items={popular.movie?.data?.slice(0, 5)}
          mediaType="movie"
          theme={theme}
        />
      </div>

      {/* Header remains absolute positioned */}
      <div className="absolute top-0 left-0 w-full z-50">
        <PublicHeader transparent={true} />
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-16">
        {/* Trending Now */}
        <MediaSection
          title="Trending Now"
          data={trending.data?.data}
          loading={trending.loading}
          genres={genres.data}
          mediaType="movie"
          isAuthenticated={isAuthenticated}
          theme={theme}
          maxItems={9}
          showRanking={true}
          className="mb-12 mt-16"
        />

        {/* Popular Movies */}
        <MediaSection
          title="Popular Movies"
          data={popular.movie?.data}
          loading={popular.movie?.loading}
          genres={genres.data}
          mediaType="movie"
          isAuthenticated={isAuthenticated}
          theme={theme}
          maxItems={20}
        />

        {/* Popular TV Shows */}
        <MediaSection
          title="Popular TV Shows"
          data={popular.tv?.data}
          loading={popular.tv?.loading}
          genres={genres.data}
          mediaType="tv"
          isAuthenticated={isAuthenticated}
          theme={theme}
          maxItems={20}
        />

        {/* Top Rated Movies */}
        <MediaSection
          title="Top Rated Movies"
          data={topRated.movie?.data}
          loading={topRated.movie?.loading}
          genres={genres.data}
          mediaType="movie"
          isAuthenticated={isAuthenticated}
          theme={theme}
          maxItems={20}
        />

        {/* Now Playing */}
        <MediaSection
          title="Now Playing in Theaters"
          data={nowPlaying?.data}
          loading={nowPlaying?.loading}
          genres={genres.data}
          mediaType="movie"
          isAuthenticated={isAuthenticated}
          theme={theme}
          maxItems={20}
        />

        {/* Upcoming Movies */}
        <MediaSection
          title="Coming Soon"
          data={upcoming?.data}
          loading={upcoming?.loading}
          genres={genres.data}
          mediaType="movie"
          isAuthenticated={isAuthenticated}
          theme={theme}
          maxItems={20}
        />

        {/* TV Shows Airing Today */}
        <MediaSection
          title="TV Shows Airing Today"
          data={airingToday?.data}
          loading={airingToday?.loading}
          genres={genres.data}
          mediaType="tv"
          isAuthenticated={isAuthenticated}
          theme={theme}
          maxItems={20}
        />
      </div>
    </div>
  );
};

export default Home;
