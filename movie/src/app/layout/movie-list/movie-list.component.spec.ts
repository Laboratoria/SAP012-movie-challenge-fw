import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { Movie } from 'src/models/Movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListComponent, MovieCardComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie list', () => {
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

    console.log('Movies:', movies); // Adiciona este console.log para verificar os dados dos filmes

    component.movies = movies;
    fixture.detectChanges();

    const movieCardElements =
      fixture.nativeElement.querySelectorAll('app-movie-card');
    console.log('Movie card elements:', movieCardElements); // Adiciona este console.log para verificar os elementos movie-card

    expect(movieCardElements.length).toBe(movies.length);

    movieCardElements.forEach(
      (movieCardElement: HTMLElement, index: number) => {
        const movie = movies[index];
        expect(movieCardElement.getAttribute('title')).toContain(movie.title);
        expect(movieCardElement.getAttribute('release_year')).toContain(
          movie.release_year
        );
        expect(movieCardElement.getAttribute('poster_path')).toContain(
          movie.image_path
        );
      }
    );
  });

  it('should render "No movies found" message for empty movie list', () => {
    // Deixando a lista de filmes vazia
    component.movies = [];
    fixture.detectChanges();

    // Verificando se a mensagem "No movies found" está presente
    const messageElement =
      fixture.nativeElement.querySelector('.no-movies-message');
    expect(messageElement).toBeTruthy(); // Corrigindo o erro aqui
    expect(messageElement.textContent).toContain('No movies found');
  });
});
