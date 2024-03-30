import { Movie } from "src/models/Movie";

export function formatMovie(apiMovieData: any): Movie{
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  const formattedMovie: Movie = {
    id: apiMovieData.id,
    title: apiMovieData.title,
    image_path: apiMovieData.poster_path ? `${baseUrl}${apiMovieData.poster_path}` : '/image.png',
    release_year: apiMovieData.release_date ? new Date(apiMovieData.release_date).getFullYear().toString() : 'N/A',
    genres: apiMovieData.genres_ids ? apiMovieData.genres_ids.map((genre: { name: string }) => genre.name) : []
  };

  return formattedMovie;
}
