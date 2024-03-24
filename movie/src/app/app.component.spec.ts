import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieListComponent } from './layout/movie-list/movie-list.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientModule],
    declarations: [
      AppComponent,
      HeaderComponent,
      MovieCardComponent,
      MovieListComponent
    ]
  }));

  it('deve criar o aplicativo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`deveria ter como título 'movie'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('movie');
  });
});
