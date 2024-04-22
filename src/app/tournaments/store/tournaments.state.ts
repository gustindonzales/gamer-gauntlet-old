import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, switchMap, take, tap, throwError } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';

import { Tournament } from '../../../../convex/tournaments';
import { SelectOption } from '../../components/form';
import { TournamentService } from '../services/tournament.service';
import {
  Games,
  Platforms,
  TournamentFormats,
  TournamentStages,
  TournamentTypes,
  Tournaments,
} from './tournaments.actions';

export interface TournamentsStateModel {
  newTournamentForm: {
    model: any;
    dirty: boolean;
    status: string;
    errors: any;
  };
  tournamentTypes: Doc<'tournamentTypes'>[] | null;
  tournamentFormats: Doc<'tournamentFormats'>[] | null;
  tournamentStages: Doc<'tournamentStages'>[] | null;
  games: Doc<'games'>[] | null;
  platforms: Doc<'platforms'>[] | null;
  selectedTournament: Tournament | null;
}

@State<TournamentsStateModel>({
  name: 'tournaments',
  defaults: {
    newTournamentForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {},
    },
    tournamentTypes: null,
    tournamentFormats: null,
    tournamentStages: null,
    games: null,
    platforms: null,
    selectedTournament: null,
  },
})
@Injectable()
export class TournamentsState {
  protected tournamentService: TournamentService = inject(TournamentService);

  // Selectors
  @Selector()
  static getTournamentTypes(state: TournamentsStateModel) {
    return state.tournamentTypes;
  }

  @Selector()
  static getTournamentTypeOptions(state: TournamentsStateModel) {
    return state.tournamentTypes?.map(
      (type) => <SelectOption>{ value: type._id, label: type.name },
    );
  }

  static getTournamentFormats(state: TournamentsStateModel) {
    return state.tournamentFormats;
  }

  @Selector()
  static getTournamentFormatOptions(state: TournamentsStateModel) {
    return state.tournamentFormats?.map(
      (type) => <SelectOption>{ value: type._id, label: type.name },
    );
  }

  @Selector()
  static getSelectedTournament(state: TournamentsStateModel) {
    return state.selectedTournament;
  }

  @Selector()
  static getGameOptions(state: TournamentsStateModel) {
    return state.games?.map(
      (game) => <SelectOption>{ value: game._id, label: game.name },
    );
  }

  @Selector()
  static getGames(state: TournamentsStateModel) {
    return state.games;
  }

  @Selector()
  static getPlatformOptions(state: TournamentsStateModel) {
    return state.platforms?.map(
      (platform) => <SelectOption>{ value: platform._id, label: platform.name },
    );
  }

  @Selector()
  static getPlatforms(state: TournamentsStateModel) {
    return state.platforms;
  }

  // Actions
  @Action(TournamentTypes.Get)
  getTournamentTypes(
    { patchState }: StateContext<TournamentsStateModel>,
    { listen }: TournamentTypes.Get,
  ) {
    return this.tournamentService.getTournamentTypes(listen).pipe(
      tap((result: Doc<'tournamentTypes'>[] | null) => {
        patchState({
          tournamentTypes: result,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(TournamentFormats.Get)
  getTournamentFormats(
    { patchState }: StateContext<TournamentsStateModel>,
    { listen }: TournamentFormats.Get,
  ) {
    return this.tournamentService.getTournamentFormats(listen).pipe(
      tap((result: Doc<'tournamentFormats'>[] | null) => {
        patchState({
          tournamentFormats: result,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(TournamentStages.Get)
  getTournamentStages(
    { patchState }: StateContext<TournamentsStateModel>,
    { listen }: TournamentStages.Get,
  ) {
    return this.tournamentService.getTournamentStages(listen).pipe(
      tap((result: Doc<'tournamentStages'>[] | null) => {
        patchState({
          tournamentStages: result,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(Games.Get)
  getGames(
    { patchState }: StateContext<TournamentsStateModel>,
    { listen }: Games.Get,
  ) {
    return this.tournamentService.getGames(listen).pipe(
      tap((result: Doc<'games'>[] | null) => {
        patchState({
          games: result,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(Platforms.Get)
  getPlatforms(
    { patchState }: StateContext<TournamentsStateModel>,
    { listen }: Platforms.Get,
  ) {
    return this.tournamentService.getPlatforms(listen).pipe(
      tap((result: Doc<'platforms'>[] | null) => {
        patchState({
          platforms: result,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(Tournaments.Create)
  createTournament(
    { dispatch }: StateContext<TournamentsStateModel>,
    { tournament }: Tournaments.Create,
  ) {
    return this.tournamentService.createTournament(tournament).pipe(
      take(1),
      switchMap((tournamentId) =>
        dispatch(new Tournaments.CreateSuccess(tournamentId)),
      ),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(Tournaments.CreateSuccess)
  createTournamentSuccess(
    { patchState }: StateContext<TournamentsStateModel>,
    { tournamentId }: Tournaments.CreateSuccess,
  ) {
    return this.tournamentService.getTournament(tournamentId, false).pipe(
      take(1),
      tap((selectedTournament) => {
        patchState({
          selectedTournament,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(Tournaments.Get)
  getTournament(
    { patchState }: StateContext<TournamentsStateModel>,
    { tournamentId, listen }: Tournaments.Get,
  ) {
    return this.tournamentService.getTournament(tournamentId, listen).pipe(
      take(1),
      tap((selectedTournament) => {
        patchState({ selectedTournament });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(Tournaments.Startup)
  startup(
    { patchState }: StateContext<TournamentsStateModel>,
    { listen }: Tournaments.Startup,
  ) {
    return this.tournamentService.getAppDependencies(listen).pipe(
      take(1),
      tap((deps) => {
        const [
          tournamentTypes,
          tournamentFormats,
          tournamentStages,
          games,
          platforms,
        ] = deps;
        patchState({
          tournamentTypes,
          tournamentFormats,
          tournamentStages,
          games,
          platforms,
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }
}
