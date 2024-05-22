import { Component, Input } from '@angular/core';
import { Movie } from 'src/models/Movie.d'; // Importa o tipo Movie do arquivo Movie.d.ts

@Component({
  selector: 'app-movie-card', // Define o seletor do componente
  templateUrl: './movie-card.component.html', // Define o template HTML do componente
  styleUrls: ['./movie-card.component.css'] // Define os estilos CSS do componente
})
export class MovieCardComponent {
  @Input() movie: Movie | undefined; 
  constructor() { } // Construtor vazio do componente
}


// Importa os módulos necessários do Angular
// Importa o tipo Movie do arquivo Movie.d.ts conforme a estrutura do projeto
// Define o componente Angular com seletor, template HTML e estilos CSS
// Classe do componente com propriedade de entrada 'movie' inicializada com objeto Movie vazio
// Construtor vazio do componente