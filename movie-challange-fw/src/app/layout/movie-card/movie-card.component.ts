// Componente que exibe a lista de filmes
import { Component, OnInit } from '@angular/core';

import { APIService } from './../../shared/services/API/api.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  movie: Movie[] = [];  // Array de filmes para exibição

  constructor(private apiService: APIService) {} 
  ngOnInit(): void {

  }
    };



//o this é o metodso pa