const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page: number = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!res.ok) {
    console.error("Failed to fetch movies:", res.status, res.statusText);
    return null;
  }
  return res.json();
};

export const fetchMovieDetails = async (id: string) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!res.ok) {
    console.error("Failed to fetch movie details:", res.status, res.statusText);
    return null;
  }
  return res.json();
};
