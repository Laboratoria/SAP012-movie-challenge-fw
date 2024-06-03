import { APIService } from './../../shared/services/API/api.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  movieLast: Movie[] = [];

  constructor(private apiService: APIService) {}
  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.apiService.getMovies().subscribe(
      (data: Movie[]) => {
        console.log('Dados recebidos da API:', data);
        this.movieLast = data;
      },
      (error) => {
        console.error('Erro ao buscar filmes:', error);
      }
    );
  }
}

//o this é o metodso pa