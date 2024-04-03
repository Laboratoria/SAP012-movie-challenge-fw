import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { APIService } from 'src/app/shared/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailComponent],
      providers: [APIService,
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id: '1' }) // Mock params with an observable of id: '1'
        }
      }
      ],
      imports: [HttpClientTestingModule] // Adicionando HttpClientModuleTestingModule
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MovieDetailComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();

  });
});
