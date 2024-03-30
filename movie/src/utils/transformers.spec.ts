import { formatMovie } from './transformers';

describe('formatMovie', () => {
  it('deve retornar um objeto com os quatro elementos solicitados', () => {
    const apiMovieData = {
      results: [
        {
          id: 1011985,
          title: 'Kung Fu Panda 4',
          poster_path: '/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
          release_date: '2024-03-02',
          genres: ['Action', 'Adventure', 'Animation', 'Comedy', 'Family'],
        },
      ],
    };

    const formattedMovie = formatMovie(apiMovieData.results[0]);
    expect(formattedMovie).toEqual({
      id: 1011985,
      title: 'Kung Fu Panda 4',
      image_path:
        'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
      release_year: '2024',
      genres: ['Action', 'Adventure', 'Animation', 'Comedy', 'Family'],
    });
  });
});
