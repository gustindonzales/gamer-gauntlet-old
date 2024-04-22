import { Observable, combineLatest, of } from 'rxjs';
import { ConvexService, UserContext } from './shared/services/convex.service';
import { TournamentsFacadeService } from './tournaments/store/tournaments.facade.service';

export function initializeAppFactory(
  convexService: ConvexService,
  tournamentsFacadeService: TournamentsFacadeService,
): () => Observable<[UserContext | null, void]> {
  return () =>
    combineLatest([
      convexService.initClerk(),
      of(tournamentsFacadeService.startup(false)),
    ]);
}
