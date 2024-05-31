import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMovieComponent } from './list-movie/list-movie.component';
import { DetailsMovieComponent } from './details-movie/details-movie.component';

const routes: Routes = [
  { path: '', component: ListMovieComponent },
  { path: 'movie/:id',  component: DetailsMovieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
