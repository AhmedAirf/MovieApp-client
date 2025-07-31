import React, { useEffect, useRef } from "react";
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

const Home = () => {
  const dispatch = useDispatch();
  const {
    popular,
    topRated,
    nowPlaying,
    upcoming,
    airingToday,
    genres,
    loading,
  } = useSelector((state) => state.media);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Refs for scrollable sections

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
    <div className="bg-black text-white min-h-screen">
      {/* Hero Carousel */}
      <div className="relative">
        <MediaCarousel items={popular.movie?.data?.slice(0, 5)} theme="dark" />
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 pb-16">
        {/* Trending Now with Numbers */}
        {/* <section className="mb-12 relative group">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Trending Now
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(trendingRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={trendingRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {trending.data?.data?.slice(0, 10).map((item, index) => (
                  <div
                    key={item.id}
                    className="relative group/item flex-none w-40 sm:w-48 md:w-56 lg:w-64 transition-transform hover:scale-105"
                  >
                    <div className="absolute -left-2 -top-2 z-10 bg-red-600 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-md shadow-lg">
                      {index + 1}
                    </div>
                    <MediaCard
                      media={item}
                      genres={genres.data}
                      media_type={item.media_type || "movie"}
                      className="hover:border-red-600 hover:border-2 transition-all"
                      isAuthenticated={isAuthenticated}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollSection(trendingRef, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        </section> */}

        {/* Popular Movies */}
        <section className="mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <span className="bg-red-600 h-8 w-1 mr-3"></span>
            Popular Movies
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollSection(popularMoviesRef, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-r-full opacity-100 transition-opacity duration-300"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-l-full opacity-100 transition-opacity duration-300"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-r-full opacity-100 transition-opacity duration-300"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={popularTVRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {popular.tv?.data?.slice(0, 10).map((item) => (
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-l-full opacity-100 transition-opacity duration-300"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-r-full opacity-100 transition-opacity duration-300"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={topRatedRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {topRated.movie?.data?.slice(0, 10).map((item) => (
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-l-full opacity-100 transition-opacity duration-300"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-r-full opacity-100 transition-opacity duration-300"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={nowPlayingRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {nowPlaying?.data?.slice(0, 10).map((item) => (
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-l-full opacity-100 transition-opacity duration-300"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-r-full opacity-100 transition-opacity duration-300"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <div
              ref={upcomingRef}
              className="overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            >
              <div className="flex space-x-4 px-4 md:px-8 w-max">
                {upcoming?.data?.slice(0, 10).map((item) => (
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-l-full opacity-100 transition-opacity duration-300"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-r-full opacity-100 transition-opacity duration-300"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-70 hover:bg-opacity-90 p-2 rounded-l-full opacity-100 transition-opacity duration-300"
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
