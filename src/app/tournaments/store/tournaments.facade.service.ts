import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';
import { SelectOption } from '../../components/form';
import {
  Games,
  Platforms,
  TournamentFormats,
  TournamentTypes,
  Tournaments,
} from './tournaments.actions';
import { TournamentsState } from './tournaments.state';
import { CreateTournamentRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TournamentsFacadeService {
  store: Store = inject(Store);

  // Selectors
  @Select(TournamentsState.getTournamentTypes) tournamentTypes$!: Observable<
    Doc<'tournamentTypes'>[]
  >;
  @Select(TournamentsState.getTournamentTypeOptions)
  tournamentTypeOptions$!: Observable<SelectOption[]>;

  @Select(TournamentsState.getTournamentFormats)
  tournamentFormats$!: Observable<Doc<'tournamentFormats'>[]>;
  @Select(TournamentsState.getTournamentFormatOptions)
  tournamentFormatOptions$!: Observable<SelectOption[]>;

  @Select(TournamentsState.getSelectedTournament)
  selectedTournament$!: Observable<any>; // Observable<Doc<'tournaments'>>;

  @Select(TournamentsState.getGames) games$!: Observable<Doc<'games'>[]>;
  @Select(TournamentsState.getGameOptions)
  gameOptions$!: Observable<SelectOption[]>;

  @Select(TournamentsState.getPlatforms) platforms$!: Observable<
    Doc<'platforms'>[]
  >;
  @Select(TournamentsState.getPlatformOptions)
  platformOptions$!: Observable<SelectOption[]>;

  // Dispatchers
  getTournamentTypes(listen: boolean = false) {
    this.store.dispatch(new TournamentTypes.Get(listen));
  }

  getTournamentFormats(listen: boolean = false) {
    this.store.dispatch(new TournamentFormats.Get(listen));
  }

  getSelectedTournament(tournamentId: string, listen: boolean = false) {
    this.store.dispatch(new Tournaments.Get(tournamentId, listen));
  }

  getGames(listen: boolean = false) {
    this.store.dispatch(new Games.Get(listen));
  }

  getPlatforms(listen: boolean = false) {
    this.store.dispatch(new Platforms.Get(listen));
  }

  createTournament(tournament: CreateTournamentRequest) {
    this.store.dispatch(new Tournaments.Create(tournament));
  }
}
