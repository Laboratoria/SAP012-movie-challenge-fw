import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { Movie } from 'src/models/Movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListComponent, MovieCardComponent],
      imports: [HttpClientModule, MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a lista de filmes', () => {
    const movies: Movie[] = [
      { id: 1, title: 'Movie 1', image_path: 'path/to/image1.jpg', release_year: '2022' },
      { id: 2, title: 'Movie 2', image_path: 'path/to/image2.jpg', release_year: '2023' }
    ];

    console.log('Movies:', movies);

    component.movies = movies;
    fixture.detectChanges();

    const movieCardElements =
      fixture.nativeElement.querySelectorAll('app-movie-card');
    console.log('Elementos do Cards de filme:', movieCardElements);

    expect(movieCardElements.length).toBe(movies.length);

    movieCardElements.forEach(
      (movieCardElement: HTMLElement, index: number) => {
        const movie = movies[index];
        console.log('Movie:', movie);
        console.log('Title:', movie.title);
        console.log('Release Year:', movie.release_year);
        console.log('Image Path:', movie.image_path);
        expect(movieCardElement.textContent).toContain(movie.title);
        expect(movieCardElement.textContent).toContain(movie.release_year);
        // Certifique-se de que o atributo 'src' contém o caminho da imagem
        const imgElement = movieCardElement.querySelector('img');
        expect(imgElement).toBeTruthy(); // Verifica se existe um elemento de imagem dentro do movieCardElement
        if (imgElement) {
            expect(imgElement.getAttribute('src')).toContain(movie.image_path);
        }
      }
    );
  });


});
