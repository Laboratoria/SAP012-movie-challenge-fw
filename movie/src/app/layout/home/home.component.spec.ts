import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { APIService } from 'src/app/shared/services/api.service';
import { Movie } from 'src/models/Movie';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MatProgressBar } from '@angular/material/progress-bar';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: APIService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MovieListComponent,
        MatProgressBar
      ],
      providers: [
        APIService,
        { provide: ActivatedRoute, useValue: { queryParams: of({ currentPage: 1 }) } },
        { provide: Router, useValue: routerSpyObj },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    apiService = TestBed.inject(APIService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('dee criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar filmes na inicialização', fakeAsync(() => {
    const movies: Movie[] = [
      {
        id: 1,
        title: 'Movie 1',
        image_path: 'path/to/image1.jpg',
        release_year: '2022',
      },
      {
        id: 2,
        title: 'Movie 2',
        image_path: 'path/to/image2.jpg',
        release_year: '2023',
      },
    ];
    spyOn(apiService, 'getMovies').and.returnValue(
      of({
        filters: { page: 1 },
        metaData: { pagination: { currentPage: 1, totalPages: 1 } },
        movies: movies,
      })
    );
    expect(movies).toBeTruthy();
    component.ngOnInit();
    tick(3000); // Avance o relógio em 3000 milissegundos
    expect(apiService.getMovies).toHaveBeenCalled();
    expect(component.movies).toEqual(movies);
  }));

  it('deve navegar para a página correta quando onPageChange for chamado', () => {
    const page = 3;
    component.onPageChange(page);
    expect(routerSpy.navigate).toHaveBeenCalledWith([], {
      queryParams: { currentPage: page },
    });
  });
});
