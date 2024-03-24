import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { APIService } from './shared/services/api.service';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MovieListComponent } from './layout/movie-list/movie-list.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    HeaderComponent,
    MovieListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    CommonModule
  ],
  exports: [MovieCardComponent],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
