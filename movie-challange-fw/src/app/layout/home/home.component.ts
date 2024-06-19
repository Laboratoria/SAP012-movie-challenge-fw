// Componente Home que exibe a lista de filmes
import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/models/Movie';
import { APIService } from 'src/app/shared/services/API/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];  // Array de filmes para exibição

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
        this.movies = data; // Atualiza a lista de filmes
        // this.movieLast = data;
      },
      error: (error) => {
        console.error('Erro ao buscar filmes:', error);   // Log de erro caso a requisição falha
      }
    });
}
}

