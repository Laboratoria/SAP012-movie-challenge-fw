import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent implements OnInit, OnDestroy {
  @Input() options: string[] = [];
  @Input() selectedOption: string = '0';

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClear: Observable<string> = new Observable<string>();

  constructor() {}
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    
  }
}
//formulario de lista de opcoes com filtros