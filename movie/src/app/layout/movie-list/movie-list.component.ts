import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';
// import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{
  @Input()
  movies: Movie[] = [];
  moviesLoaded: boolean = false;

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.apiService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.moviesLoaded = true; // Atualiza a variável moviesLoaded após carregar os filmes
    });
  }
}
