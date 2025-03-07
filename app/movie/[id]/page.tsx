import { Metadata } from "next";
import { fetchMovieDetails } from "../../../lib/api";

import { MovieDetailsPage } from "../../components/pages/MovieDetailsPage";
import notFound from "../../not-found";

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: MovieDetailsProps): Promise<Metadata> => {
  const { id } = await params;
  let movie: IMovie | null = null;

  try {
    movie = await fetchMovieDetails(id);
    if (!movie) {
      return {
        title: "Movie Not Found - DailyHub",
        description: "The requested movie could not be found on DailyHub.",
      };
    }
    return {
      title: `${movie.title} - DailyHub`,
      description: movie.overview || "Watch the latest movies on DailyHub",
      keywords: `${movie.title}, movie details, DailyHub, ${movie.release_date}`,
      openGraph: {
        title: `${movie.title} - DailyHub`,
        description: movie.overview || "Explore movie details on DailyHub",
        url: `https://yourwebsite.com/movie/${id}`,
        images: [
          {
            url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            width: 500,
            height: 750,
            alt: `${movie.title} movie poster`,
          },
        ],
        type: "website",
      },
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "Error - DailyHub",
      description: "An error occurred while loading the movie details.",
    };
  }
};

const MovieDetailsServer = async ({ params }: MovieDetailsProps) => {
  const { id } = await params;

  let movie: IMovie | null = null;

  try {
    const data = await fetchMovieDetails(id);
    if (!data) {
      console.error("Movie not found");
    }
    movie = data;
  } catch (err) {
    console.error("Error loading movie:", err);
    notFound();
  }

  return <MovieDetailsPage movie={movie} />;
};

export default MovieDetailsServer;
