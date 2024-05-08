[]
import { formatMovie } from './transformers';

fdescribe('formatMovie', () => {
    it('deve retornar um objeto Movie formatado corretamente', () => {
        // Dados de exemplo de filme da API
        const apiMovieData = {
                "adult": false,
                "backdrop_path": "/k0ucFBBgSDTXYU8fVHXJyjAuIIe.jpg",
                "genre_ids": [
                  27
                ],
                "id": 1,
                "original_language": "fr",
                "original_title": "Vermines",
                "overview": "Esta é uma sinopse de exemplo",
                "popularity": 611.27,
                "poster_path": "/example_poster.jpg",
                "release_date": "2022-12-27",
                "title": "Exemplo de Filme",
                "video": false,
                "vote_average": 7.5,
                "vote_count": 171
        };

        // Resultado esperado após a formatação
        const expectedFormattedMovie = {
            id: 1,
            title: 'Exemplo de Filme',
            poster_path: 'https://image.tmdb.org/t/p/w500/example_poster.jpg',
            release_date: '2022',
            overview: 'Esta é uma sinopse de exemplo',
            vote_average: 7.5,
        };

        // Chama a função formatMovie com os dados de exemplo
        const formattedMovie = formatMovie(apiMovieData);
        // Verifica se o objeto retornado corresponde ao objeto esperado
        expect(formattedMovie).toEqual(expectedFormattedMovie);
    })
});