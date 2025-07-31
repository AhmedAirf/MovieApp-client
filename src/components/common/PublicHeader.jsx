import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  FilmIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, logout } from "../../../redux/slices/authslice";
import { toggleTheme, toggleSidebar } from "../../../redux/slices/uiSlice";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const theme = useSelector((state) => state.ui.theme);

  const closeMenu = () => setIsMenuOpen(false);

  const handleProfile = () => {
    closeMenu();
    navigate("/profile");
  };
  const handleWatchlist = () => {
    closeMenu();
    navigate("/watchlist");
  };
  const handleDashboard = () => {
    closeMenu();
    navigate("/admin");
  };
  const handleSignOut = () => {
    closeMenu();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="user avatar"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList
        className={`p-1 ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200 shadow-lg"
        }`}
      >
        <MenuItem
          onClick={handleProfile}
          className={`flex items-center gap-2 rounded ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <Typography
            as="span"
            variant="small"
            className={`font-normal ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleWatchlist}
          className={`flex items-center gap-2 rounded ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          <Typography
            as="span"
            variant="small"
            className={`font-normal ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            My List
          </Typography>
        </MenuItem>
        {user && user.role === "admin" && (
          <MenuItem
            onClick={handleDashboard}
            className={`flex items-center gap-2 rounded ${
              theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <Typography
              as="span"
              variant="small"
              className={`font-normal ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Dashboard
            </Typography>
          </MenuItem>
        )}
        <MenuItem
          onClick={handleSignOut}
          className={`flex items-center gap-2 rounded ${
            theme === "dark" ? "hover:bg-red-900/50" : "hover:bg-red-50"
          }`}
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

const PublicHeader = (transparent = false) => {
  const [openNav, setOpenNav] = useState(false);
  const { isAuthenticated } = useSelector(selectAuth);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const theme = useSelector((state) => state.ui.theme);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 960 && setOpenNav(false);
      window.innerWidth >= 960 && setShowSearch(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar rendering (for demonstration, simple overlay)
  // You can replace this with your actual sidebar component
  const sidebar = (
    <div
      className={`fixed inset-0 z-40 bg-black bg-opacity-50 flex ${
        sidebarOpen ? "" : "hidden"
      }`}
      onClick={() => dispatch(toggleSidebar())}
    >
      <aside
        className="w-80 bg-gradient-to-b from-gray-900 to-black h-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 ">
                <FilmIcon className="h-8 w-8 text-red-500 mr-2" />
              </div>
              <span className="font-bold text-xl text-white">Flicksy</span>
            </div>
            <IconButton
              variant="text"
              color="white"
              onClick={() => dispatch(toggleSidebar())}
              className="text-white hover:bg-white hover:bg-opacity-10"
            >
              <XMarkIcon className="h-6 w-6" />
            </IconButton>
          </div>

          {/* Navigation Links */}
          <nav className="mb-8">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Browse
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:text-red-500 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="group-hover:text-red-500 transition-colors">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:text-red-500 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  <span className="group-hover:text-red-500 transition-colors">
                    Movies
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tv"
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:text-red-500 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  <span className="group-hover:text-red-500 transition-colors">
                    TV Shows
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-700 pt-6">
            {!isAuthenticated ? (
              <div className="space-y-3">
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
                  Account
                </h3>
                <Link
                  to="/login"
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex items-center gap-3 px-4 py-3 border border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color={theme === "dark" ? "white" : "black"}
        className="p-1 font-medium hover:text-red-500 transition-colors"
      >
        <Link
          to="/"
          onClick={() => setOpenNav(false)}
          className="flex items-center focus:text-red-500"
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color={theme === "dark" ? "white" : "black"}
        className="p-1 font-medium hover:text-red-500 transition-colors"
      >
        <Link
          to="/movies"
          onClick={() => setOpenNav(false)}
          className="flex items-center focus:text-red-500"
        >
          Movies
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color={theme === "dark" ? "white" : "black"}
        className="p-1 font-medium hover:text-red-500 transition-colors"
      >
        <Link
          to="/tv"
          onClick={() => setOpenNav(false)}
          className="flex items-center focus:text-red-500"
        >
          TV Shows
        </Link>
      </Typography>
    </ul>
  );

  const searchInput = (
    <div className="relative flex items-center w-full lg:w-auto">
      <input
        type="text"
        className={`border rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 w-full lg:w-64 transition-all duration-200 ${
          theme === "dark"
            ? "border-gray-700 bg-gray-900 text-white"
            : "border-gray-300 bg-white text-gray-900"
        }`}
        placeholder="Search movies, series..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocus
      />
      <IconButton
        variant="text"
        size="sm"
        aria-label="Close search"
        className={`absolute right-1 ${
          theme === "dark" ? "text-white" : "text-gray-600"
        }`}
        onClick={() => setShowSearch(false)}
      >
        <XMarkIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );

  // Responsive mobile search overlay
  const mobileSearchOverlay = (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-start justify-center p-4 lg:hidden">
      <div className="w-full max-w-xl mt-8">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            className={`border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-lg ${
              theme === "dark"
                ? "border-gray-700 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            placeholder="Search movies, series..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
          <IconButton
            variant="text"
            size="lg"
            aria-label="Close search"
            className={`absolute right-2 ${
              theme === "dark" ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setShowSearch(false)}
          >
            <XMarkIcon className="h-7 w-7" />
          </IconButton>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {sidebar}
      {showSearch && mobileSearchOverlay}
      <Navbar
        className={` max-w-full rounded-none border-none px-4 py-2 lg:px-8 lg:py-4 ${
          transparent
            ? "bg-transparent backdrop-blur-none border-b border-white/20"
            : theme === "dark"
            ? "bg-black/85 backdrop-blur-sm border-b border-gray-900"
            : "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
        } ${
          showSearch
            ? "lg:opacity-100 opacity-30 pointer-events-none select-none"
            : ""
        }`}
        fullWidth
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button */}
            <IconButton
              variant="text"
              color={theme === "dark" ? "white" : "black"}
              className="lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <Bars3Icon
                className={`h-6 w-6 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              />
            </IconButton>
            <div className="flex items-center ">
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
          </div>

          <div className="hidden lg:flex flex-1 justify-center px-4">
            {navList}
          </div>

          <div className="flex items-center gap-4">
            {/* Theme toggle icon */}
            <IconButton
              color={theme === "dark" ? "white" : "black"}
              variant="text"
              size="sm"
              aria-label="Toggle theme"
              onClick={() => dispatch(toggleTheme())}
              className=""
            >
              {theme === "dark" ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </IconButton>
            {/* Desktop search input */}
            <div className="hidden lg:block">
              {showSearch ? (
                searchInput
              ) : (
                <IconButton
                  color={theme === "dark" ? "white" : "black"}
                  variant="text"
                  size="sm"
                  aria-label="Search"
                  onClick={() => setShowSearch(true)}
                  className="inline-block"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </IconButton>
              )}
            </div>
            {/* Mobile search icon */}
            <div className="lg:hidden">
              <IconButton
                color={theme === "dark" ? "white" : "black"}
                variant="text"
                size="sm"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
                className="inline-block"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </IconButton>
            </div>
            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <Link to="/login">
                <Button
                  variant="filled"
                  size="sm"
                  className="hidden lg:inline-flex items-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  <span>Sign In</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <Collapse open={openNav}>
          <div className="flex flex-col gap-4 pt-4 pb-2">
            {showSearch ? (
              searchInput
            ) : (
              <IconButton
                fullWidth
                variant="text"
                size="sm"
                color="white"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
                <span>Search</span>
              </IconButton>
            )}

            {navList}

            {!isAuthenticated && (
              <Link to="/login" onClick={() => setOpenNav(false)}>
                <Button
                  fullWidth
                  variant="filled"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                >
                  <span>Sign In</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </Collapse>
      </Navbar>
    </>
  );
};

export default PublicHeader;
