import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';

import { SelectOption } from '../../components/form';
import { TournamentService } from '../services/tournament.service';
import { GetTournamentTypes } from './tournaments.actions';

export interface TournamentsStateModel {
  newTournamentForm: {
    model: any;
    dirty: boolean;
    status: string;
    errors: any;
  };
  tournamentTypes: Doc<'tournamentTypes'>[] | null;
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

  // Actions
  @Action(GetTournamentTypes)
  getStates(
    { patchState }: StateContext<TournamentsStateModel>,
    { listen }: GetTournamentTypes,
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

  // @Action(CreateTournament)
  // createTournament(
  //   { patchState, dispatch }: StateContext<TournamentsStateModel>,
  //   { tournament }: CreateTournament,
  // ) {
  //   if (typeof tournament.avgMonthlyPowerBill === 'string') {
  //     tournament.avgMonthlyPowerBill = parseFloat(tournament.avgMonthlyPowerBill);
  //   }
  //   return this.tournamentService.createTournament(tournament).pipe(
  //     take(1),
  //     tap((tournament: Doc<'tournaments'>) => {
  //       patchState({
  //         tournament,
  //       });
  //       dispatch(new CreateTournamentSuccess(tournament));
  //     }),
  //     catchError((err) => {
  //       return throwError(() => new Error(err));
  //     }),
  //   );
  // }

  // @Action(CreateTournamentSuccess)
  // createTournamentSuccess(
  //   { patchState }: StateContext<TournamentsStateModel>,
  //   { tournament }: CreateTournamentSuccess,
  // ) {
  //   patchState({
  //     selectedTournament: tournament,
  //   });
  // }
}
