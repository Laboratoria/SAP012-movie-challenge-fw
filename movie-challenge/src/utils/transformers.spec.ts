import { formatMovie } from './transformers';

describe('formatMovie', () => {
    it('deve retornar um objeto Movie formatado corretamente', () => {
        // Dados de exemplo de filme da API
        const apiMovieData = {
            id: 1,
            title: 'Exemplo de Filme',
            poster_path: '/example_poster.jpg',
            release_date: '2022-01-01',
            overview: 'Esta é uma sinopse de exemplo',
            vote_average: 7.5,
        };

        // Resultado esperado após a formatação
        const expectedFormattedMovie = {
            id: 1,
            title: 'Exemplo de Filme',
            image_path: 'https://image.tmdb.org/t/p/w500/example_poster.jpg',
            release_year: '2022',
            overview: 'Esta é uma sinopse de exemplo',
            vote_average: 7.5,
        };

        // Chama a função formatMovie com os dados de exemplo
        const formattedMovie = formatMovie(apiMovieData);
        console.log(formattedMovie)
        // Verifica se o objeto retornado corresponde ao objeto esperado
        expect(formattedMovie).toEqual(expectedFormattedMovie);
    })
});
      

