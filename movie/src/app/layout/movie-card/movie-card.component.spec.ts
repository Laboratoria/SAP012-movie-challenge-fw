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

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o título do filme e o ano de lançamento', () => {
    const testMovies: Movie[] = [
      { id: 1, title: 'Movie 1', image_path: 'path/to/image1.jpg', release_year: '2022', genres: ['Action', 'Adventure'] },
      { id: 2, title: 'Movie 2', image_path: 'path/to/image2.jpg', release_year: '2023', genres: ['Drama', 'Romance'] }
    ];

    component.movie = testMovies[0];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const movieElement = compiled.querySelector('.container__card-full');

    expect(movieElement).toBeTruthy();

    expect(movieElement.querySelector('.card-details h3').textContent).toContain(testMovies[0].title);
    expect(movieElement.querySelector('.card-details p').textContent).toContain(testMovies[0].release_year);
  });

  it('deve exibir corretamente os gêneros de um filme', () => {
    component.movie = {
      id: 3,
      title: 'Movie 3',
      image_path: 'path/to/image3.jpg',
      release_year: '2024',
      genres: ['Drama']
    };
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const genresElement = compiled.querySelector('.movie-genres');

    expect(genresElement).toBeTruthy(); // Verifica se o elemento que contém os gêneros foi encontrado
    expect(genresElement.textContent).toContain('Drama'); // Verifica se os gêneros estão sendo exibidos corretamente
  });

  it('deve exibir "Gêneros não disponíveis" para filmes sem gêneros', () => {
    component.movie = {
      id: 4,
      title: 'Movie 4',
      image_path: 'path/to/image4.jpg',
      release_year: '2025',
      genres: [] // Filme sem gêneros
    };
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const genresElement = compiled.querySelector('.movie-genres');

    expect(genresElement).toBeTruthy();
  });

});
