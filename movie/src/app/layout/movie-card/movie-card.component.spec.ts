import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Movie } from 'src/models/Movie';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule
      ]
    });
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
  });

  it('deveria criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o título do filme e o ano de lançamento', () => {
    const testMovies: Movie[] = [
      { id: 1, title: 'Movie 1', image_path: 'path/to/image1.jpg', release_year: '2022' },
      { id: 2, title: 'Movie 2', image_path: 'path/to/image2.jpg', release_year: '2023' }
    ];

    component.movies = testMovies;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const movieElements = compiled.querySelectorAll('.container__card-full');

    expect(movieElements.length).toBe(testMovies.length);

    testMovies.forEach((movie, index) => {
      const movieElement = movieElements[index];
      expect(movieElement.querySelector('.card-details h3').textContent).toContain(movie.title);
      expect(movieElement.querySelector('.card-details p').textContent).toContain(movie.release_year);
    });
  });

  it('deve lidar com array de filmes vazio', () => {
    component.movies = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const movieElements = compiled.querySelectorAll('.container__card-full');

    expect(movieElements.length).toBe(0);
  });
});
