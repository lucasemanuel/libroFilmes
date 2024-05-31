import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/movie/movie-routing.module').then((m) => m.MovieRoutingModule),
  },
];
