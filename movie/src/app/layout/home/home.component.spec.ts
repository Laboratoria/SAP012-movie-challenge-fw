import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

import { delay, of } from 'rxjs';
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
  let apiService: APIService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MovieListComponent,
        MovieCardComponent,
        HeaderComponent,
      ],
      providers: [APIService],
      imports: [HttpClientTestingModule, MatCardModule, MatProgressBarModule],
    }).compileComponents();

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
    const movies: Movie[] = [
      {
        id: 1,
        title: 'Movie 1',
        image_path: 'path/to/image1.jpg', // Caminho da imagem 1
        release_year: '2022',
      },
      {
        id: 2,
        title: 'Movie 2',
        image_path: 'path/to/image2.jpg', // Caminho da imagem 2
        release_year: '2023',
      },
    ];

    spyOn(apiService, 'getMovies').and.returnValue(
      of({
        movies: movies,
        filters: { page: 1 },
        metaData: { pagination: { currentPage: 1, totalPages: 1 } },
      })
    );

    // Chame o método ngOnInit do componente
    component.ngOnInit( );
    fixture.detectChanges();

    // Verifique se os filmes são exibidos corretamente
    // const movieList = component.movies;

    // const movieList = fixture.nativeElement.querySelectorAll('app-home');
    // expect(movieList.length).toBe(1);
    // Verifique se os filmes são exibidos corretamente
    console.log('====================================');
    console.log(component.movies);
    console.log('====================================');
    expect(component.movies).toEqual(movies);
  });


  it('deve exibir o indicador de carregamento ao buscar dados', () => {
    const apiServiceSpy = spyOn(apiService, 'getMovies');
    apiServiceSpy.and.returnValue(
      of({
        movies: [],
        filters: { page: 1 },
        metaData: { pagination: { currentPage: 1, totalPages: 1 } },
        totalPages: 0,
      }).pipe(delay(1000))
    );
    component.ngOnInit();
    fixture.detectChanges();
    const loadingIndicator =
      fixture.nativeElement.querySelector('.loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  });


});
