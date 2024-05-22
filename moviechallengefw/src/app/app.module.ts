import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { MovieListComponent } from './layout/movie-list/movie-list.component';
import { HomeComponent } from './layout/home/home.component';
import { TheMovieDbService } from './shared/services/the-movie-db/the-movie-db.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [   //Os componentes
    AppComponent,
    MovieCardComponent,
    MovieListComponent,
    HomeComponent
  ],
  imports: [   //Modulos da aplicaação
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TheMovieDbService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
