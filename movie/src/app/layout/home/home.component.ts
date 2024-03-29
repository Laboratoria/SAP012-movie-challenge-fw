import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  paginationState: { currentPage: number; totalPages: number } = {
    currentPage: 1,
    totalPages: 1,
  };
  error: string | null = null;
  loading: boolean = true;

  constructor(
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loadMovies(this.paginationState.currentPage);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const currentPage = params['currentPage']
        ? parseInt(params['currentPage'])
        : 1;
      this.loadMovies(currentPage);
    });
  }

  loadMovies(currentPage: number): void {
    setTimeout(() => {
      this.apiService.getMovies({page: currentPage}).subscribe(
        (response: any) => {
          this.movies = response.movies;
          this.paginationState.currentPage =
            response.metaData.pagination.currentPage;
          this.paginationState.totalPages =
            response.metaData.pagination.totalPages;
        },
        (error: any) => {
          console.error('Error loading movies:', error);
          this.error =
            'Erro ao obter os dados dos filmes. Por favor, tente novamente mais tarde.';
        }
      );
    }, 3000);
  }

  onPageChange(page: number): void {
    this.router.navigate([], { queryParams: { currentPage: page } });
  }
}
