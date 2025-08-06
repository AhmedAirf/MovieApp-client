import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PublicFooter from "../components/common/publicFooter";

const PuplicLayout = () => {
  const location = useLocation();

  const hideFooter = ["/login", "/register"].includes(location.pathname);
  const theme = useSelector((state) => state.ui.theme);

  return (
    <div
      className={`${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-white text-gray-900"
      } min-h-screen`}
    >
      <main>
        <Outlet />
      </main>
      {/* Public Footer */}
      {!hideFooter && <PublicFooter />}
    </div>
  );
};

export default PuplicLayout;
