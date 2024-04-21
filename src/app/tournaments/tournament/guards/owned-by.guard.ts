import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { combineLatest, filter, map, tap } from 'rxjs';
import { ConvexService } from '../../../shared/services/convex.service';
import { TournamentsFacadeService } from '../../store/tournaments.facade.service';

export const ownedByGuard: CanActivateChildFn = (_route, state) => {
  const convexService: ConvexService = inject(ConvexService);
  const tournamentsFacadeService: TournamentsFacadeService = inject(
    TournamentsFacadeService,
  );
  const router: Router = inject(Router);
  const tournamentId = state.url.split('/')[2];

  return combineLatest([
    tournamentsFacadeService.selectedTournament$,
    convexService.user$,
  ]).pipe(
    filter(([selectedTournament]) => selectedTournament !== null),
    map(([selectedTournament, user]) => {
      if (!selectedTournament) {
        return false;
      }
      const { owner } = selectedTournament;
      if (!user) {
        return false;
      }
      return owner._id === user._id;
    }),
    tap((isOwner) => {
      if (!isOwner) {
        router.navigate(['/tournaments', tournamentId, 'view']);
      }
    }),
  );
};
