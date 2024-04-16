import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, take, tap, throwError } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';

import { SelectOption } from '../../components/form';
import { TournamentService } from '../services/tournament.service';
import {
  Games,
  Platforms,
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
  games: Doc<'games'>[] | null;
  platforms: Doc<'platforms'>[] | null;
  selectedTournament: Doc<'tournaments'> | null;
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
      tap((result: Doc<'tournamentTypes'>[]) => {
        patchState({
          tournamentTypes: result,
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
      tap((result: Doc<'games'>[]) => {
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
      tap((result: Doc<'platforms'>[]) => {
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
      tap((tournament: Doc<'tournaments'>) => {
        dispatch(new Tournaments.CreateSuccess(tournament));
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      }),
    );
  }

  @Action(Tournaments.CreateSuccess)
  createTournamentSuccess(
    { patchState }: StateContext<TournamentsStateModel>,
    { tournament }: Tournaments.CreateSuccess,
  ) {
    patchState({
      selectedTournament: tournament,
    });
  }
}
