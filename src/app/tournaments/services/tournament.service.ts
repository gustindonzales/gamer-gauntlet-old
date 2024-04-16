import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../convex/_generated/api.js';
import { Doc } from '../../../../convex/_generated/dataModel';
import { ConvexService } from '../../services/shared/convex.service';

export interface TournamentPost {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  stateId: string;
  zip: string;
  avgPowerBillCost: number;
  roofTypeId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  convexService: ConvexService = inject(ConvexService);
  constructor() {}

  getTournamentTypes(
    listen: boolean = false,
  ): Observable<Doc<'tournamentTypes'>[]> {
    return this.convexService.get(api['tournamentTypes'].get, {}, listen);
  }

  getGames(listen: boolean = false): Observable<Doc<'games'>[]> {
    return this.convexService.get(api['games'].get, {}, listen);
  }

  getPlatforms(listen: boolean = false): Observable<Doc<'platforms'>[]> {
    return this.convexService.get(api['platforms'].get, {}, listen);
  }

  getPlatformsByGameId(
    gameId: string,
    listen: boolean = false,
  ): Observable<Doc<'platforms'>[]> {
    return this.convexService.get(
      api['platforms'].getPlatformsByGameId,
      { gameId },
      listen,
    );
  }

  createTournament(
    tournament: Doc<'tournaments'>,
  ): Observable<Doc<'tournaments'>> {
    return this.convexService.insert(api['tournaments'].create, tournament);
  }
}
