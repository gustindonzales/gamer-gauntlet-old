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
          import('./welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'tournaments',
        loadChildren: () =>
          import('./tournaments/tournaments.module').then(
            (m) => m.TournamentsModule,
          ),
      },
    ],
  },

  // {
  //     path: 'login',
  //     loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  // },
  // {
  //     path: 'profile',
  //     loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  // },
  // {
  //     path: 'register',
  //     loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  // }
];
