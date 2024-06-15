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
  movieList: any[] = [];  // Array de filmes para exibição

  isLoading: boolean = true;  // Flag para indicar carregamento. A flag para indicar carregamento é uma variável booleana
  constructor (private apiService: APIService) {}

  // Método de ciclo de vida do Angular, executado quando o componente é inicializado
  ngOnInit(): void {
    this.listar();   // Chama o método listar para buscar os filmes
}

// Método que faz a requisição à API e atualiza a lista de filmes
listar(): void {
  this.apiService.getMovies().subscribe({   //subscribe modelo atualizado
    next: (data: Movie[]) => {
      console.log('Dados recebidos da API:', data);
      this.movieList = data;
    },
   error: (error) => {
      console.error('Erro ao buscar filmes:', error);
    }
 });
}
}

