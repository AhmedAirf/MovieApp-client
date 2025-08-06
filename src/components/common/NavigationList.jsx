import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationList = ({
  transparent = false,
  userLayout = false,
  onNavClick,
}) => {
  const theme = useSelector((state) => state.ui.theme);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/tv", label: "TV Shows" },
  ];

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map(({ to, label }) => (
        <Typography
          key={to}
          as="li"
          variant="small"
          className={`p-1 font-medium transition-all duration-200 ${
            theme === "dark"
              ? "text-white hover:text-red-500"
              : transparent
              ? "text-white hover:text-red-400 drop-shadow-lg font-semibold"
              : userLayout
              ? "text-gray-900 hover:text-red-500 font-medium"
              : "text-white hover:text-red-400 drop-shadow-lg font-semibold"
          }`}
        >
          <Link
            to={to}
            onClick={onNavClick}
            className={`flex items-center focus:text-red-500 ${
              theme === "dark"
                ? ""
                : transparent
                ? "hover:bg-white/10 px-2 py-1 rounded-md"
                : userLayout
                ? "hover:bg-red-50 px-2 py-1 rounded-md"
                : "hover:bg-white/10 px-2 py-1 rounded-md"
            }`}
          >
            {label}
          </Link>
        </Typography>
      ))}
    </ul>
  );
};

export default NavigationList;
