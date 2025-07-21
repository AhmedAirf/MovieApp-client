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

// Fetch all users (admin only)
export async function fetchAllUsers() {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// Update user (admin only)
export async function updateUser(userId, userData) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

// Delete user (admin only)
export async function deleteUser(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
}

// Get user by ID (admin only)
export async function getUserById(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
