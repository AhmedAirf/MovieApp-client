import React from "react";
import { Link } from "react-router-dom";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const UnauthenticatedAlert = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Alert Modal */}
      <div className="relative bg-gray-900/95 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full mx-4 backdrop-blur-md animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">
                Login Required
              </h3>
              <p className="text-gray-400 text-sm">
                Access to this content requires authentication
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            To view detailed information about this movie or TV show, you need
            to be logged in. Create an account or sign in to access all features
            including watchlists, reviews, and personalized recommendations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              onClick={onClose}
              className="group flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20 backdrop-blur-sm text-center"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
            >
              Create Account
            </Link>
          </div>

          {/* Skip Option */}
          <button
            onClick={onClose}
            className="w-full text-gray-400 hover:text-white text-sm mt-4 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedAlert;
