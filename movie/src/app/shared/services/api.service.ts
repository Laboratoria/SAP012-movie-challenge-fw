import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Movie } from 'src/models/Movie';
import { formatMovie, formatGenresToMap } from 'src/utils/transformers';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  getMovies(filters: { page: number } = { page: 1 }): Observable<{ filters: { page: number }, metaData: { pagination: { currentPage: number; totalPages: number } }, movies: Movie[] }> {
    return this.getMovieGenres().pipe(
      switchMap(genresArray => {
        const genresMap = formatGenresToMap(genresArray);

        const page = filters.page || 1;
        const url = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
        const headers = {
          'Authorization': `Bearer ${environment.TOKEN_API}`,
        };

        return this.http.get<any>(url, { headers }).pipe(
          map(apiResponse => ({
            filters: { page: apiResponse.page },
            metaData: {
              pagination: {
                currentPage: apiResponse.page,
                totalPages: apiResponse.total_pages,
              },
            },
            movies: apiResponse.results.map((movie: any) => formatMovie(movie, genresMap)), // Agora passando genresMap
          }))
        );
      })
    );
  }

  getMovieGenres(): Observable<{ id: number; name: string }[]> {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const headers = {
      'Authorization': `Bearer ${environment.TOKEN_API}`,
    };
    return this.http.get<any>(url, { headers }).pipe(
      map(apiResponse => apiResponse.genres)
    );
  }
}
