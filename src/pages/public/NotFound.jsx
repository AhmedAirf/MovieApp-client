import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import {
  HomeIcon,
  FilmIcon,
  TvIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.ui.theme);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const quickLinks = [
    { icon: HomeIcon, label: "Home", path: "/" },
    { icon: FilmIcon, label: "Movies", path: "/movies" },
    { icon: TvIcon, label: "TV Shows", path: "/tv" },
  ];

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.05),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.02),transparent_50%)]"
        }`}
      ></div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1
            className={`text-9xl md:text-[12rem] font-black leading-none ${
              theme === "dark"
                ? "text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text"
                : "text-transparent bg-gradient-to-r from-red-600 to-red-800 bg-clip-text"
            } drop-shadow-2xl`}
          >
            404
          </h1>

          {/* Floating elements */}
          <div className="absolute top-4 left-4 opacity-20">
            <FilmIcon
              className="w-12 h-12 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <div className="absolute top-8 right-8 opacity-20">
            <TvIcon
              className="w-10 h-10 animate-bounce"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-20">
            <MagnifyingGlassIcon
              className="w-8 h-8 animate-bounce"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2
            className={`text-3xl md:text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Page Not Found
          </h2>
          <p
            className={`text-lg md:text-xl ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } max-w-md mx-auto leading-relaxed`}
          >
            Oops! The page you're looking for seems to have vanished into the
            digital void.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGoHome}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25"
              }`}
              size="lg"
            >
              <HomeIcon className="w-5 h-5" />
              Go Home
            </Button>

            <Button
              onClick={handleGoBack}
              variant="outlined"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
              size="lg"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3
            className={`text-lg font-semibold ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Or explore these sections:
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white border border-gray-700/50 hover:border-gray-600"
                      : "bg-white/50 hover:bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                  } backdrop-blur-sm`}
                >
                  <IconComponent className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-12">
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            } italic`}
          >
            "In a world of infinite content, you've found the one page that
            doesn't exist." 🎬
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
