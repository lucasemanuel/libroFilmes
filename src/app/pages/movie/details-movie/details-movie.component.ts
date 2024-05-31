import { Component } from '@angular/core';
import { TmdbService } from '../../../services/tmdb.service';
import { Movie } from '../../../models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-movie.component.html',
  styleUrl: './details-movie.component.sass'
})
export class DetailsMovieComponent {
  movie: Movie;
  loading = false;

  constructor(
    private tmdbService: TmdbService,
    private activatedRoute: ActivatedRoute
  ) {
    const { id } = this.activatedRoute.snapshot.params;
    this.movie = {
      title: "",
      releaseDate: new Date(),
      posterPath: "",
      overview: "",
      id,
      backdropPath: ""
    };
  }

  ngOnInit() {
    this.loadMovie();
  }

  public getUrlMovieImage(url: any) {
    return this.tmdbService.getUrlImage(url, 'w1280');
  }

  public loadMovie() {
    if (this.loading) {
      return
    }
    this.loading = true

    setTimeout(() => this.tmdbService.getMovieDetails(this.movie.id).subscribe({
      next: (movie: any) => {
        this.movie = {
          ...this.tmdbService.mapToMovie(movie),
          genres: movie?.genres?.map(({ name }: any) => name),
          backdropPath: movie?.backdrop_path
        };
        this.loading = false;
      }
    }), 500)
  }
}
