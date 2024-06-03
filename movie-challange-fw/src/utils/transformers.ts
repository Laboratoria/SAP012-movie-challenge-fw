// Implementação da Função - Transformação dos dados criado no arquivo models/Movie
import { Movie } from 'src/models/Movie';

const formatMovie = (rawData: any): Movie => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  return {
    title: rawData.title,
    poster_path: `${baseUrl}${rawData.poster_path}`,
    release_year: new Date (rawData.release_date).getFullYear(),
    id: rawData.id,
    overview: rawData.overview
  };
};

export { formatMovie };

// any vem qualquer coisa

// A função deve receber um objeto de dados de filme da API como parâmetro e retornar um objeto do modelo de negócios Movie.

// caso eu queira incluir os genresMap - const formatMovie = (dataApi: any, genresMap: Map<number, string>):