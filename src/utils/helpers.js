// Store token in localStorage
export function setToken(token) {
  localStorage.setItem("token", token);
}

// Retrieve token from localStorage
export function getToken() {
  return localStorage.getItem("token");
}

// Remove token from localStorage
export function removeToken() {
  localStorage.removeItem("token");
}

// Parse a JWT token and return its payload (or null if invalid)
export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

// Check if a user object or JWT payload is admin
export function isAdmin(user) {
  if (!user) return false;
  return user.role === "admin";
}
