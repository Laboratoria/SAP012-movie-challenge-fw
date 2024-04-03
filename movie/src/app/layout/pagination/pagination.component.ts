import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() onSelectPage: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generatePages();
  }

  generatePages(): void {
    this.pages = [];
    for (let i = this.currentPage; i <= Math.min(this.currentPage + 5, this.totalPages); i++) {
      this.pages.push(i);
    }
  }

  selectPage(page: number): void {
    if (this.totalPages) {
      this.onSelectPage.emit(page);
    }
}
}
