import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit{
  @Input()
  movies: Movie[] = [];
  moviesLoaded: boolean = false;

  constructor() {
    this.movies = [];
   }

  ngOnInit(): void {  }
}
