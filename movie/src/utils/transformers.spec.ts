import { formatMovie } from './transformers';

describe('formatMovie', () => {
  it('deve retornar um objeto com os quatro elementos solicitados', () => {
    const apiMovieData =
      {
        "page": 1,
        "results": [
          {
            "adult": false,
            "backdrop_path": "/gJL5kp5FMopB2sN4WZYnNT5uO0u.jpg",
            "genre_ids": [
              28,
              12,
              16,
              35,
              10751
            ],
            "id": 1011985,
            "original_language": "en",
            "original_title": "Kung Fu Panda 4",
            "overview": "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
            "popularity": 5294.537,
            "poster_path": "/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg",
            "release_date": "2024-03-02",
            "title": "Kung Fu Panda 4",
            "video": false,
            "vote_average": 6.913,
            "vote_count": 167
          },        ],
        "total_pages": 43086,
        "total_results": 861705
      };

    const formattedMovie = formatMovie(apiMovieData.results[0]);
    console.log(formattedMovie);
    expect(formattedMovie).toEqual({
      id: 1011985,
      title: 'Kung Fu Panda 4',
      image_path: 'https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg',
      release_year: '2024',
    });
  });
});
