import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { MovieListComponent } from './layout/movie-list/movie-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
