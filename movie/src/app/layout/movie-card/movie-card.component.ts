import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input()
  movies: Movie[] = [];
  // images: string[] = [];

  constructor(
    readonly service: APIService
  ) {
    this.service.getMovies().subscribe({
      next: movies => {
        this.movies = movies;
        console.log('Filmes recebidos:', movies); // Adiciona um console.log para exibir os filmes recebidos
      },
      error: error => console.error(error)
    });
  }
}
