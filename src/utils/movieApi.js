const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function fetchAllMovies() {
  const res = await fetch(`${BASE_URL}/media/movies`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

export async function fetchAllTvShows() {
  const res = await fetch(`${BASE_URL}/media/tv-shows`);
  if (!res.ok) throw new Error("Failed to fetch TV shows");
  return res.json();
}

export async function fetchTrending() {
  const res = await fetch(`${BASE_URL}/media/trending`);
  if (!res.ok) throw new Error("Failed to fetch trending content");
  return res.json();
}

export async function fetchNowPlayingMovies() {
  const res = await fetch(`${BASE_URL}/media/movies/now-playing`);
  if (!res.ok) throw new Error("Failed to fetch now playing movies");
  return res.json();
}

export async function fetchUpcomingMovies() {
  const res = await fetch(`${BASE_URL}/media/movies/upcoming`);
  if (!res.ok) throw new Error("Failed to fetch upcoming movies");
  return res.json();
}

export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/media/genres`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
}

export async function fetchMediaById(type, id) {
  const res = await fetch(`${BASE_URL}/media/${type}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch media details");
  return res.json();
}

export async function fetchMediaVideos(type, id) {
  const res = await fetch(`${BASE_URL}/media/${type}/${id}/videos`);
  if (!res.ok) throw new Error("Failed to fetch media videos");
  return res.json();
}

export async function fetchMediaCredits(type, id) {
  const res = await fetch(`${BASE_URL}/media/${type}/${id}/credits`);
  if (!res.ok) throw new Error("Failed to fetch media credits");
  return res.json();
}

export async function fetchMediaImages(type, id) {
  const res = await fetch(`${BASE_URL}/media/${type}/${id}/images`);
  if (!res.ok) throw new Error("Failed to fetch media images");
  return res.json();
}

export async function fetchMediaRecommendations(type, id) {
  const res = await fetch(`${BASE_URL}/media/${type}/${id}/recommendations`);
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}

export async function fetchPopularMedia(type) {
  const res = await fetch(`${BASE_URL}/media/${type}/popular`);
  if (!res.ok) throw new Error("Failed to fetch popular media");
  return res.json();
}

export async function fetchTopRatedMedia(type) {
  const res = await fetch(`${BASE_URL}/media/${type}/top-rated`);
  if (!res.ok) throw new Error("Failed to fetch top rated media");
  return res.json();
}

export async function fetchPersonDetails(id) {
  const res = await fetch(`${BASE_URL}/media/person/${id}`);
  if (!res.ok) throw new Error("Failed to fetch person details");
  return res.json();
}

export async function fetchPersonCredits(id) {
  const res = await fetch(`${BASE_URL}/media/person/${id}/credits`);
  if (!res.ok) throw new Error("Failed to fetch person credits");
  return res.json();
}

export async function fetchAiringToday() {
  const res = await fetch(`${BASE_URL}/media/airing-today/tv`);
  if (!res.ok) throw new Error("Faild to fetch Airing Today ");
  return res.json();
}

export async function fetchOnTheAir() {
  const res = await fetch(`${BASE_URL}/media/on-the-air/tv`);
  if (!res.ok) throw new Error("Faild to fetch On The Air Tv");
  return res.json();
}

export async function searchContent(query) {
  const res = await fetch(
    `${BASE_URL}/media/search?query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to search content");
  return res.json();
}
