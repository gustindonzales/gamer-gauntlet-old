import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { TournamentsFacadeService } from '../../store/tournaments.facade.service';

export const tournamentGuard: CanActivateFn = (route, _state) => {
  const tournamentsFacadeService: TournamentsFacadeService = inject(
    TournamentsFacadeService,
  );
  const router: Router = inject(Router);

  return tournamentsFacadeService
    .getSelectedTournament(route.params['id'])
    .pipe(
      take(1),
      map((tournament) => !!tournament),
      tap((tournamentExists) => {
        if (!tournamentExists) {
          router.navigate(['/tournaments/browse']);
        }
      }),
    );
};
