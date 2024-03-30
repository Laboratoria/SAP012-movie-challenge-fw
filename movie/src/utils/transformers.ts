import { Movie } from 'src/models/Movie';

export function formatMovie(apiMovieData: any): Movie {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  const formattedMovie: Movie = {
    id: apiMovieData.id || 1011985,
    title: apiMovieData.title || 'Kung Fu Panda 4',
    image_path: apiMovieData.poster_path ? `${baseUrl}${apiMovieData.poster_path}` : 'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
    release_year: apiMovieData.release_date
      ? new Date(apiMovieData.release_date).getFullYear().toString()
      : 'N/A',
    genres: apiMovieData.genres_ids || ['Action', 'Adventure', 'Animation', 'Comedy', 'Family'],
  };

  return formattedMovie;
}

export function formatGenresToMap(genreData: Array<{ id: number; name: string }>): Map<number, string> {
  const genresMap = new Map<number, string>();
  genreData.forEach(genre => {
      genresMap.set(genre.id, genre.name);
  });
  return genresMap;
}
