import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, selectAuth } from "../../../redux/slices/authslice";
import { getToken } from "../../../src/utils/helpers";
import { setAuthToken as setApiAuthToken } from "../../../src/utils/api";
import { setAuthToken as setAdminAuthToken } from "../../../src/utils/adminApi";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(selectAuth);

  useEffect(() => {
    const token = getToken();

    // Always set the token when available
    if (token) {
      setApiAuthToken(token);
      setAdminAuthToken(token);

      // Only try to load user if we don't have user data and aren't already loading
      // Also consider checking error state to prevent infinite loops on failure
      if (!user && !loading && !error) {
        dispatch(loadUser());
      }
    } else {
      // Optional: Clear tokens if no token exists
      setApiAuthToken(null);
      setAdminAuthToken(null);
    }
  }, [dispatch, user, loading, error]);

  return null;
};

export default AuthInitializer;
