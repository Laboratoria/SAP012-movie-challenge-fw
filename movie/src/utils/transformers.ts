import { Movie } from "src/models/Movie";

export function formatMovie(apiMovieData: any): Movie{

  const formattedMovie: Movie = {
    id: apiMovieData.id,
    title: apiMovieData.title || "Unknown Title",
    image_path: apiMovieData.poster_path,
    release_year: new Date(apiMovieData.release_date).getFullYear().toString(),
  };

  return formattedMovie;
}
