import React, { useEffect, useRef, useState } from "react";
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
import MediaCard from "../../components/common/MediaCard";
import Loader from "../../components/common/loader";
import {
  FaPlay,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { selectIsAuthenticated } from "../../../redux/slices/authslice";
import { Link } from "react-router-dom";

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
    loading,
  } = useSelector((state) => state.media);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const theme = useSelector((state) => state.ui.theme);
  const [currentCarouselItem, setCurrentCarouselItem] = useState(null);

  // Refs for scrollable sections
  const trendingRef = useRef(null);
  const popularMoviesRef = useRef(null);
  const popularTVRef = useRef(null);
  const topRatedRef = useRef(null);
  const nowPlayingRef = useRef(null);
  const upcomingRef = useRef(null);
  const airingTodayRef = useRef(null);

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
  }, [dispatch]);

  // Scroll functions for each section
  const scrollSection = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      } min-h-screen`}
    >
      {/* Hero Carousel */}
      <div className="relative">
        <div className="relative">
          <MediaCarousel
            items={popular.movie?.data?.slice(0, 5)}
            theme="dark"
            className="top-0 left-0 w-full h-[45vh] md:h-[70vh] lg:h-[85vh] xl:h-[90vh] z-0 relative"
            onCurrentItemChange={setCurrentCarouselItem}
          />
          <div className=" bottom-20 left-8 z-10 flex gap-3 relative md:bottom-20 w-72 md:w-auto">
            {currentCarouselItem?.id && (
              <Link to={`/media/movie/${currentCarouselItem.id}`}>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm md:text-base px-6 py-2 md:py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
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
            <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-2 md:text-base md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-16">
        {/* Trending Now */}
        <section className=" mb-12 relative  ">
          <h2 className="text-2xl md:text-3xl font-bold mb-16 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Trending Now
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(trendingRef, "left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scrollSection(trendingRef, "right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>

            <ul
              ref={trendingRef}
              className="flex flex-row items-center gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              {trending.data?.data?.slice(0, 9).map((movie, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 w-full min-w-[230px]"
                >
                  <li className="text-9xl  font-light -mr-8  text-gray-600 flex items-center justify-center">
                    <p>{index + 1}</p>
                  </li>
                  <MediaCard
                    media={movie}
                    genres={genres.data}
                    media_type={movie.media_type || "movie"}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              ))}
            </ul>
          </div>
        </section>

        {/* Popular Movies */}
        <section className="mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Popular Movies
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(popularMoviesRef, "left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={popularMoviesRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {popular.movie?.data?.map((item) => (
                  <div key={item.id} className="flex-none w-40 sm:w-48">
                    <MediaCard
                      media={item}
                      genres={genres.data}
                      media_type="movie"
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollSection(popularMoviesRef, "right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </section>

        {/* Popular TV Shows */}
        <section className="mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Popular TV Shows
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(popularTVRef, "left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={popularTVRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {popular.tv?.data?.slice(0, 20).map((item) => (
                  <div key={item.id} className="flex-none w-40 sm:w-48 ">
                    <MediaCard
                      media={item}
                      genres={genres.data}
                      media_type="tv"
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollSection(popularTVRef, "right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </section>

        {/* Top Rated Movies */}
        <section className="mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Top Rated Movies
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(topRatedRef, "left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={topRatedRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {topRated.movie?.data?.slice(0, 20).map((item) => (
                  <div key={item.id} className="flex-none w-40 sm:w-48 ">
                    <MediaCard
                      media={item}
                      genres={genres.data}
                      media_type="movie"
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollSection(topRatedRef, "right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </section>

        {/* Now Playing */}
        <section className="mb-12 relative ">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Now Playing in Theaters
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(nowPlayingRef, "left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={nowPlayingRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {nowPlaying?.data?.slice(0, 20).map((item) => (
                  <div key={item.id} className="flex-none w-40 sm:w-48 ">
                    <MediaCard
                      media={item}
                      genres={genres.data}
                      media_type="movie"
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollSection(nowPlayingRef, "right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </section>

        {/* Upcoming Movies */}
        <section className="mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Coming Soon
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(upcomingRef, "left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={upcomingRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {upcoming?.data?.slice(0, 20).map((item) => (
                  <div key={item.id} className="flex-none w-40 sm:w-48 ">
                    <MediaCard
                      media={item}
                      genres={genres.data}
                      media_type="movie"
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollSection(upcomingRef, "right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </section>

        {/* TV Shows Airing Today */}
        <section className="mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            TV Shows Airing Today
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(airingTodayRef, "left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={airingTodayRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {airingToday?.data?.map((item) => (
                  <div key={item.id} className="flex-none w-40 sm:w-48">
                    <MediaCard
                      media={item}
                      genres={genres.data}
                      media_type="tv"
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollSection(airingTodayRef, "right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-full opacity-100 transition-opacity duration-300 hidden md:block ${
                theme === "dark"
                  ? "bg-black bg-opacity-70 hover:bg-opacity-90 text-white"
                  : "bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-900 shadow-lg"
              }`}
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
