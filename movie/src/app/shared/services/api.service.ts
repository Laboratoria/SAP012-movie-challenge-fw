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

  getMovies(): Observable<{ movies: Movie[]; totalPages: number }> {
    const url = `https://api.themoviedb.org/3/discover/movie`;
    const headers = {
      'Authorization': `Bearer ${environment.TOKEN_API}`
    };

    return this.http.get<any>(url, { headers }).pipe(
      map((apiResponse: any) => ({
        movies: apiResponse.results.map((movie: any) => formatMovie(movie)),
        totalPages: apiResponse.total_pages
      }))
    );
  }
}
