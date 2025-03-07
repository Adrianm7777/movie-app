interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface IMoviesData {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IGenresData {
  genres: IGenre[];
}

interface IGenre {
  id: number;
  name: string;
  genres: IGenre[];
}
