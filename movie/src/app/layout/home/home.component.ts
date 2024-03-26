import { Component, OnInit } from '@angular/core';

import { APIService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  paginationState: { currentPage: number, totalPages: number } = { currentPage: 1, totalPages: 1 };
  error: string | null = null;
  loading: boolean = true;


  constructor(private APIService: APIService) { }

  ngOnInit(): void {

   this.loadData();
  }

  loadData(): void {
    setTimeout(() => {
      this.APIService.getMovies().subscribe(
        (response: { filters: { page: number }, metaData: { pagination: { currentPage: number, totalPages: number }}, movies: Movie[] }) => {
          this.movies = response.movies.map(movie => ({
            ...movie,
            poster_path: `https://image.tmdb.org/t/p/original${movie.image_path}`
          }));
          this.paginationState.totalPages = response.metaData.pagination.totalPages;
        },
        (error: any) => {
          console.error('Error loading movies:', error);
          this.error = 'Erro ao obter os dados dos filmes. Por favor, tente novamente mais tarde.';
        }
      );
    }, 3000 );
  }

  onPageChange(page: number): void {
    this.paginationState.currentPage = page;
    this.loadData();
  }
}
