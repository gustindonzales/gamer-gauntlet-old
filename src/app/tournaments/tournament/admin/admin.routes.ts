import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ownedByGuard } from '../guards/owned-by.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [ownedByGuard],
  },
];
