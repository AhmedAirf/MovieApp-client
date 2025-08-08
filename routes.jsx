import React from "react";
import { Routes, Route } from "react-router-dom";
// Layouts
import PuplicLayout from "./src/layouts/PuplicLayout";
import UserLayout from "./src/layouts/UserLayout";
import AdminLayout from "./src/layouts/AdminLayout";
// Pages
import Home from "./src/pages/public/Home";
import NotFound from "./src/pages/public/NotFound";
import NotAuthorized from "./src/pages/public/NotAuthorized";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";
import Movies from "./src/pages/public/Movies";
import Tv from "./src/pages/public/Tv";
import Profile from "./src/pages/user/profile";
import Watchlist from "./src/pages/user/Watchlist";
import MediaDetails from "./src/pages/user/MediaDetails";
import Dashboard from "./src/pages/admin/Dashboard";
import ManageUsers from "./src/pages/admin/ManageUsers";
import PersonDetails from "./src/pages/user/PersonDetails";
// Route guards (to be implemented)
import ProtectedRoutes from "./src/components/common/ProtectedRoutes";

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route element={<PuplicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<Tv />} />
      <Route path="/media/:type/:id" element={<MediaDetails />} />
      <Route path="/person/:id" element={<PersonDetails />} />
    </Route>

    {/* User routes (protected) */}
    <Route
      element={
        <ProtectedRoutes>
          <UserLayout />
        </ProtectedRoutes>
      }
    >
      <Route path="/profile" element={<Profile />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Route>

    {/* Admin routes (protected, admin only) */}
    <Route
      element={
        <ProtectedRoutes adminOnly={true}>
          <AdminLayout />
        </ProtectedRoutes>
      }
    >
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/users" element={<ManageUsers />} />
    </Route>

    {/* Catch-all route for 404 - must be last */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
