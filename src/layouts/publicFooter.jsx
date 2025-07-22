import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FilmIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const publicFooter = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          <div>
            <div className="flex items-center mb-4">
              <FilmIcon className="h-8 w-8 text-red-500 mr-2" />
              <Typography
                as={Link}
                to="/"
                className="mr-4 cursor-pointer py-1.5 font-bold text-3xl md:text-4xl text-red-600 hover:text-red-500 transition-colors"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  textShadow: "0 0 8px rgba(229, 9, 20, 0.6)",
                  letterSpacing: "1px",
                }}
              >
                FLICKSY
              </Typography>
            </div>
            <p className="text-gray-400 mb-4">
              The best streaming platform for movies and TV shows. Watch
              anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Movies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  TV Shows
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  New & Popular
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Cookie Preferences
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Corporate Information
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest movie updates and
              recommendations.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-red-600 w-full"
              />
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Copyright and bottom links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MovieFlix. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Help Center
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default publicFooter;
