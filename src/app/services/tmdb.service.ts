import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiUrl = `${environment.tmdbApiUrl}`;
  private moviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  private nextPage = 1;
  public readonly movies$: Observable<Movie[]> = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie?page=${this.nextPage}&language=pt-BR&api_key=${environment.tmdbApiKey}`)
      .pipe(
        tap(movies => this.setMovies(movies?.results.map((movie: any) => this.mapToMovie(movie)))),
        tap(() => this.nextPage++)
      );
  }

  public getUrlImage(url: string, size: 'w1280' | 'w500' = 'w500') {
    return `${environment.tmdbImage}/t/p/${size}/${url}`;
  }

  public getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}?language=pt-BR&api_key=${environment.tmdbApiKey}`);
  }

  private setMovies(movies: Movie[]): void {
    this.moviesSubject.next([...this.moviesSubject.value, ...movies]);
  }

  public mapToMovie(obj: any): Movie {
    return {
      id: obj.id,
      title: obj.title,
      releaseDate: new Date(obj.release_date),
      posterPath: obj.poster_path,
      overview: obj.overview
    };
  }
}
