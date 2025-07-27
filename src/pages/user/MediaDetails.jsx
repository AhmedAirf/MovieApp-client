import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMediaDetails,
  fetchMediaCreditsAsync,
  fetchMediaVideosAsync,
  fetchMediaImagesAsync,
  fetchMediaRecommendationsAsync,
  clearMediaDetails,
} from "../../../redux/slices/mediaDetailsSlice";
import MediaCard from "../../components/common/MediaCard";
import Loader from "../../components/common/loader";
import {
  StarIcon,
  PlayIcon,
  ClockIcon,
  TvIcon,
  FilmIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const MediaDetails = () => {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const {
    currentMedia,
    credits,
    videos,
    images,
    recommendations,
    loading,
    error,
  } = useSelector((state) => state.mediaDetails);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (id && type) {
      dispatch(fetchMediaDetails({ type, id }));
      dispatch(fetchMediaCreditsAsync({ type, id }));
      dispatch(fetchMediaVideosAsync({ type, id }));
      dispatch(fetchMediaImagesAsync({ type, id }));
      dispatch(fetchMediaRecommendationsAsync({ type, id }));
    }

    return () => {
      dispatch(clearMediaDetails());
    };
  }, [dispatch, id, type]);

  // Helper functions
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGenres = () => {
    return currentMedia.genres?.map((genre) => genre.name).join(", ") || "N/A";
  };

  const getCast = () => {
    return credits.cast?.slice(0, 12) || [];
  };

  const getCrew = () => {
    const directors =
      credits.crew?.filter((person) => person.job === "Director") || [];
    const writers =
      credits.crew?.filter(
        (person) =>
          person.job === "Writer" ||
          person.job === "Screenplay" ||
          person.job === "Story"
      ) || [];
    return { directors, writers };
  };

  const getTrailer = () => {
    return videos?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
  };

  const getMediaTitle = () => {
    return currentMedia.title || currentMedia.name || "Unknown Title";
  };

  const toggleVideoModal = (video = null) => {
    setSelectedVideo(video);
    // Prevent body scroll when modal is open
    document.body.style.overflow = video ? "hidden" : "auto";
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-black" : "bg-gray-50"
        }`}
      >
        <Loader />
      </div>
    );
  }

  if (error || !currentMedia) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold mb-4">Error Loading Media</h2>
          <p className="text-gray-500 mb-6">{error || "Media not found"}</p>
          <Link
            to={type === "movie" ? "/movies" : "/tv"}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={
              currentMedia.backdrop_path
                ? `https://image.tmdb.org/t/p/original${currentMedia.backdrop_path}`
                : "/placeholder-backdrop.jpg"
            }
            alt={getMediaTitle()}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              theme === "dark" ? "bg-black/60" : "bg-white/60"
            }`}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-4 md:pb-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Poster - Hidden on small screens */}
              <div className="hidden md:block flex-shrink-0">
                <img
                  src={
                    currentMedia.poster_path
                      ? `https://image.tmdb.org/t/p/w500${currentMedia.poster_path}`
                      : "/placeholder-poster.jpg"
                  }
                  alt={getMediaTitle()}
                  className="w-40 md:w-64 h-60 md:h-96 object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  {type === "tv" ? (
                    <TvIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                  ) : (
                    <FilmIcon className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                  )}
                  <span className="text-xs md:text-sm text-gray-400">
                    {type === "tv" ? "TV Show" : "Movie"}
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4">
                  {getMediaTitle()}
                </h1>

                {currentMedia.tagline && (
                  <p className="text-sm md:text-lg italic text-gray-300 mb-2 md:mb-4">
                    "{currentMedia.tagline}"
                  </p>
                )}

                <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4 text-xs md:text-sm flex-wrap">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span>
                      {currentMedia.vote_average?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                  <span>•</span>
                  <span>
                    {new Date(
                      currentMedia.release_date || currentMedia.first_air_date
                    ).getFullYear()}
                  </span>
                  {type === "movie" && currentMedia.runtime && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        <span>{formatRuntime(currentMedia.runtime)}</span>
                      </div>
                    </>
                  )}
                  {type === "tv" && currentMedia.number_of_seasons && (
                    <>
                      <span>•</span>
                      <span>{currentMedia.number_of_seasons} Seasons</span>
                    </>
                  )}
                </div>

                <p className="text-sm md:text-lg mb-3 md:mb-6 max-w-3xl leading-relaxed line-clamp-3 md:line-clamp-none">
                  {currentMedia.overview || "No overview available."}
                </p>

                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
                  {currentMedia.genres?.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 md:gap-4 flex-wrap">
                  {getTrailer() && (
                    <button
                      onClick={() => toggleVideoModal(getTrailer())}
                      className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-6 md:py-3 bg-red-600 hover:bg-red-700 text-white rounded md:rounded-lg text-xs md:text-base font-medium md:font-semibold transition"
                    >
                      <PlayIcon className="h-3 w-3 md:h-5 md:w-5" />
                      <span>Watch Trailer</span>
                    </button>
                  )}
                  <button
                    className={`flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-6 md:py-3 rounded md:rounded-lg text-xs md:text-base font-medium md:font-semibold transition ${
                      theme === "dark"
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                    }`}
                  >
                    <StarIcon className="h-3 w-3 md:h-5 md:w-5" />
                    <span>Add to List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Tab Toggle */}
      <div className="md:hidden sticky top-0 z-20 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex justify-between items-center px-4 py-2 rounded-lg bg-gray-800 text-white"
        >
          <span className="capitalize">{activeTab}</span>
          <svg
            className={`h-5 w-5 transform transition-transform ${
              isMobileMenuOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div
          className={`border-b mb-4 md:mb-8 ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <nav className="hidden md:flex space-x-4 md:space-x-8 overflow-x-auto">
            {[
              "overview",
              "cast",
              "crew",
              "videos",
              "photos",
              "recommendations",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-xs md:text-sm capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? "border-red-600 text-red-600"
                    : theme === "dark"
                    ? "border-transparent text-gray-400 hover:text-gray-300"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden grid grid-cols-2 gap-2 mb-4">
              {[
                "overview",
                "cast",
                "crew",
                "videos",
                "photos",
                "recommendations",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded text-xs font-medium ${
                    activeTab === tab
                      ? "bg-red-600 text-white"
                      : theme === "dark"
                      ? "bg-gray-800 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                  Synopsis
                </h3>
                <p className="text-sm md:text-lg leading-relaxed mb-4 md:mb-8">
                  {currentMedia.overview || "No synopsis available."}
                </p>

                {/* Mobile Poster - Only visible on small screens */}
                <div className="md:hidden mb-4">
                  <img
                    src={
                      currentMedia.poster_path
                        ? `https://image.tmdb.org/t/p/w300${currentMedia.poster_path}`
                        : "/placeholder-poster.jpg"
                    }
                    alt={getMediaTitle()}
                    className="w-32 h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                  Details
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Type: </span>
                    <span>{type === "tv" ? "TV Show" : "Movie"}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Status: </span>
                    <span>{currentMedia.status || "N/A"}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Release: </span>
                    <span>
                      {formatDate(
                        currentMedia.release_date || currentMedia.first_air_date
                      )}
                    </span>
                  </div>
                  {type === "movie" && (
                    <div>
                      <span className="font-semibold">Runtime: </span>
                      <span>
                        {currentMedia.runtime
                          ? formatRuntime(currentMedia.runtime)
                          : "N/A"}
                      </span>
                    </div>
                  )}
                  {type === "tv" && (
                    <>
                      <div>
                        <span className="font-semibold">Seasons: </span>
                        <span>{currentMedia.number_of_seasons || "N/A"}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Episodes: </span>
                        <span>{currentMedia.number_of_episodes || "N/A"}</span>
                      </div>
                    </>
                  )}
                  <div>
                    <span className="font-semibold">Rating: </span>
                    <span>
                      {currentMedia.vote_average?.toFixed(1) || "N/A"}/10
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Genres: </span>
                    <span className="line-clamp-1">{getGenres()}</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">
                  More Info
                </h3>
                <div className="space-y-2 md:space-y-4 text-sm">
                  {currentMedia.production_companies?.length > 0 && (
                    <div>
                      <span className="font-semibold">Production: </span>
                      <span>
                        {currentMedia.production_companies
                          .map((company) => company.name)
                          .join(", ")}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">Language: </span>
                    <span>
                      {currentMedia.original_language?.toUpperCase() || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cast" && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-6 text-primary dark:text-primary-light">
                Cast
              </h3>
              {getCast().length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
                  {getCast().map((person) => (
                    <Link
                      key={person.id}
                      to={`/person/${person.id}`}
                      className="group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div
                        className={`relative aspect-[2/3] rounded-lg overflow-hidden ${
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        <img
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                              : "/placeholder-person.jpg"
                          }
                          alt={person.name}
                          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                          loading="lazy"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${
                            theme === "dark"
                              ? "from-gray-900/70 to-gray-800/30"
                              : "from-gray-900/60 to-gray-400/30"
                          }`}
                        />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 pt-6">
                        <h4
                          className={`font-bold text-sm truncate ${
                            theme === "dark" ? "text-white" : "text-black"
                          }`}
                        >
                          {person.name}
                        </h4>
                        <p
                          className={`text-xs truncate ${
                            theme === "dark" ? "text-gray-300" : "text-white"
                          }`}
                        >
                          {person.character}
                        </p>
                      </div>

                      <div
                        className={`absolute inset-0 border-2 rounded-lg border-transparent group-hover:border-${
                          theme === "dark" ? "primary-light" : "primary"
                        } transition-all duration-300`}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  className={`p-6 rounded-lg text-center ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-400"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  No cast information available
                </div>
              )}
            </div>
          )}

          {activeTab === "crew" && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
                Crew
              </h3>
              <div className="space-y-4 md:space-y-6">
                {getCrew().directors.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 md:mb-3">
                      Directors
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                      {getCrew().directors.map((person) => (
                        <div
                          key={person.id}
                          className={`p-2 rounded ${
                            theme === "dark" ? "bg-gray-800" : "bg-white shadow"
                          }`}
                        >
                          <p className="font-medium text-sm">{person.name}</p>
                          <p className="text-xs text-gray-500">{person.job}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {getCrew().writers.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2 md:mb-3">
                      Writers
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                      {getCrew()
                        .writers.slice(0, 8)
                        .map((person) => (
                          <div
                            key={`${person.id}-${person.job}`}
                            className={`p-2 rounded ${
                              theme === "dark"
                                ? "bg-gray-800"
                                : "bg-white shadow"
                            }`}
                          >
                            <p className="font-medium text-sm">{person.name}</p>
                            <p className="text-xs text-gray-500">
                              {person.job}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "videos" && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
                Videos
              </h3>
              {videos?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {videos.slice(0, 6).map((video) => (
                    <div
                      key={video.id}
                      className={`rounded overflow-hidden ${
                        theme === "dark" ? "bg-gray-800" : "bg-white shadow"
                      }`}
                    >
                      <div
                        className="aspect-video bg-gray-700 relative cursor-pointer"
                        onClick={() => toggleVideoModal(video)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-10 transition">
                          <PlayIcon className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="p-2 md:p-3">
                        <h4 className="font-semibold text-sm line-clamp-2">
                          {video.name}
                        </h4>
                        <p className="text-xs text-gray-500">{video.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No videos available.</p>
              )}
            </div>
          )}

          {activeTab === "photos" && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
                Photos
              </h3>
              {images.backdrops?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                  {images.backdrops.slice(0, 12).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-800 rounded overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt={`Backdrop ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No photos available.</p>
              )}
            </div>
          )}

          {activeTab === "recommendations" && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
                More Like This
              </h3>
              {recommendations?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
                  {recommendations.slice(0, 12).map((item) => (
                    <MediaCard
                      key={item.id}
                      media={item}
                      media_type={type}
                      className="w-full"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recommendations available.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 md:p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => toggleVideoModal(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-500 z-50"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
                title={selectedVideo.name}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="bg-gray-900 p-3 md:p-4">
              <h3 className="text-white text-lg md:text-xl font-semibold">
                {selectedVideo.name}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaDetails;
