import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicHeader from "../components/common/PublicHeader";

const UserLayout = () => {
  const theme = useSelector((state) => state.ui.theme);

  return (
    <div
      className={`${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-white text-gray-900"
      } min-h-screen`}
    >
      <PublicHeader />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
