// Implementação da Função - Transformação dos dados criado no arquivo models/Movie
import { Movie } from 'src/models/Movie';

//Função responsavel pela transformação dos dados brutos de um filme para o formato definido pelo modelo Movie
const formatMovie = (rawData: any): Movie => {

  //URL base para as imagens dos filmes
  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  //Retorna um objeto Movie com as propriedades formatadas
  //Atribuir as propriedades relevantes dos dados da API às propriedades correspondentes no modelo de negócios Movie
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