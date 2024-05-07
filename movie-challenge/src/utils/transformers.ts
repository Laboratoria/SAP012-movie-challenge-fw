import { Movie } from "src/models/Movie";

export function formatMovie (apiMovieData: any): Movie{
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

      return {
    id: apiMovieData.id,
    title: apiMovieData.title,
    image_path: apiMovieData.poster_path ? `${baseUrl}${apiMovieData.poster_path}` : 'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
    release_year: apiMovieData.release_date ? (apiMovieData.release_date).slice(0,4) : 'Desconhecido',
    overview: apiMovieData.overview,
    vote_average: apiMovieData.vote_average,
  };
}