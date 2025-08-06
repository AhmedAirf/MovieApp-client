import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth, logout } from "../../../redux/slices/authslice";
import { useWatchlist } from "../../hooks/useWatchlist";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const theme = useSelector((state) => state.ui.theme);
  const { totalItems } = useWatchlist();

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
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-200"
        }`}
      >
        <MenuItem
          onClick={handleProfile}
          className={`flex items-center gap-2 rounded ${
            theme === "dark"
              ? "hover:bg-gray-700 focus:bg-gray-700"
              : "hover:bg-gray-50 focus:bg-gray-50"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.016 9 6.076 9.27 5.262 9.742C4.602 10.13 4.222 10.704 4.222 11.294C4.222 11.594 4.447 11.8 4.778 11.8H11.222C11.553 11.8 11.778 11.594 11.778 11.294C11.778 10.704 11.398 10.13 10.738 9.742C9.924 9.27 8.984 9 8 9Z"
              fill={theme === "dark" ? "#ffffff" : "#90A4AE"}
            />
          </svg>
          <p className="font-medium">My Profile</p>
        </MenuItem>
        <MenuItem
          onClick={handleWatchlist}
          className={`flex items-center gap-2 rounded ${
            theme === "dark"
              ? "hover:bg-gray-700 focus:bg-gray-700"
              : "hover:bg-gray-50 focus:bg-gray-50"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17L6.45326 1.40776C6.34584 1.93718 5.93622 2.34678 5.40679 2.45419L5.16999 2.51C3.59999 2.89 3.59999 5.11 5.16999 5.49L5.40776 5.54674C5.93718 5.65416 6.34678 6.06378 6.45419 6.59321L6.50999 6.83C6.88999 8.4 9.10999 8.4 9.48999 6.83L9.54673 6.59224C9.65415 6.06282 10.0638 5.65322 10.5932 5.54581L10.83 5.49C12.4 5.11 12.4 2.89 10.83 2.51L10.5922 2.45326C10.0628 2.34584 9.65322 1.93622 9.54581 1.40679L9.48999 1.17ZM2.24999 10.17C2.04999 9.39 1.04999 9.39 0.849996 10.17L0.819867 10.2898C0.784977 10.4346 0.653493 10.5661 0.508717 10.601L0.388996 10.63C-0.389004 10.83 -0.389004 11.83 0.388996 12.03L0.50872 12.0598C0.653496 12.0947 0.784981 12.2262 0.819871 12.371L0.849996 12.49C1.04999 13.27 2.04999 13.27 2.24999 12.49L2.28013 12.3702C2.31502 12.2254 2.44651 12.0939 2.59128 12.059L2.71099 12.03C3.48899 11.83 3.48899 10.83 2.71099 10.63L2.59127 10.6002C2.44649 10.5653 2.315 10.4338 2.28011 10.289L2.24999 10.17ZM12.25 10.17C12.05 9.39 11.05 9.39 10.85 10.17L10.8199 10.2898C10.785 10.4346 10.6535 10.5661 10.5087 10.601L10.389 10.63C9.61099 10.83 9.61099 11.83 10.389 12.03L10.5087 12.0598C10.6535 12.0947 10.785 12.2262 10.8199 12.371L10.85 12.49C11.05 13.27 12.05 13.27 12.25 12.49L12.2801 12.3702C12.315 12.2254 12.4465 12.0939 12.5913 12.059L12.711 12.03C13.489 11.83 13.489 10.83 12.711 10.63L12.5913 10.6002C12.4465 10.5653 12.315 10.4338 12.2801 10.289L12.25 10.17Z"
              fill={theme === "dark" ? "#ffffff" : "#90A4AE"}
            />
          </svg>
          <div className="flex items-center justify-between w-full">
            <p className="font-medium">Watchlist</p>
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2">
                {totalItems}
              </span>
            )}
          </div>
        </MenuItem>
        {user?.role === "admin" && (
          <MenuItem
            onClick={handleDashboard}
            className={`flex items-center gap-2 rounded ${
              theme === "dark"
                ? "hover:bg-gray-700 focus:bg-gray-700"
                : "hover:bg-gray-50 focus:bg-gray-50"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H4C4.26522 0 4.51957 0.105357 4.70711 0.292893C4.89464 0.48043 5 0.734784 5 1V4C5 4.26522 4.89464 4.51957 4.70711 4.70711C4.51957 4.89464 4.26522 5 4 5H1C0.734784 5 0.48043 4.89464 0.292893 4.70711C0.105357 4.51957 0 4.26522 0 4V1ZM11 0C10.7348 0 10.4804 0.105357 10.2929 0.292893C10.1054 0.48043 10 0.734784 10 1V4C10 4.26522 10.1054 4.51957 10.2929 4.70711C10.4804 4.89464 10.7348 5 11 5H14C14.2652 5 14.5196 4.89464 14.7071 4.70711C14.8946 4.51957 15 4.26522 15 4V1C15 0.734784 14.8946 0.48043 14.7071 0.292893C14.5196 0.105357 14.2652 0 14 0H11ZM0 11C0 10.7348 0.105357 10.4804 0.292893 10.2929C0.48043 10.1054 0.734784 10 1 10H4C4.26522 10 4.51957 10.1054 4.70711 10.2929C4.89464 10.4804 5 10.7348 5 11V14C5 14.2652 4.89464 14.5196 4.70711 14.7071C4.51957 14.8946 4.26522 15 4 15H1C0.734784 15 0.48043 14.8946 0.292893 14.7071C0.105357 14.5196 0 14.2652 0 14V11ZM11 10C10.7348 10 10.4804 10.1054 10.2929 10.2929C10.1054 10.4804 10 10.7348 10 11V14C10 14.2652 10.1054 14.5196 10.2929 14.7071C10.4804 14.8946 10.7348 15 11 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V11C15 10.7348 14.8946 10.4804 14.7071 10.2929C14.5196 10.1054 14.2652 10 14 10H11Z"
                fill={theme === "dark" ? "#ffffff" : "#90A4AE"}
              />
            </svg>
            <p className="font-medium">Dashboard</p>
          </MenuItem>
        )}
        <hr
          className={`my-2 ${
            theme === "dark" ? "border-gray-600" : "border-blue-gray-50"
          }`}
        />
        <MenuItem
          onClick={handleSignOut}
          className={`flex items-center gap-2 rounded ${
            theme === "dark"
              ? "hover:bg-gray-700 focus:bg-gray-700"
              : "hover:bg-gray-50 focus:bg-gray-50"
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H9C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1V5C10 5.26522 9.89464 5.51957 9.70711 5.70711C9.51957 5.89464 9.26522 6 9 6C8.73478 6 8.48043 5.89464 8.29289 5.70711C8.10536 5.51957 8 5.26522 8 5V2H2V14H8V11C8 10.7348 8.10536 10.4804 8.29289 10.2929C8.48043 10.1054 8.73478 10 9 10C9.26522 10 9.51957 10.1054 9.70711 10.2929C9.89464 10.4804 10 10.7348 10 11V15C10 15.2652 9.89464 15.5196 9.70711 15.7071C9.51957 15.8946 9.26522 16 9 16H1C0.734784 16 0.48043 15.8946 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15V1ZM12.293 4.293C12.4805 4.10553 12.7348 4.00021 13 4.00021C13.2652 4.00021 13.5195 4.10553 13.707 4.293L15.707 6.293C15.8945 6.48053 15.9998 6.73484 15.9998 7C15.9998 7.26516 15.8945 7.51947 15.707 7.707L13.707 9.707C13.5184 9.88916 13.2658 9.98995 13.0036 9.9877C12.7414 9.98545 12.4906 9.88033 12.3052 9.69493C12.1198 9.50952 12.0147 9.25866 12.0124 8.99648C12.0102 8.73429 12.111 8.48168 12.293 8.293L12.586 8H6C5.73478 8 5.48043 7.89464 5.29289 7.70711C5.10536 7.51957 5 7.26522 5 7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H12.586L12.293 5.707C12.1055 5.51947 12.0002 5.26516 12.0002 5C12.0002 4.73484 12.1055 4.48053 12.293 4.293Z"
              fill={theme === "dark" ? "#ffffff" : "#90A4AE"}
            />
          </svg>
          <p className="font-medium">Sign Out</p>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
