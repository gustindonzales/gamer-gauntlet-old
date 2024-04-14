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
    return this.convexService.get(api['tournamentTypes'].get, listen);
  }

  // createTournament(tournament: Doc<'tournaments'>): Observable<Doc<'tournaments'>> {
  //   return this.convexService.insert(api['tournaments'].insert, tournament);
  // }
}
