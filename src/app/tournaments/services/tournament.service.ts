import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../../../convex/_generated/api.js';
import { Doc } from '../../../../convex/_generated/dataModel';
import { ConvexService } from '../../shared/services/convex.service.js';
import { CreateTournamentRequest } from '../models/tournament.js';
import { Tournament } from '../../../../convex/tournaments.js';

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
  ): Observable<Doc<'tournamentTypes'>[] | null> {
    return this.convexService.get(api['tournamentTypes'].get, {}, listen);
  }

  getTournamentFormats(
    listen: boolean = false,
  ): Observable<Doc<'tournamentFormats'>[] | null> {
    return this.convexService.get(api['tournamentFormats'].get, {}, listen);
  }

  getGames(listen: boolean = false): Observable<Doc<'games'>[]> {
    return this.convexService.get(api['games'].get, {}, listen);
  }

  getPlatforms(listen: boolean = false): Observable<Doc<'platforms'>[]> {
    return this.convexService.get(api['platforms'].get, {}, listen);
  }

  getTournament(
    tournamentId: string,
    listen: boolean = false,
  ): Observable<Tournament> {
    return this.convexService.get(
      api['tournaments'].getById,
      { tournamentId },
      listen,
    );
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

  createTournament(tournament: CreateTournamentRequest): Observable<string> {
    return this.convexService.insert(api['tournaments'].create, tournament);
  }
}
