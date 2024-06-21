//Importações necessárias para o módulo principal do Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/services/API/api.service';
import { HomeComponent } from './layout/home/home.component';
// import { MovieListComponent } from './layout/movie-list/movie-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { ListOptionsComponent } from './layout/list-options/list-options.component';
import { MovieDetailComponent } from './layout/movie-detail/movie-detail.component';
import { FooterComponent } from './layout/footer/footer.component';

//Declaração do módulo principal do Angular
@NgModule({
  declarations: [
    AppComponent,   //Componente principal
    MovieCardComponent, //Componente para exibir card de filmes
    HomeComponent,  //Componente home
    // MovieListComponent, // Componente para exibir lista de filmes
    HeaderComponent, 
    ListOptionsComponent,
    MovieDetailComponent,
    FooterComponent 
  ],
  imports: [
    BrowserModule,  // Módulo para navegação do browser
    AppRoutingModule, // Módulo de roteamento
    HttpClientModule, // Módulo para fazer requisições HTTP
    CommonModule
  ],
  providers: [ApiService],    //  fica todos os serviços
  bootstrap: [AppComponent]   // Instancia do AppComponente (componente principal) container do projeto
})
export class AppModule { }
