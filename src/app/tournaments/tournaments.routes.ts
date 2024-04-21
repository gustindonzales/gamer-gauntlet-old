import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full',
    // providers: [
    //   NgxsModule.forFeature([TournamentsState]),
    // ],
  },
  {
    path: 'new',
    loadChildren: () => import('./new/new.routes').then((m) => m.routes),
  },
  {
    path: 'browse',
    loadChildren: () => import('./browse/browse.routes').then((m) => m.routes),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./tournament/tournament.routes').then((m) => m.routes),
  },
];
