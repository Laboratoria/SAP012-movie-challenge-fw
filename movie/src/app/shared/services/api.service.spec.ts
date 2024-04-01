import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { APIService } from './api.service';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/models/Movie';

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

    service.getMovies().subscribe((res) => {
      expect(res.movies.length).toBe(2);
      expect(res.movies[0].id).toBe(1);
      expect(res.movies[0].genres).toContain('Action');
      expect(res.movies[1].id).toBe(2);
      expect(res.movies[1].genres).toContain('Adventure');
    });

    const reqGenres = httpMock.expectOne('https://api.themoviedb.org/3/genre/movie/list');
    expect(reqGenres.request.method).toBe('GET');
    reqGenres.flush(genresMockResponse);

    const reqMovies = httpMock.expectOne('https://api.themoviedb.org/3/discover/movie?'+ new URLSearchParams({page: '1'}).toString());
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

    const moviesReq = httpMock.expectOne('https://api.themoviedb.org/3/discover/movie?'+ new URLSearchParams({page: '1'}).toString());
    moviesReq.flush(null, { status: 404, statusText: 'Not Found' }); // Em seguida, simule um erro na chamada dos filmes

  });

  // TESTE DE PAGINAÇÃO
  it('deve recuperar filmes com as informações de paginação', () => {
     const genresMockResponse = {
      genres: [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
      ],
    };

    const moviesMockResponse = {
      page: 1,
      total_pages: 10,
      results: [
        { id: 1, title: 'Movie 1', genre_ids: [28] },
        { id: 2, title: 'Movie 2', genre_ids: [12] },
      ],
    };

    service.getMovies().subscribe((res) => {
      expect(res.metaData.pagination.currentPage).toBe(1);
      expect(res.metaData.pagination.totalPages).toBe(10);
      expect(res.movies.length).toBe(2);
    });

    const reqGenres = httpMock.expectOne(`https://api.themoviedb.org/3/genre/movie/list`);
    expect(reqGenres.request.method).toBe('GET');
    reqGenres.flush(genresMockResponse);

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

  it('deve filtrar filmes por gênero quando um genreId é fornecido', () => {
    const mockGenresResponse = { genres: [{ id: 28, name: 'Action' }] };
    const mockFilteredMoviesResponse = {
      page: 1,
      total_pages: 1,
      results: [{ id: 1, title: 'Action Movie', genre_ids: [28] }],
    };

    service.getMovies({ page: 1, genreId: 28 }).subscribe((res) => {
      expect(res.movies.length).toBe(1);
      expect(res.movies[0].genres).toContain('Action');
    });

    const reqGenres = httpMock.expectOne('https://api.themoviedb.org/3/genre/movie/list');
    reqGenres.flush(mockGenresResponse);

    const reqMovies = httpMock.expectOne((req) => req.url.includes('with_genres=28'));
    expect(reqMovies.request.method).toBe('GET');
    reqMovies.flush(mockFilteredMoviesResponse);
  });

  it('deve ordenar filmes conforme o critério sortBy fornecido', () => {
    const mockGenresResponse = { genres: [{ id: 28, name: 'Action' }] };
    const mockSortedMoviesResponse = {
      page: 1,
      total_pages: 1,
      results: [
        { id: 2, title: 'Movie B', release_date: '2020-01-02' },
        { id: 1, title: 'Movie A', release_date: '2020-01-01' }
      ],
    };

    service.getMovies({ page: 1, sortBy: 'release_date.desc' }).subscribe((res) => {
      expect(res.movies[0].title).toBe('Movie B');
      expect(res.movies[1].title).toBe('Movie A');
    });

    const reqGenres = httpMock.expectOne('https://api.themoviedb.org/3/genre/movie/list');
    reqGenres.flush(mockGenresResponse);

    const reqMovies = httpMock.expectOne((req) => req.url.includes('sort_by=release_date.desc'));
    expect(reqMovies.request.method).toBe('GET');
    reqMovies.flush(mockSortedMoviesResponse);
  });

  it('deve usar valores padrão para genreId e sortBy quando não fornecidos', () => {
    const mockGenresResponse = { genres: [{ id: 28, name: 'Action' }] };
    const mockMoviesResponse = {
      page: 1,
      total_pages: 1,
      results: [{ id: 1, title: 'Movie', genre_ids: [28] }],
    };

    service.getMovies({ page: 1 }).subscribe((res) => {
      expect(res.movies.length).toBe(1);
      expect(res.filters.genreId).toBeUndefined();
      expect(res.filters.sortBy).toBeUndefined();
    });

    const reqGenres = httpMock.expectOne('https://api.themoviedb.org/3/genre/movie/list');
    reqGenres.flush(mockGenresResponse);

    const reqMovies = httpMock.expectOne((req) => !req.url.includes('with_genres') && !req.url.includes('sort_by'));
    expect(reqMovies.request.method).toBe('GET');
    reqMovies.flush(mockMoviesResponse);
  });

});

