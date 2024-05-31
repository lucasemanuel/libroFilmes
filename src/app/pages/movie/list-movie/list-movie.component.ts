import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TmdbService } from '../../../services/tmdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-movie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './list-movie.component.html',
  styleUrl: './list-movie.component.sass'
})
export class ListMovieComponent implements OnInit {
  movies$ = this.tmdbService.movies$;
  loading = false;

  constructor(
    private tmdbService: TmdbService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loadMoreMovies();
  }

  public getUrlMovieImage(url: string) {
    return this.tmdbService.getUrlImage(url);
  }

  public loadMoreMovies() {
    if (this.loading) {
      return
    }
    this.loading = true

    setTimeout(() => this.tmdbService.getMovies().subscribe({
      complete: () => this.loading = false
    }), 500)
  }

  redirectFromDetails(id: any) {
    this.router.navigate([`movie/${id}`]);
  }
}

