import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

import { delay, of, throwError } from 'rxjs';
import { APIService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: APIService; // Instância do serviço APIService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MovieListComponent, MovieCardComponent, HeaderComponent],
      providers: [APIService],
      imports: [ HttpClientTestingModule, MatCardModule, MatProgressBarModule ],
      // Outros módulos necessários devem ser declarados aqui
    }).compileComponents();

    // Inicialize a instância do serviço APIService e injete-a no componente
    apiService = TestBed.inject(APIService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir filmes corretamente', () => {
    // Simule os dados dos filmes
    const movies: Movie[] = [
      { id: 1, title: 'Movie 1', image_path: 'path/to/image1.jpg', release_year: '2022' },
      { id: 2, title: 'Movie 2', image_path: 'path/to/image2.jpg', release_year: '2023' }
    ];

    // Espie o método getMovies para retornar os filmes simulados
    const apiServiceSpy = jasmine.createSpyObj('APIService', ['getMovies']);
  apiServiceSpy.getMovies.and.returnValue(of({ movies: movies, totalPages: 1 }));

    // Chame o método ngOnInit do componente
    component.ngOnInit();
    fixture.detectChanges();

    // Verifique se os filmes são exibidos corretamente
    const movieList = fixture.nativeElement.querySelectorAll('app-movie-list');
    expect(movieList.length).toBe(1);
    expect(component.movies).toEqual(movies);
  });

  it('deve exibir o indicador de carregamento ao buscar dados', () => {
    // Espie o método getMovies para simular um atraso
    const apiServiceSpy = jasmine.createSpyObj('APIService', ['getMovies']);
    apiServiceSpy.getMovies.and.returnValue(of({ movies: [], totalPages: 0 }).pipe(delay(1000)));

  // Chame o método ngOnInit do componente
  component.ngOnInit();
  fixture.detectChanges();

  // Aguarde o atraso de 1000 ms para garantir que o indicador de carregamento seja exibido
  setTimeout(() => {
    // Verifique se o indicador de carregamento está sendo exibido
    const loadingIndicator = fixture.nativeElement.querySelector('.loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  }, 1000); // Tempo de espera igual ao atraso simulado
});

it('deve exibir mensagem de erro da API', () => {
  // Simular um erro na API
  spyOn(apiService, 'getMovies').and.returnValue(throwError('API error'));

  // Chamar o método ngOnInit do componente
  component.ngOnInit();
  fixture.detectChanges();

  // Verificar se a mensagem de erro está sendo exibida corretamente
  const errorMessage = fixture.nativeElement.querySelector('.error-message p');
  expect(errorMessage).toBeTruthy(); // Verifica se o elemento com a classe '.error-message' existe
  expect(errorMessage.textContent).toContain('Erro ao obter os dados dos filmes. Por favor, tente novamente mais tarde.');
});


});

