import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Genre } from 'src/models/Genre';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent implements OnChanges {
  @Input() options: string[] = [];
  @Input() selectedOption: Genre = {value: "", label: ""};
  optionsObj: Genre[] = [];
  selectedOptionStr: string = "";

  @Output() onChange: EventEmitter<Genre> = new EventEmitter<Genre>();
  @Output() onClear: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.optionsObj = this.options.map(option => JSON.parse(option));
  }

  selectOption(): void {
    this.selectedOption = JSON.parse(this.selectedOptionStr);

    this.onChange.emit(this.selectedOption);
}

  clearSelection(): void {
    this.selectedOptionStr = "";
  }
}
