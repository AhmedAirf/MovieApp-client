import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-xl bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-900/50">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h2>

          {/* Message */}
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Sorry, you don't have permission to access this page. This area is
            restricted to authorized personnel only.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="flex justify-center items-center py-3 px-4 w-full text-base font-medium rounded-lg transition-all duration-200 bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-dark/50"
          >
            Go to Home
          </Link>

          <Link
            to="/profile"
            className="flex justify-center items-center py-3 px-4 w-full text-base font-medium rounded-lg transition-all duration-200 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/50 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-300/50 dark:focus:ring-gray-600/50"
          >
            Go to Profile
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
