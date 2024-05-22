// Importa os decoradores e interfaces necessários do Angular
import { Component, OnInit } from '@angular/core';

// Importa o serviço TheMovieDbService para fazer requisições à API de filmes
import { TheMovieDbService } from '../../shared/services/the-movie-db/the-movie-db.service';

// Importa o modelo Movie para tipagem dos dados dos filmes
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-home',  // Define o seletor do componente, que será usado em templates HTML
  templateUrl: './home.component.html',  // Define o arquivo de template HTML do componente
  styleUrls: ['./home.component.css']  // Define o arquivo de estilos CSS do componente
})
export class HomeComponent implements OnInit {
  // Declara uma variável `movies` que armazenará a lista de filmes
  movies: Movie[] = [];
  
  // Declara uma variável `isLoading` para controlar o estado de carregamento
  isLoading: boolean = true;

  // O construtor injeta o serviço TheMovieDbService, que será usado para obter os filmes
  constructor(private movieService: TheMovieDbService) {}

  // O método ngOnInit é um lifecycle hook que é chamado quando o componente é inicializado
  ngOnInit(): void {
    // Chama o método getMovies do serviço TheMovieDbService para obter os dados dos filmes
    this.movieService.getMovies().subscribe({
      // Função de callback que é executada quando a requisição é bem-sucedida
      next: (movies) => {
        this.movies = movies;  // Armazena os filmes recebidos na variável `movies`
        this.isLoading = false;  // Define `isLoading` como false para indicar que o carregamento terminou
      },
      // Função de callback que é executada em caso de erro na requisição
      error: (error) => {
        console.error('Erro ao obter filmes:', error);  // Loga o erro no console para depuração
        this.isLoading = false;  // Define `isLoading` como false mesmo em caso de erro, para parar o indicador de carregamento
      }
  });
  }
}