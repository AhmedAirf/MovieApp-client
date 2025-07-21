import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import PublicHeader from "../components/common/PublicHeader";

const PuplicLayout = () => {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  const hideFooter = ["/login", "/register"].includes(location.pathname);

  return (
    <div>
      {!hideHeader && (
        <header>
          <PublicHeader />
        </header>
      )}
      <main>
        <Outlet />
      </main>
      {/* Public Footer */}
      {!hideFooter && <footer>Public Footer</footer>}
    </div>
  );
};

export default PuplicLayout;
