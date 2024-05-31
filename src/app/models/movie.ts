export interface Movie {
  id: number,
  title: string,
  releaseDate: Date,
  posterPath: string,
  backdropPath?: string,
  overview: string,
  genres?: string[],
}
