import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit{
  movie: Movie | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(private location: Location, private apiService: APIService, private route: ActivatedRoute) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getMovieDetail(+id).subscribe({
        next: (movie) => {
          this.movie = movie;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erro ao obter detalhes do filme';
          this.loading = false;
        }
      });
    }
  }
}
