import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent {
  @Input() options: { value: string; label: string }[] = [];
  @Input() selectedOption: { value: string; label: string } | null = null;

  @Output() onChange: EventEmitter<{ value: string; label: string }> = new EventEmitter();
  @Output() onClear: EventEmitter<void> = new EventEmitter();

  constructor() { }

  selectOption(value: string): void {
    const option = this.options.find(o => o.value === value);
    if (option) {
      this.selectedOption = option;
      this.onChange.emit(option);
    }
  }

  clearSelection(): void {
    this.selectedOption = null;
    this.onClear.emit();
  }
}
