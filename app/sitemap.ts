import { fetchMovies } from "../lib/api";
import { MetadataRoute } from "next";

const SITE_URL = "http://localhost:3000/";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const movieData = await fetchMovies();

  if (!movieData) {
    console.error("No movies found");
    return [];
  }

  const detailedMoviePages = movieData.results.map((movie: IMovie) => ({
    url: `${SITE_URL}/movie/${movie.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...detailedMoviePages,
  ];
};

export default sitemap;
