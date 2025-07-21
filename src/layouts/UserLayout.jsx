import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    {/* User Sidebar */}
    <aside style={{ width: "200px", background: "#f0f0f0" }}>
      User Sidebar
    </aside>
    <div style={{ flex: 1 }}>
      {/* User Header */}
      <header>User Header</header>
      <main>
        <Outlet />
      </main>
    </div>
  </div>
);

export default UserLayout;
