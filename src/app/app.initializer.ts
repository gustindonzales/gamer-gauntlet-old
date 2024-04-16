import { Observable, combineLatest, of } from 'rxjs';
import { ConvexService } from './services/shared/convex.service';
import { TournamentsFacadeService } from './tournaments/store/tournaments.facade.service';

export function initializeAppFactory(
  convexService: ConvexService,
  tournamentsFacadeService: TournamentsFacadeService,
): () => Observable<[void, void, void, void]> {
  return () =>
    combineLatest([
      convexService.initClerk(),
      of(tournamentsFacadeService.getTournamentTypes(false)),
      of(tournamentsFacadeService.getGames(false)),
      of(tournamentsFacadeService.getPlatforms(false)),
    ]);
}
