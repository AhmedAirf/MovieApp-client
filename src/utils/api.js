const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function fetchUserProfile() {
  const res = await fetch(`${BASE_URL}/users/profile`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

// Fetch the user's watchlist
export async function fetchWatchlist() {
  const res = await fetch(`${BASE_URL}/users/watchlist`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch watchlist");
  return res.json();
}

// Add a movie/TV show to the user's watchlist
export async function addToWatchlist(item) {
  const res = await fetch(`${BASE_URL}/users/watchlist`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Failed to add to watchlist");
  return res.json();
}

// Remove a movie/TV show from the user's watchlist
export async function removeFromWatchlist(tmdbid) {
  const res = await fetch(`${BASE_URL}/users/watchlist/${tmdbid}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to remove from watchlist");
  return res.json();
}
