import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../../../redux/slices/authslice";

const ProtectedRoutes = ({ adminOnly = false, children }) => {
  const { isAuthenticated, loading, token, user } = useSelector(selectAuth);

  // Show loading state if we're still loading user data
  if ((token && loading) || (isAuthenticated && !user)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only check admin status after we're sure we have user data
  if (adminOnly && (!user || user.role !== "admin")) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
