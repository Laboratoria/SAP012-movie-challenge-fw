import { formatMovie, formatGenresToMap } from './transformers';

describe('formatMovie', () => {
  // DEVE RETORNAR OS 5 ELEMENTOS
  it('deve retornar um objeto com os cinco elementos solicitados', () => {
    const apiMovieData = {
      id: 1011985,
      title: 'Kung Fu Panda 4',
      poster_path: '/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
      release_date: '2024-03-02',
      genre_ids: [28, 12, 16, 35, 10751],
      overview: 'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
      vote_average: 6.8
    };

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
      genres: ['Action', 'Adventure', 'Animation', 'Comedy', 'Family'],
      overview: 'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
      vote_average: 6.8
    });

  });

});
