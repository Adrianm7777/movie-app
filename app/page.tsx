import { Metadata } from "next";
import { fetchMovies } from "../lib/api";
import { HomePage } from "./components/pages/HomePage";
import notFound from "./not-found";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000/"),
  title: "DailyHub",
  description: "Discover the latest movies and TV shows on DailyHub",
  openGraph: {
    type: "website",
    description: "Discover the latest movies and TV shows on DailyHub",
    locale: "pl_PL",
    url: "http://localhost:3000/",
    siteName: "DailyBook",
  },
};

const Home = async ({ searchParams }: IProps) => {
  const { sort } = await searchParams;
  const sortParam = sort ?? "release_date.desc";
  const sortBy =
    typeof sortParam === "string" ? sortParam : "release_date.desc";

  let movies: IMovie[] | undefined;

  try {
    const moviesData = await fetchMovies(sortBy);
    if (!moviesData || !moviesData.results) {
      console.error("No movies data returned");
      return notFound();
    }
    movies = moviesData.results;
  } catch (err) {
    console.error("Error loading movies:", err);
    return notFound();
  }

  return <HomePage movies={movies} />;
};

export default Home;
