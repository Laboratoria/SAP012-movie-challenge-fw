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
  it('deve retornar dados do filmes se a solicitação da API foi bem-sucedida', () => {
    const mockResponse = {
      page: 1,
      total_pages: 2,
      results: [
        {
          id: 1,
          title: 'Movie 1',
          poster_path: '/poster1.jpg',
          release_date: '2022-01-01',
          genres: ['Action'],
        },
        {
          id: 2,
          title: 'Movie 2',
          poster_path: '/poster2.jpg',
          release_date: '2022-02-01',
          genres: ['Adventure'],
        },
      ],
    };

    service.getMovies().subscribe((data) => {
      expect(data.metaData.pagination.currentPage).toBe(1);
      expect(data.metaData.pagination.totalPages).toBe(2);
      expect(data.movies.length).toBe(2);
      expect(data.movies[0].id).toBe(1);
      expect(data.movies[0].title).toBe('Movie 1');
      // Continue your assertions for the rest of the movie properties
    });

    const req = httpMock.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  // SOLICITAÇÃO DE ERRO
  it('deve lidar com erro de solicitação de API', () => {
    const errorMessage =
      'Http failure response for https://api.themoviedb.org/3/discover/movie?page=1: 404 Not Found';

    service.getMovies().subscribe(
      () => fail('Expected an error, but received no error'),
      (error) => expect(error.message).toContain(errorMessage)
    );

    const req = httpMock.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    req.error(new ErrorEvent('network error'), {
      status: 404,
      statusText: 'Not Found',
    });
  });
  // TESTE DE PAGINAÇÃO
  it('deve recuperar filmes com as informações de paginação', () => {
    const dummyMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
    ];
    const dummyApiResponse = {
      page: 1,
      total_pages: 2,
      results: dummyMovies,
    };

    service.getMovies({ page: 1 }).subscribe((response) => {
      expect(response.movies.length).toBe(2);
      expect(response.metaData.pagination.currentPage).toBe(1);
      expect(response.metaData.pagination.totalPages).toBe(2);
    });

    const request = httpMock.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    expect(request.request.method).toBe('GET');
    request.flush(dummyApiResponse);
  });

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
});
