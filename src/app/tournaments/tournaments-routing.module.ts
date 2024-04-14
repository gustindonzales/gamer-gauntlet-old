import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.module').then((m) => m.NewModule),
  },
  {
    path: 'browse',
    loadChildren: () =>
      import('./browse/browse.module').then((m) => m.BrowseModule),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./tournament/tournament.module').then((m) => m.TournamentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsRoutingModule {}
