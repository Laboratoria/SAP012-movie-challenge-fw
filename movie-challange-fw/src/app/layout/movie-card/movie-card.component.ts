// Componente que exibe a lista de filmes
import { Component, OnInit } from '@angular/core';

import { APIService } from './../../shared/services/API/api.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  movieLast: Movie[] = [];  // Array de filmes para exibição

  constructor(private apiService: APIService) {} // contructor é usado para injeção de dependência no Angular

  // Método de ciclo de vida do Angular, executado quando o componente é inicializado
  ngOnInit(): void {
    this.listar();  // Chama o método listar para buscar os filmes
  }

  // Método que faz a requisição à API e atualiza a lista de filmes
  listar(): void {
    this.apiService.getMovies().subscribe({
      next: (data: Movie[]) => {
        console.log('Dados recebidos da API:', data); // Log dos dados recebidos
        this.movieLast = data; // Atualiza a lista de filmes
        // this.movieLast = data;
      },
      error: (error) => {
        console.error('Erro ao buscar filmes:', error);   // Log de erro caso a requisição falha
      }
    });
}
}

//o this é o metodso pa