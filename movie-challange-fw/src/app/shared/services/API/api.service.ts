// Todo o processo de obtenção dos dados serão feitos no metodo APIService //
// Componentes da comunicação Http - Url / metodo (get ou post) / headers/ body

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { Movie } from 'src/models/Movie';
import { formatMovie } from 'src/utils/transformers';

// Serviço de API para buscar dados dos filmes
@Injectable({
  providedIn: 'root',
})
export class APIService {
  apiUrl = environment.BASE_URL;  //URL base da API, configurada no arquivo de ambiente

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
    return this.http
      .get<Movie[] >(`${this.apiUrl}/discover/movie`, { headers })
      .pipe(    //pipe: Encadeia operadores do RxJS para transformar os dados recebidos.
        map((response:any) =>
          response.results.map((rawData:any) => formatMovie(rawData))
        )
      );
  }
}
// return this.http.get<Movie[]>(this.URL)} -- fazendo retorno dos dados
// @Injectable marca a classe como um serviço injetável
// HttpClient: um tipo de dependencia que faz requisições HTTP
// Observable: Trabalhar com fluxos de dados assíncronos
//readonly: Significa que a propriedade não pode ser alterada depois de ser inicializada
