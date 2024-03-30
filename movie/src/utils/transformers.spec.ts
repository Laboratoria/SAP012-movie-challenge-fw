import { formatMovie, formatGenresToMap } from './transformers';

describe('formatMovie', () => {
  // DEVE RETORNAR OS 5 ELEMENTOS
  it('deve retornar um objeto com os cinco elementos solicitados', () => {
    const apiMovieData = {
      id: 1011985,
      title: 'Kung Fu Panda 4',
      poster_path: '/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
      release_date: '2024-03-02',
      genre_ids: [28, 12, 16, 35, 10751], // IDs de gêneros fictícios para este exemplo
    };

    // Certifique-se de que o genresMap inclua todos os gêneros esperados pelo teste
    const genresMap = new Map([
      [28, 'Action'],
      [12, 'Adventure'],
      [16, 'Animation'],
      [35, 'Comedy'],
      [10751, 'Family'],
    ]);

    const formattedMovie = formatMovie(apiMovieData, genresMap);
    expect(formattedMovie).toEqual({
      id: 1011985,
      title: 'Kung Fu Panda 4',
      image_path: 'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
      release_year: '2024',
      genres: ['Action', 'Adventure', 'Animation', 'Comedy', 'Family'], // Os gêneros agora são mapeados corretamente
    });

  });

});
