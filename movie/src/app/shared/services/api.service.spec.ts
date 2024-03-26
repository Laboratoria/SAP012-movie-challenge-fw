import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/models/Movie';
import { formatMovie } from 'src/utils/transformers';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<{ filters: {page: number }, metaData: { pagination: { currentPage: number, totalPages: number }}, movies: Movie[] }> {
    const url = `https://api.themoviedb.org/3/discover/movie`;
    const headers = {
      'Authorization': `Bearer ${environment.TOKEN_API}`
    };

    return this.http.get<any>(url, { headers }).pipe(
      map((apiResponse: any) => {
        const movies: Movie[] = apiResponse.results.map((movie: any) => {
          return {
            id: movie.id,
            title: movie.title,
            image_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/image.png',
            release_year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : 'N/A',
          };
        });

        return {
          filters: { page: apiResponse.page },
          metaData: {
            pagination: {
              currentPage: apiResponse.page,
              totalPages: apiResponse.total_pages
            }
          },
          movies: movies,
        };
      })
    );
  }
}
