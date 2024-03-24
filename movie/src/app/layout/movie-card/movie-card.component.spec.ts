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
      { id: 1, title: 'Movie 1', image_path: 'path/to/image1.jpg', release_year: '2022' },
      { id: 2, title: 'Movie 2', image_path: 'path/to/image2.jpg', release_year: '2023' }
    ];

    component.movie = testMovies[0]; // Ajuste aqui para fornecer um filme válido
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const movieElement = compiled.querySelector('.container__card-full'); // Ajuste aqui para encontrar o elemento correto

    expect(movieElement).toBeTruthy(); // Verifica se o elemento foi encontrado

    // Verifica o conteúdo do card
    expect(movieElement.querySelector('.card-details h3').textContent).toContain(testMovies[0].title);
    expect(movieElement.querySelector('.card-details p').textContent).toContain(testMovies[0].release_year);
  });

});
