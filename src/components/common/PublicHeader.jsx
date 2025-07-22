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
      <MenuList className="p-1 bg-gray-900 border-gray-800">
        <MenuItem
          onClick={handleProfile}
          className="flex items-center gap-2 rounded hover:bg-gray-800"
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal text-white"
          >
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleWatchlist}
          className="flex items-center gap-2 rounded hover:bg-gray-800"
        >
          <Typography
            as="span"
            variant="small"
            className="font-normal text-white"
          >
            My List
          </Typography>
        </MenuItem>
        {user && user.role === "admin" && (
          <MenuItem
            onClick={handleDashboard}
            className="flex items-center gap-2 rounded hover:bg-gray-800"
          >
            <Typography
              as="span"
              variant="small"
              className="font-normal text-white"
            >
              Dashboard
            </Typography>
          </MenuItem>
        )}
        <MenuItem
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded hover:bg-red-900/50"
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

const PublicHeader = () => {
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
        className="w-64 bg-gray-200 dark:bg-gray-800 h-full p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Sidebar</span>
          <IconButton
            variant="text"
            color="black"
            onClick={() => dispatch(toggleSidebar())}
          >
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </div>
        {/* Sidebar content here */}
        <ul>
          <li className="mb-2">
            <Link to="/" onClick={() => dispatch(toggleSidebar())}>
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/movies" onClick={() => dispatch(toggleSidebar())}>
              Movies
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/tv" onClick={() => dispatch(toggleSidebar())}>
              TV Shows
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium hover:text-red-500 transition-colors"
      >
        <Link
          to="/"
          onClick={() => setOpenNav(false)}
          className="flex items-center"
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium hover:text-red-500 transition-colors"
      >
        <Link
          to="/movies"
          onClick={() => setOpenNav(false)}
          className="flex items-center"
        >
          Movies
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium hover:text-red-500 transition-colors"
      >
        <Link
          to="/tv"
          onClick={() => setOpenNav(false)}
          className="flex items-center"
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
        className="border border-gray-700 bg-gray-900 text-white rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 w-full lg:w-64 transition-all duration-200"
        placeholder="Search movies, series..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocus
      />
      <IconButton
        variant="text"
        size="sm"
        aria-label="Close search"
        className="absolute right-1 text-white"
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
            className="border border-gray-700 bg-gray-900 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-lg"
            placeholder="Search movies, series..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoFocus
          />
          <IconButton
            variant="text"
            size="lg"
            aria-label="Close search"
            className="absolute right-2 text-white"
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
      {/* Mobile search overlay */}
      {showSearch && mobileSearchOverlay}
      <Navbar
        className={`sticky top-0 z-40 max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-black/85 backdrop-blur-sm border-b border-gray-900 ${
          showSearch
            ? "lg:opacity-100 opacity-30 pointer-events-none select-none"
            : ""
        }`}
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button */}
            <IconButton
              variant="text"
              color="white"
              className="lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <Bars3Icon className="h-6 w-6" />
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
              color="white"
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
                  color="white"
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
                color="white"
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
