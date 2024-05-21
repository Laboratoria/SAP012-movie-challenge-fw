// Implementação da Função - Trandformação dos dados criado no arquivo models/Movie
import { Movie } from 'src/models/Movie';

const formatMovie = (dataApi: any): Movie => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  return {
    title: dataApi.title,
    poster: `${baseUrl}${dataApi.poster_path}`,
    release_year: new Date (dataApi.release_date).getFullYear(),
    id: dataApi.id,
  };
};

export { formatMovie };

// any vem qualquer coisa

// A função deve receber um objeto de dados de filme da API como parâmetro e retornar um objeto do modelo de negócios Movie.

// caso eu queira incluir os genresMap - const formatMovie = (dataApi: any, genresMap: Map<number, string>):