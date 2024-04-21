import { Routes } from '@angular/router';
import { TournamentComponent } from './tournament.component';
import { tournamentGuard } from './guards/tournament.guard';
import { ownedByGuard } from './guards/owned-by.guard';

export const routes: Routes = [
  {
    path: '',
    component: TournamentComponent,
    canActivate: [tournamentGuard],
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        canActivateChild: [ownedByGuard],
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.routes),
      },
      {
        path: 'view',
        loadChildren: () => import('./view/view.routes').then((m) => m.routes),
      },
    ],
  },
];
