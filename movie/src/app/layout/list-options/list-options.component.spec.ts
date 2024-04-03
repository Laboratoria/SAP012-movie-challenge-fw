import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOptionsComponent } from './list-options.component';
import { FormsModule } from '@angular/forms';

describe('ListOptionsComponent', () => {
  let component: ListOptionsComponent;
  let fixture: ComponentFixture<ListOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ ListOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir onChange quando uma opção é selecionada', () => {
    spyOn(component.onChange, 'emit');
    component.options = [
      { value: 'testValue', label: 'Test Label' }
    ];
    component.selectOption('testValue');
    expect(component.onChange.emit).toHaveBeenCalledWith({ value: 'testValue', label: 'Test Label' });
  });

  it('deve emitir onClear quando a seleção for desmarcada', () => {
    spyOn(component.onClear, 'emit');
    component.clearSelection();
    expect(component.onClear.emit).toHaveBeenCalled();
  });
});
