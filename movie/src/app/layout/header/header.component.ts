import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  movies: Movie[] = [];
  moviesLoaded: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
