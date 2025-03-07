const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  sortBy: string = "release_date.desc"
): Promise<IMoviesData | null> => {
  let tmdbSort;
  switch (sortBy) {
    case "title.desc":
      tmdbSort = "original_title.desc";
      break;
    case "vote_average.desc":
      tmdbSort = "vote_average.desc";
      break;
    case "release_date.desc":
    default:
      tmdbSort = "release_date.desc";
      break;
  }

  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${tmdbSort}&include_adult=false`
  );

  if (!res.ok) {
    console.error("Failed to fetch movies:", res.status, res.statusText);
    return null;
  }

  return res.json();
};

export const fetchMovieDetails = async (id: string): Promise<IMovie | null> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

  if (!res.ok) {
    console.error("Failed to fetch movie details:", res.status, res.statusText);
    return null;
  }

  return res.json();
};

export const fetchMovieGenres = async (): Promise<IGenresData | null> => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

  if (!res.ok) {
    console.error("Failed to fetch genres:", res.status, res.statusText);
    return null;
  }

  return res.json();
};
