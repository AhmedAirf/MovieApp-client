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

// Check if a user object or JWT payload is admin
export function isAdmin(user) {
  if (!user) return false;
  return user.role === "admin";
}
