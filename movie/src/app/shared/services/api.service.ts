import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/models/Movie';
import { formatMovie } from 'src/utils/transformers';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { } // Injetando o HttpClient para fazer requisições HTTP
  // O método getMovies não deve receber parâmetros
  getMovies(): Observable<Movie[]> {  //método getMovies deve retornar um Observable que emite um array de objetos de filme do modelo de negócios (Observable<Movie[]>).
    const url = `https://api.themoviedb.org/3/discover/movie`; // Construindo a URL da API

    // Adicionando o token da API aos cabeçalhos da requisição
    // token da API nos cabeçalhos da requisição, mas parece que a variável TOKEN_API não está definida em environment.ts ou environment.prod.ts.
    const headers = {
      'Authorization': `Bearer ${environment.TOKEN_API}`
    };

    // Fazendo uma requisição GET para a API com o token da API nos cabeçalhos
    return this.http.get<Movie[]>(url, { headers }).pipe(

      map((apiMovies: any) => {
        // if (!Array.isArray(apiMovies)) {
        //   throw new Error('Resposta inválida da API');
        // }
        // console.log(apiMovies);
        // return apiMovies.map(apiMovie => formatMovie(apiMovie));
        return apiMovies.results.map((movie: any) => formatMovie(movie));
      })
    );
  }
}
