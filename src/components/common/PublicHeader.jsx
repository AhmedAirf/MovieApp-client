import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Collapse, Button, IconButton } from "@material-tailwind/react";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  FilmIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authslice";
import { toggleTheme, toggleSidebar } from "../../../redux/slices/uiSlice";
import {
  performSearch,
  setCurrentQuery,
  clearResults,
  setShowResults,
  addToHistory,
} from "../../../redux/slices/searchSlice";

// Import our new components
import ProfileMenu from "./ProfileMenu";
import SearchInput from "./SearchInput";
import MobileSearchOverlay from "./MobileSearchOverlay";
import NavigationList from "./NavigationList";

const PublicHeader = ({ transparent = false, userLayout = false }) => {
  const [openNav, setOpenNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const { isAuthenticated } = useSelector(selectAuth);
  const theme = useSelector((state) => state.ui.theme);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Search state from Redux
  const {
    currentQuery,
    searchResults,
    loading: searchLoading,
    showResults,
    searchHistory,
  } = useSelector((state) => state.search);

  // Search handling functions
  const handleSearchChange = (e) => {
    const query = e.target.value;
    dispatch(setCurrentQuery(query));

    // Clear results if query is empty
    if (!query.trim()) {
      dispatch(clearResults());
      return;
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (currentQuery.trim()) {
      const timeoutId = setTimeout(() => {
        dispatch(performSearch(currentQuery.trim()));
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [currentQuery, dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      dispatch(addToHistory(currentQuery.trim()));
      dispatch(performSearch(currentQuery.trim()));
      navigate(`/search?q=${encodeURIComponent(currentQuery.trim())}`);
      setShowSearch(false);
    }
  };

  const handleSearchResultClick = (item) => {
    const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie");
    navigate(`/media/${mediaType}/${item.id}`);
    setShowSearch(false);
    dispatch(clearResults());
  };

  const handleHistoryClick = (query) => {
    dispatch(setCurrentQuery(query));
    dispatch(performSearch(query));
  };

  const clearSearchHandler = useCallback(() => {
    dispatch(setCurrentQuery(""));
    dispatch(clearResults());
  }, [dispatch]);

  const handleCloseSearch = () => {
    setShowSearch(false);
    clearSearchHandler();
  };

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 960 && setOpenNav(false);
      window.innerWidth >= 960 && setShowSearch(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container") && !event.target.closest(".search-input-area")) {
        dispatch(setShowResults(false));
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        dispatch(setShowResults(false));
        setShowSearch(false);
        clearSearchHandler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [dispatch, clearSearchHandler]);

  // Sidebar component (simplified)
  const sidebar = sidebarOpen && (
    <div
      className="fixed inset-0 z-40 lg:hidden"
      onClick={() => dispatch(toggleSidebar())}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <aside className="relative z-50 w-64 h-full bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <NavigationList 
            transparent={transparent} 
            userLayout={userLayout} 
            onNavClick={() => dispatch(toggleSidebar())} 
          />
        </div>
      </aside>
    </div>
  );

  return (
    <>
      {sidebar}
      {showSearch && (
        <MobileSearchOverlay
          currentQuery={currentQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onClose={handleCloseSearch}
          searchResults={searchResults}
          searchLoading={searchLoading}
          searchHistory={searchHistory}
          onSearchResultClick={handleSearchResultClick}
          onHistoryClick={handleHistoryClick}
          userLayout={userLayout}
        />
      )}
      
      <Navbar
        className={`max-w-full rounded-none border-none px-4 py-2 lg:px-8 lg:py-4 ${
          transparent
            ? "bg-transparent backdrop-blur-none border-b border-white/20"
            : theme === "dark"
            ? "bg-black/85 backdrop-blur-sm border-b border-gray-900"
            : "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
        }`}
        fullWidth
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle button */}
            <IconButton
              variant="text"
              className={`lg:hidden ${
                theme === "dark"
                  ? "text-white hover:text-red-500"
                  : transparent
                  ? "text-white hover:text-red-400 drop-shadow-lg"
                  : userLayout
                  ? "text-gray-900 hover:text-red-500"
                  : "text-white hover:text-red-400 drop-shadow-lg"
              } transition-all duration-200`}
              onClick={() => dispatch(toggleSidebar())}
            >
              <Bars3Icon className="h-6 w-6" />
            </IconButton>
            
            {/* Logo */}
            <div className="flex items-center">
              <FilmIcon className="h-8 w-8 text-red-500 mr-2" />
              <Link
                to="/"
                className="mr-4 cursor-pointer py-1.5 font-bold text-3xl md:text-4xl text-red-600 hover:text-red-500 transition-colors"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  textShadow: "0 0 8px rgba(229, 9, 20, 0.6)",
                  letterSpacing: "1px",
                }}
              >
                FLICKSY
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <NavigationList 
              transparent={transparent} 
              userLayout={userLayout} 
              onNavClick={() => setOpenNav(false)} 
            />
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Theme toggle icon */}
            <IconButton
              variant="text"
              size="sm"
              aria-label="Toggle theme"
              onClick={() => dispatch(toggleTheme())}
              className={`${
                theme === "dark"
                  ? "text-white hover:text-red-500"
                  : transparent
                  ? "text-white hover:text-red-400 drop-shadow-lg"
                  : userLayout
                  ? "text-gray-900 hover:text-red-500"
                  : "text-white hover:text-red-400 drop-shadow-lg"
              } transition-all duration-200`}
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
                <SearchInput
                  currentQuery={currentQuery}
                  onSearchChange={handleSearchChange}
                  onSearchSubmit={handleSearchSubmit}
                  onClose={handleCloseSearch}
                  showResults={showResults}
                  searchResults={searchResults}
                  searchLoading={searchLoading}
                  searchHistory={searchHistory}
                  onSearchResultClick={handleSearchResultClick}
                  onHistoryClick={handleHistoryClick}
                  userLayout={userLayout}
                  autoFocus
                />
              ) : (
                <IconButton
                  variant="text"
                  size="sm"
                  aria-label="Search"
                  onClick={() => setShowSearch(true)}
                  className={`${
                    theme === "dark"
                      ? "text-white hover:text-red-500"
                      : transparent
                      ? "text-white hover:text-red-400 drop-shadow-lg"
                      : userLayout
                      ? "text-gray-900 hover:text-red-500"
                      : "text-white hover:text-red-400 drop-shadow-lg"
                  } transition-all duration-200`}
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </IconButton>
              )}
            </div>
            
            {/* Mobile search icon */}
            <div className="lg:hidden">
              <IconButton
                variant="text"
                size="sm"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
                className={`${
                  theme === "dark"
                    ? "text-white hover:text-red-500"
                    : transparent
                    ? "text-white hover:text-red-400 drop-shadow-lg"
                    : userLayout
                    ? "text-gray-900 hover:text-red-500"
                    : "text-white hover:text-red-400 drop-shadow-lg"
                } transition-all duration-200`}
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </IconButton>
            </div>
            
            {/* Profile menu or sign in button */}
            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <Link to="/login">
                <Button
                  variant="filled"
                  size="sm"
                  className="group hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20 backdrop-blur-sm"
                >
                  <span>Sign In</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:animate-pulse" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Collapse */}
        <Collapse open={openNav}>
          <div className="flex flex-col gap-4 pt-4 pb-2">
            {showSearch ? (
              <SearchInput
                currentQuery={currentQuery}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                onClose={handleCloseSearch}
                showResults={false} // Don't show dropdown in mobile collapse
                searchResults={searchResults}
                searchLoading={searchLoading}
                searchHistory={searchHistory}
                onSearchResultClick={handleSearchResultClick}
                onHistoryClick={handleHistoryClick}
                userLayout={userLayout}
              />
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

            <NavigationList 
              transparent={transparent} 
              userLayout={userLayout} 
              onNavClick={() => setOpenNav(false)} 
            />

            {!isAuthenticated && (
              <Link to="/login" onClick={() => setOpenNav(false)}>
                <Button
                  fullWidth
                  variant="filled"
                  className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20 backdrop-blur-sm"
                >
                  <span>Sign In</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:animate-pulse" />
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