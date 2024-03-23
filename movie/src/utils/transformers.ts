import { Movie } from "src/models/Movie";

export function formatMovie(apiMovieData: any): Movie{
  const baseUrl = 'https://image.tmdb.org/t/p/w500'; // URL base da API TMDB para imagens

  const formattedMovie: Movie = {
    id: apiMovieData.id,
    title: apiMovieData.title,
    image_path: `${baseUrl}${apiMovieData.poster_path}`,
    release_year: new Date(apiMovieData.release_date).getFullYear().toString(),
  };

  return formattedMovie;
}
