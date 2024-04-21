import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import('./welcome/welcome.routes').then((m) => m.routes),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((m) => m.routes),
      },
      {
        path: 'tournaments',
        loadChildren: () =>
          import('./tournaments/tournaments.routes').then((m) => m.routes),
      },
    ],
  },

  // {
  //     path: 'login',
  //     loadChildren: () => import('./login/login.routes').then(m => m.routes)
  // },
  // {
  //     path: 'profile',
  //     loadChildren: () => import('./profile/profile.routes').then(m => m.routes)
  // },
  // {
  //     path: 'register',
  //     loadChildren: () => import('./register/register.routes').then(m => m.routes)
  // }
];
