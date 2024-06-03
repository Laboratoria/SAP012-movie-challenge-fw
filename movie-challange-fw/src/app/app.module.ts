import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from './shared/services/API/api.service';
import { HomeComponent } from './layout/home/home.component';
import { MovieListComponent } from './layout/movie-list/movie-list.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    HomeComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [APIService],    //  fica todos os serviços
  bootstrap: [AppComponent]   // Instancia do AppComponente (componente principal) container do projeto
})
export class AppModule { }
