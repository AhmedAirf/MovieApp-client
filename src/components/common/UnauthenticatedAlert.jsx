import React from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const UnauthenticatedAlert = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4 mb-48">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Alert Modal - Compact for mobile */}
      <div className="relative bg-gray-900/95 border border-gray-700 rounded-xl sm:rounded-2xl shadow-xl max-w-xs sm:max-w-md w-full mx-2 sm:mx-4 backdrop-blur-md">
        {/* Compact Header */}
        <div className="flex items-start justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-base sm:text-lg">
                Login Required
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Authentication needed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-0.5"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Content */}
        <div className="p-4">
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
            Sign in to view details, save to watchlist, and get recommendations.
          </p>

          {/* Stacked Buttons for Mobile */}
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              onClick={onClose}
              className="group flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg text-sm sm:text-base text-center transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg text-sm sm:text-base text-center transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Skip Option */}
          <button
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white text-xs mt-3 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedAlert;
