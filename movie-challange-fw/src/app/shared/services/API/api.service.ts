// Todo o processo de obtenção dos dados serão feitos no metodo APIService //
// Componentes da comunicação Http - Url / metodo (get ou post) / headers/ body

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map, switchMap } from 'rxjs';
import { Movie } from 'src/models/Movie';
import { formatMovie, formatGenresToMap } from 'src/utils/transformers';
import { Genre } from 'src/models/Genre';

// Serviço de API para buscar dados dos filmes
@Injectable({
  providedIn: 'root',
})
export class APIService {
  apiUrl = environment.BASE_URL; //URL base da API, configurada no arquivo de ambiente
  genres: Genre[] = [];

  constructor(private http: HttpClient) {}

  // listar(): Observable<Movie[]> {   //**listar():** Método que faz uma requisição GET à apiUrl e retorna um Observable de um array de qualquer tipo (any[]).
  //   return this.http.get<any>(`{this.apiUrl}`);
  // }
  // Cabeçalho de autorização usando o token da API
  getMovies(): Observable<Movie[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${environment.TOKEN_API}`
    );
    return this.getMovieGenres().pipe(
      map(formatGenresToMap),
      switchMap(genresMap => this.http.get<{ results: any[] }>(`${this.apiUrl}/discover/movie`, { headers }).pipe(
        map(response => response.results.map(rawData => formatMovie(rawData, genresMap)))
      ))
    );
  }

  getMovieGenres(): Observable<Genre[]> {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.TOKEN_API}`,
    });

    return this.http.get<{ genres: Genre[] }>(url, { headers }).pipe(
      map(response => response.genres)
    );
  }
}
// return this.http.get<Movie[]>(this.URL)} -- fazendo retorno dos dados
// @Injectable marca a classe como um serviço injetável
// HttpClient: um tipo de dependencia que faz requisições HTTP
// Observable: Trabalhar com fluxos de dados assíncronos
//readonly: Significa que a propriedade não pode ser alterada depois de ser inicializada
