import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { APIService } from './api.service';
import { environment } from 'src/environments/environment';

describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIService],
    });
    service = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar', () => {
    expect(service).toBeTruthy();
  });
  // BEM-SUCEDIDO
  it('deve retornar dados dos filmes se a solicitação da API foi bem-sucedida', () => {
    // Dados mockados para gêneros e filmes
    const genresMockResponse = {
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' }
      ]
    };

    const moviesMockResponse = {
      page: 1,
      total_pages: 20,
      results: [
        { id: 1, title: 'Movie 1', genre_ids: [28] },
        { id: 2, title: 'Movie 2', genre_ids: [12] }
      ]
    };

    // Executa getMovies() para iniciar o teste
    service.getMovies().subscribe((res) => {
      expect(res.movies.length).toBe(2);
      expect(res.movies[0].id).toBe(1);
      expect(res.movies[0].genres).toContain('Action');
      expect(res.movies[1].id).toBe(2);
      expect(res.movies[1].genres).toContain('Adventure');
    });

    // Primeiro, atende à requisição dos gêneros
    const reqGenres = httpMock.expectOne('https://api.themoviedb.org/3/genre/movie/list');
    expect(reqGenres.request.method).toBe('GET');
    reqGenres.flush(genresMockResponse);

    // Em seguida, atende à requisição dos filmes
    const reqMovies = httpMock.expectOne(`https://api.themoviedb.org/3/discover/movie?page=1`);
    expect(reqMovies.request.method).toBe('GET');
    reqMovies.flush(moviesMockResponse);
  });

  // SOLICITAÇÃO DE ERRO
  it('deve lidar com erro de solicitação de API', () => {
    const genresMockResponse = {
      genres: [{ id: 28, name: 'Action' }]
    };

    const errorMessage = 'Http failure response for https://api.themoviedb.org/3/discover/movie?page=1: 404 Not Found';
    service.getMovies().subscribe(
      () => fail('Expected an error, but received no error'),
      error => expect(error.message).toContain(errorMessage)
    );

    const genresReq = httpMock.expectOne(`https://api.themoviedb.org/3/genre/movie/list`);
    genresReq.flush(genresMockResponse); // Primeiro responda à chamada dos gêneros

    const moviesReq = httpMock.expectOne(`https://api.themoviedb.org/3/discover/movie?page=1`);
    moviesReq.flush(null, { status: 404, statusText: 'Not Found' }); // Em seguida, simule um erro na chamada dos filmes

  });

  // TESTE DE PAGINAÇÃO
  it('deve recuperar filmes com as informações de paginação', () => {
     // Mock da resposta dos gêneros
     const genresMockResponse = {
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
      ],
    };

    // Mock da resposta dos filmes com paginação
    const moviesMockResponse = {
      page: 1,
      total_pages: 10,
      results: [
        { id: 1, title: 'Movie 1', genre_ids: [28] },
        { id: 2, title: 'Movie 2', genre_ids: [12] },
      ],
    };

    // Chame getMovies() que, internamente, deverá primeiro buscar os gêneros
    service.getMovies().subscribe((res) => {
      expect(res.metaData.pagination.currentPage).toBe(1);
      expect(res.metaData.pagination.totalPages).toBe(10);
      expect(res.movies.length).toBe(2);
      // Outras asserções conforme necessário
    });

    // Primeiro, atenda à chamada esperada para os gêneros
    const reqGenres = httpMock.expectOne(`https://api.themoviedb.org/3/genre/movie/list`);
    expect(reqGenres.request.method).toBe('GET');
    reqGenres.flush(genresMockResponse);

    // Em seguida, atenda à chamada esperada para os filmes
    const reqMovies = httpMock.expectOne(r => r.url.includes('https://api.themoviedb.org/3/discover/movie'));
    expect(reqMovies.request.method).toBe('GET');
    reqMovies.flush(moviesMockResponse);
  });
  // BEM SUCEDIDO LISTA DE GÊNEROS
  it('deve retornar a lista de gêneros de filmes se a solicitação da API foi bem-sucedida', () => {
    const mockGenresResponse = {
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
      ],
    };

    service.getMovieGenres().subscribe((genres) => {
      expect(genres.length).toBe(2);
      expect(genres[0].id).toBe(28);
      expect(genres[0].name).toBe('Action');
    });

    // Verificando a solicitação com o cabeçalho correto
    const req = httpMock.expectOne(
      (req) =>
        req.url === 'https://api.themoviedb.org/3/genre/movie/list' &&
        req.headers.has('Authorization') &&
        req.headers.get('Authorization') === `Bearer ${environment.TOKEN_API}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockGenresResponse);
  });

  // it('deve retornar dados dos filmes e mapear os gêneros corretamente', (done) => {
  //   // Mock das respostas da API
  //   const mockGenresResponse = {
  //     genres: [
  //       { id: 28, name: 'Action' },
  //       { id: 12, name: 'Adventure' }
  //     ]
  //   };
  //   const mockMoviesResponse = {
  //     page: 1,
  //     total_pages: 1,
  //     results: [
  //       { id: 1, title: 'Movie 1', image_path: 'path/to/image1.jpg', release_year: '2022', genres: ['Action', 'Adventure'] },
  //       { id: 2, title: 'Movie 2', image_path: 'path/to/image2.jpg', release_year: '2023', genres: ['Drama', 'Romance'] }
  //     ]
  //   };

  //   // Assumindo que getMovieGenres já tenha sido chamado em algum lugar antes
  //   // ou seu efeito seja imitado aqui diretamente.
  //   const reqGenres = httpMock.expectOne('https://api.themoviedb.org/3/genre/movie/list');
  //   expect(reqGenres.request.method).toBe('GET');
  //   reqGenres.flush(mockGenresResponse);

  //   // Imediatamente após, testamos a chamada para os filmes.
  //   service.getMovies().subscribe((response) => {
  //     expect(response.movies.length).toEqual(2);
  //     expect(response.movies[0].genres).toContain('Action');
  //     expect(response.movies[1].genres).toContain('Adventure');
  //     done();
  //   });

  //   const reqMovies = httpMock.expectOne(`https://api.themoviedb.org/3/discover/movie?page=1`);
  //   expect(reqMovies.request.method).toBe('GET');
  //   reqMovies.flush(mockMoviesResponse);
  // });


});
