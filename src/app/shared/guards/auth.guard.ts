import { CanActivateFn } from '@angular/router';
import { ConvexService } from '../services/convex.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (_route, _state) => {
  const convexService: ConvexService = inject(ConvexService);
  return convexService.user$.pipe(
    take(1),
    map((user) => !!user),
  );
};
