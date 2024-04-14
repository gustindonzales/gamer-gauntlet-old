import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { TournamentsFacadeService } from './tournaments.facade.service';
import { TournamentsState } from './tournaments.state';
import { GetTournamentTypes } from './tournaments.actions';

describe('TournamentsFacadeService', () => {
  let service: TournamentsFacadeService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TournamentsState])],
    });
    service = TestBed.inject(TournamentsFacadeService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch GetTournamentTypes action', () => {
    spyOn(store, 'dispatch');
    service.getTournamentTypes();
    expect(store.dispatch).toHaveBeenCalledWith(new GetTournamentTypes(false));
  });

  // it('should dispatch CreateTournament action', () => {
  //   const tournament = {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'test@test.com',
  //     phone: '1234567890',
  //     street: '123 Main St',
  //     city: 'Springfield',
  //     stateId: '12345',
  //     zip: '12345',
  //     avgPowerBillCost: 100,
  //     roofTypeId: '12345',
  //   };
  //   spyOn(store, 'dispatch');
  //   service.createQuote(tournament as any);
  //   expect(store.dispatch).toHaveBeenCalledWith(new CreateTournament(tournament as any));
  // });
});
