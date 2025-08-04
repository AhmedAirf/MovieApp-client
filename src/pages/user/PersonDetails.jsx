import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPersonDetailsAsync,
  fetchPersonCreditsAsync,
  clearMediaDetails,
} from "../../../redux/slices/mediaDetailsSlice";
import { selectIsAuthenticated } from "../../../redux/slices/authslice";
import MediaCard from "../../components/common/MediaCard";
import Loader from "../../components/common/loader";
import Pagination from "../../components/common/Pagination";
import {
  StarIcon,
  CalendarIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const PersonDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { currentPerson, credits, loading, error } = useSelector(
    (state) => state.mediaDetails
  );

  const [activeTab, setActiveTab] = useState("overview");
  const [showFullBio, setShowFullBio] = useState(false);
  const [actingPage, setActingPage] = useState(1);
  const [crewPage, setCrewPage] = useState(1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonDetailsAsync(id));
      dispatch(fetchPersonCreditsAsync(id));
    }
    return () => dispatch(clearMediaDetails());
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAge = () => {
    if (!currentPerson?.birthday) return null;
    const birthDate = new Date(currentPerson.birthday);
    const today = currentPerson.deathday
      ? new Date(currentPerson.deathday)
      : new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getKnownFor = () => {
    if (!credits?.cast) return [];
    return [...credits.cast]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 6);
  };

  const getActingCredits = () => {
    if (!credits?.cast) return [];
    return [...credits.cast].sort(
      (a, b) =>
        new Date(b.release_date || b.first_air_date || 0) -
        new Date(a.release_date || a.first_air_date || 0)
    );
  };

  const getPaginatedActingCredits = () => {
    const startIndex = (actingPage - 1) * ITEMS_PER_PAGE;
    return getActingCredits().slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getCrewCredits = () => {
    if (!credits?.crew) return [];
    return [...credits.crew].sort(
      (a, b) =>
        new Date(b.release_date || b.first_air_date || 0) -
        new Date(a.release_date || a.first_air_date || 0)
    );
  };

  const getPaginatedCrewCredits = () => {
    const startIndex = (crewPage - 1) * ITEMS_PER_PAGE;
    return getCrewCredits().slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getGender = () => {
    switch (currentPerson?.gender) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";
      default:
        return "Unknown";
    }
  };

  const truncateBio = (bio) => {
    if (!bio) return "No biography available.";
    return showFullBio || bio.length <= 300
      ? bio
      : `${bio.substring(0, 300)}...`;
  };

  if (loading)
    return (
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-black" : "bg-gray-50"
        }`}
      >
        <Loader />
      </div>
    );

  if (error || !currentPerson)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Error Loading Person
          </h2>
          <p className="text-gray-500 mb-6">{error || "Person not found"}</p>
          <Link
            to="/"
            className="group bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20 backdrop-blur-sm font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              currentPerson.profile_path
                ? `https://image.tmdb.org/t/p/original${currentPerson.profile_path}`
                : "/placeholder-person.jpg"
            }
            alt={currentPerson.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-person.jpg";
            }}
          />
          <div
            className={`absolute inset-0 ${
              theme === "dark" ? "bg-black/70" : "bg-white/70"
            }`}
          ></div>
        </div>

        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 pb-4 md:pb-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="hidden md:block flex-shrink-0">
                <img
                  src={
                    currentPerson.profile_path
                      ? `https://image.tmdb.org/t/p/w500${currentPerson.profile_path}`
                      : "/placeholder-person.jpg"
                  }
                  alt={currentPerson.name}
                  className="w-40 md:w-48 lg:w-64 h-60 md:h-72 lg:h-96 object-cover rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.target.src = "/placeholder-person.jpg";
                  }}
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <UserIcon className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                  <span className="text-xs md:text-sm text-gray-400">
                    Person
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 md:mb-4">
                  {currentPerson.name}
                </h1>

                <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mb-2 md:mb-4 text-xs sm:text-sm flex-wrap">
                  {currentPerson.birthday && (
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3 md:h-4 md:w-4" />
                      <span>
                        Born: {formatDate(currentPerson.birthday)}
                        {getAge() && ` (Age ${getAge()})`}
                      </span>
                    </div>
                  )}
                  {currentPerson.deathday && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Died: {formatDate(currentPerson.deathday)}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 mb-3 md:mb-4 text-xs sm:text-sm flex-wrap">
                  {currentPerson.place_of_birth && (
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{currentPerson.place_of_birth}</span>
                    </div>
                  )}
                  {currentPerson.known_for_department && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-3 w-3 md:h-4 md:w-4" />
                        <span>{currentPerson.known_for_department}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-1 md:gap-2 mb-3 md:mb-6">
                  <span
                    className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs sm:text-sm ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-200"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {getGender()}
                  </span>
                  <span
                    className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs sm:text-sm ${
                      theme === "dark"
                        ? "bg-gray-800 text-gray-200"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    Popularity: {currentPerson.popularity?.toFixed(1) || "N/A"}
                  </span>
                  {currentPerson.birthday && (
                    <span
                      className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs sm:text-sm ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-200"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      Born {new Date(currentPerson.birthday).getFullYear()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden sticky top-0 z-20 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-2">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="w-full flex justify-between items-center px-4 py-2 rounded-lg bg-gray-800 text-white"
        >
          <span className="capitalize">{activeTab}</span>
          <svg
            className={`h-5 w-5 transform transition-transform ${
              showMobileMenu ? "rotate-180" : ""
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

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden grid grid-cols-1 gap-1 mb-1 rounded-lg bg-gray-900 bg-opacity-90 backdrop-blur-sm p-2">
          {["overview", "acting", "crew"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowMobileMenu(false);
              }}
              className={`py-2 px-3 rounded text-xs font-medium capitalize ${
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

      {/* Content */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Desktop Tabs */}
        <div
          className={`hidden md:block border-b mb-4 md:mb-8 ${
            theme === "dark" ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <nav className="flex space-x-4 md:space-x-8 overflow-x-auto pb-2">
            {["overview", "acting", "crew"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm capitalize whitespace-nowrap ${
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
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                {/* Biography */}
                <div
                  className={`p-4 md:p-6 rounded-lg ${
                    theme === "dark" ? "bg-gray-900" : "bg-white shadow-sm"
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                    <UserIcon className="h-5 w-5 md:h-6 md:w-6 text-blue-500" />
                    Biography
                  </h3>
                  <div className="text-sm md:text-base leading-relaxed">
                    {currentPerson.biography ? (
                      <>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                          {truncateBio(currentPerson.biography)}
                        </p>
                        {currentPerson.biography.length > 300 && (
                          <button
                            onClick={() => setShowFullBio(!showFullBio)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors font-medium"
                          >
                            {showFullBio ? (
                              <>
                                <span>See less</span>
                                <ChevronUpIcon className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <span>See more</span>
                                <ChevronDownIcon className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500 font-medium">
                          No biography available
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Known For */}
                <div
                  className={`p-4 md:p-6 rounded-lg ${
                    theme === "dark" ? "bg-gray-900" : "bg-white shadow-sm"
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6 flex items-center gap-2">
                    <StarIcon className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                    Known For
                  </h3>
                  {getKnownFor().length > 0 || getKnownFor().length === 6 ? (
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 gap-3 md:gap-4">
                      {getKnownFor().map((work, index) => (
                        <div
                          key={`known-${work.id}-${index}`}
                          className="w-full"
                        >
                          <MediaCard
                            media={work}
                            media_type={
                              work.media_type || (work.title ? "movie" : "tv")
                            }
                            theme={theme}
                            className="w-full"
                            isAuthenticated={isAuthenticated}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`text-center py-8 px-4 rounded-lg ${
                        theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                      }`}
                    >
                      <p className="text-gray-500 font-medium">
                        No known works available
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden lg:block">
                <div
                  className={`p-4 md:p-6 rounded-lg sticky top-4 ${
                    theme === "dark" ? "bg-gray-900" : "bg-white shadow-sm"
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                    <UserIcon className="h-5 w-5 md:h-6 md:w-6 text-green-500" />
                    Personal Details
                  </h3>
                  <div className="space-y-3 md:space-y-4 text-sm md:text-base">
                    <div>
                      <span className="font-semibold">Birthday: </span>
                      <span>
                        {currentPerson.birthday
                          ? formatDate(currentPerson.birthday)
                          : "Unknown"}
                        {getAge() && (
                          <span className="text-gray-500 text-sm ml-2">
                            (Age {getAge()})
                          </span>
                        )}
                      </span>
                    </div>
                    {currentPerson.deathday && (
                      <div>
                        <span className="font-semibold">Death Date: </span>
                        <span>{formatDate(currentPerson.deathday)}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold">Place of Birth: </span>
                      <span>{currentPerson.place_of_birth || "Unknown"}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Known For: </span>
                      <span>
                        {currentPerson.known_for_department || "Unknown"}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Gender: </span>
                      <span>{getGender()}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Popularity: </span>
                      <span>
                        {currentPerson.popularity?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "acting" && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
                Acting Credits ({getActingCredits().length})
              </h3>
              {getActingCredits().length > 0 ? (
                <>
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
                    {getPaginatedActingCredits().map((work, index) => (
                      <div
                        key={`acting-${work.id}-${
                          work.character || "role"
                        }-${index}`}
                        className="w-full"
                      >
                        <MediaCard
                          media={work}
                          media_type={
                            work.media_type || (work.title ? "movie" : "tv")
                          }
                          theme={theme}
                          className="w-full"
                          isAuthenticated={isAuthenticated}
                        />
                        {work.character && (
                          <p className="text-xs text-gray-500 mt-1 px-1 line-clamp-2">
                            as {work.character}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {Math.ceil(getActingCredits().length / ITEMS_PER_PAGE) >
                    1 && (
                    <div className="flex justify-center mt-6 md:mt-8">
                      <Pagination
                        page={actingPage}
                        setPage={setActingPage}
                        totalPages={Math.ceil(
                          getActingCredits().length / ITEMS_PER_PAGE
                        )}
                      />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500">No acting credits available.</p>
              )}
            </div>
          )}

          {activeTab === "crew" && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">
                Crew Credits ({getCrewCredits().length})
              </h3>
              {getCrewCredits().length > 0 ? (
                <>
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
                    {getPaginatedCrewCredits().map((work, index) => (
                      <div
                        key={`crew-${work.id}-${work.job}-${index}`}
                        className={`p-2 md:p-3 rounded-lg ${
                          theme === "dark" ? "bg-gray-800" : "bg-white shadow"
                        }`}
                      >
                        <MediaCard
                          media={work}
                          media_type={
                            work.media_type || (work.title ? "movie" : "tv")
                          }
                          theme={theme}
                          className="w-full mb-2"
                          isAuthenticated={isAuthenticated}
                        />
                        <p className="text-xs md:text-sm text-gray-500 font-medium">
                          {work.job}
                        </p>
                        {work.department && work.department !== work.job && (
                          <p className="text-xs text-gray-400">
                            {work.department}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {Math.ceil(getCrewCredits().length / ITEMS_PER_PAGE) > 1 && (
                    <div className="flex justify-center mt-6 md:mt-8">
                      <Pagination
                        page={crewPage}
                        setPage={setCrewPage}
                        totalPages={Math.ceil(
                          getCrewCredits().length / ITEMS_PER_PAGE
                        )}
                      />
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500">No crew credits available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
