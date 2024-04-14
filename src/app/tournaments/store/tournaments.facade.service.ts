import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';
import { SelectOption } from '../../components/form';
import { TournamentsState } from './tournaments.state';
import { GetTournamentTypes } from './tournaments.actions';

@Injectable({
  providedIn: 'root',
})
export class TournamentsFacadeService {
  store: Store = inject(Store);

  // Selectors
  @Select(TournamentsState.getTournamentTypes) tournamentTypes$!: Observable<
    Doc<'tournaments'>[]
  >;
  @Select(TournamentsState.getTournamentTypeOptions)
  tournamentTypeOptions$!: Observable<SelectOption[]>;

  // Dispatchers
  getTournamentTypes(listen: boolean = false) {
    this.store.dispatch(new GetTournamentTypes(listen));
  }

  // createTournament(tournament: Doc<'tournaments'>) {
  //   this.store.dispatch(new CreateTournament(tournament));
  // }

  constructor() {
    this.getTournamentTypes(true);
  }
}
