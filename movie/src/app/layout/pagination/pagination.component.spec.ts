import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { HomeComponent } from '../home/home.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent, HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir o evento onSelectPage ao selecionar uma página', () => {
    let emittedPage: number | undefined;
    component.onSelectPage.subscribe((page: number) => {
      emittedPage = page;
    });
    const pageNumber = 3;
    component.selectPage(pageNumber);
    expect(emittedPage).toBe(pageNumber);
  });

  it('deve gerar números de página corretamente', () => {
    component.currentPage = 3;
    component.totalPages = 10;
    component.generatePages();
    expect(component.pages).toEqual([3, 4, 5, 6, 7, 8]);
  });

  it('deve desativar o botão anterior quando estiver na primeira página', () => {
    component.currentPage = 1;
    component.totalPages = 10;
    fixture.detectChanges();
    const previousButton =
      fixture.nativeElement.querySelector('.previous-button');
    expect(previousButton.hasAttribute('disabled')).toBeTrue();
  });

  it('deve desativar o próximo botão quando estiver na última página', () => {
    component.currentPage = 10;
    component.totalPages = 10;
    fixture.detectChanges();
    const nextButton = fixture.nativeElement.querySelector('.next-button');
    expect(nextButton.hasAttribute('disabled')).toBeTrue();
  });
});
