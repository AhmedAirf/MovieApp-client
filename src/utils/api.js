const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

let authToken = null;

export function setAuthToken(token) {
  authToken = token;
}

function getHeaders(isJson = true) {
  const headers = {};
  if (isJson) headers["Content-Type"] = "application/json";
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Login failed: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Registration failed: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

export async function fetchUserProfile() {
  const res = await fetch(`${BASE_URL}/users/profile`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to fetch profile: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

export async function updateUserProfile(profileData) {
  const res = await fetch(`${BASE_URL}/users/profile`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to update profile: ${res.status} ${res.statusText}`
    );
  }
  return res.json();
}

// Watchlist API functions
export async function fetchWatchlist() {
  const res = await fetch(`${BASE_URL}/users/watchlist`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to fetch watchlist: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function addToWatchlist(mediaItem) {
  // Ensure we have the correct structure
  const requestBody = {
    tmdbid: mediaItem.id || mediaItem.tmdbid,
    media_type: mediaItem.media_type || mediaItem.mediaType || "movie", // Default to movie if not specified
  };

  const res = await fetch(`${BASE_URL}/users/watchlist`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to add to watchlist: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function removeFromWatchlist(mediaId, mediaType) {
  const url = `${BASE_URL}/users/watchlist/${mediaId}?media_type=${mediaType}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to remove from watchlist: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function clearWatchlist() {
  const res = await fetch(`${BASE_URL}/users/watchlist`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ||
        `Failed to clear watchlist: ${res.status} ${res.statusText}`
    );
  }
  return true;
}
