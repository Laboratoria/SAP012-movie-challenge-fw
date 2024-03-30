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
  genreOptions: { value: string; label: string }[] = [];
  sortOptions: { value: string; label: string }[] = [
    { value: 'popularity.desc', label: 'Mais populares' },
    { value: 'release_date.desc', label: 'Mais recentes' },
    { value: 'vote_average.desc', label: 'Melhor avaliados' },
  ];
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
    this.loadGenres();
    this.route.queryParams.subscribe(params => {
      const genreId = params['genreId'] ? parseInt(params['genreId'], 10) : undefined;
      const sortBy = params['sortBy'];
      const currentPage = params['currentPage'] ? parseInt(params['currentPage'], 10) : 1;
      this.loadMovies(currentPage, genreId, sortBy);
    });
  }

  loadGenres(): void {
    this.apiService.getMovieGenres().subscribe(genres => {
      this.genreOptions = genres.map(genre => ({
        value: genre.id.toString(),
        label: genre.name
      }));
    });
  }

  onGenreChange(selectedGenre: { value: string; label: string }): void {
    this.router.navigate([], { queryParams: { genreId: selectedGenre.value, currentPage: 1 }, queryParamsHandling: 'merge' });
  }

  onSortChange(selectedSort: { value: string; label: string }): void {
    this.router.navigate([], { queryParams: { sortBy: selectedSort.value, currentPage: 1 }, queryParamsHandling: 'merge' });
  }

  loadMovies(currentPage: number, genreId?: number, sortBy?: string): void {
    this.loading = true;
    this.apiService.getMovies({ page: currentPage, genreId, sortBy }).subscribe(
      (response: any) => {
        this.movies = response.movies;
        this.paginationState.currentPage = response.metaData.pagination.currentPage;
        this.paginationState.totalPages = response.metaData.pagination.totalPages;
        this.loading = false;
      },
      error => {
        console.error('Error loading movies:', error);
        this.error = 'Erro ao obter os dados dos filmes. Por favor, tente novamente mais tarde.';
        this.loading = false;
      }
    );
  }

  onPageChange(page: number): void {
    this.router.navigate([], { queryParams: { currentPage: page } });
  }
}
