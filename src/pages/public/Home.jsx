import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../../redux/slices/authslice";

const Home = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 dark:text-white">
            Welcome to Movie App
          </h1>

          {isAuthenticated ? (
            <div className="mb-8">
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Welcome back, {user?.name || user?.email || "User"}!
              </p>
              <div className="space-x-4">
                <Link
                  to="/profile"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  My Profile
                </Link>
                <Link
                  to="/watchlist"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  My Watchlist
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                Please log in to access your personalized content.
              </p>
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Discover Movies
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Explore the latest movies and TV shows.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Create Watchlist
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Save your favorite content for later.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
              Get Recommendations
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Get personalized recommendations based on your taste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
