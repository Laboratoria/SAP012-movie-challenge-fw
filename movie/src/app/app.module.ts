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
import { HomeComponent } from './layout/home/home.component';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { FooterComponent } from './layout/footer/footer.component';
import { PaginationComponent } from './layout/pagination/pagination.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListOptionsComponent } from './layout/list-options/list-options.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    HeaderComponent,
    MovieListComponent,
    HomeComponent,
    FooterComponent,
    PaginationComponent,
    ListOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    FormsModule
  ],
  exports: [MovieCardComponent],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
