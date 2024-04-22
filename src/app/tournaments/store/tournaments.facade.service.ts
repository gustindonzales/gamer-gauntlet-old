import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, map, take, withLatestFrom } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';
import { SelectOption } from '../../components/form';
import { CreateTournamentRequest } from '../models';
import {
  Games,
  Platforms,
  TournamentFormats,
  TournamentStages,
  TournamentTypes,
  Tournaments,
} from './tournaments.actions';
import { TournamentsState } from './tournaments.state';

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
  startup(listen: boolean = false) {
    this.store.dispatch(new Tournaments.Startup(listen));
  }

  getTournamentTypes(listen: boolean = false) {
    this.store.dispatch(new TournamentTypes.Get(listen));
  }

  getTournamentFormats(listen: boolean = false) {
    this.store.dispatch(new TournamentFormats.Get(listen));
  }

  getTournamentStages(listen: boolean = false) {
    this.store.dispatch(new TournamentStages.Get(listen));
  }

  getSelectedTournament(tournamentId: string, listen: boolean = false) {
    return this.store
      .dispatch(new Tournaments.Get(tournamentId, listen))
      .pipe(withLatestFrom(this.selectedTournament$));
  }

  getGames(listen: boolean = false) {
    this.store.dispatch(new Games.Get(listen));
  }

  getPlatforms(listen: boolean = false) {
    this.store.dispatch(new Platforms.Get(listen));
  }

  createTournament(tournament: CreateTournamentRequest) {
    return this.store.dispatch(new Tournaments.Create(tournament)).pipe(
      take(1),
      withLatestFrom(this.selectedTournament$),
      map(([, tournament]) => tournament),
    );
  }
}
