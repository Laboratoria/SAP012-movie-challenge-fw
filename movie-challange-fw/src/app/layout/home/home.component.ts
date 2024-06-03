import { Component, OnInit } from '@angular/core';

import { Movie } from 'src/models/Movie';
import { APIService } from 'src/app/shared/services/API/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieList: any[] = [];

  isLoading: boolean = true;
  constructor (private apiService: APIService) {}

  ngOnInit(): void {
    this.listar();
}
listar(): void {
  this.apiService.getMovies().subscribe(
    (data: Movie[]) => {
      console.log('Dados recebidos da API:', data);
      this.movieList = data;
    },
    (error) => {
      console.error('Erro ao buscar filmes:', error);
    }
  );
}
}

