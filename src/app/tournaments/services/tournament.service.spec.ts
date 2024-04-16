import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { api } from '../../../../convex/_generated/api';
import { Doc } from '../../../../convex/_generated/dataModel';
import { ConvexService } from '../../services/shared/convex.service';
import { TournamentService } from './tournament.service';

describe('TournamentService', () => {
  let service: TournamentService;
  let convexService: ConvexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentService);
    convexService = TestBed.inject(ConvexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTournamentTypes', () => {
    it('should get tournament types', () => {
      const tournamentTypes: Doc<'tournamentTypes'>[] = [
        {
          _id: '12345' as any,
          _creationTime: 12345,
          name: 'Single Elimination',
          description: 'test type',
        },
      ];
      spyOn(convexService, 'get').and.returnValue(of(tournamentTypes));

      service.getTournamentTypes().subscribe((res) => {
        expect(res).toEqual(tournamentTypes);
      });
    });

    it('should get tournament types with listen', () => {
      const tournamentTypes: Doc<'tournamentTypes'>[] = [
        {
          _id: '12345' as any,
          _creationTime: 12345,
          name: 'Single Elimination',
          description: 'test type',
        },
      ];
      spyOn(convexService, 'get').and.returnValue(of(tournamentTypes));

      service.getTournamentTypes(true).subscribe((res) => {
        expect(res).toEqual(tournamentTypes);
      });
      expect(convexService.get).toHaveBeenCalledWith(
        api['tournamentTypes'].get,
        {},
        true,
      );
    });
  });

  // describe('createTournament', () => {
  //   it('should create tournament', () => {
  //     const tournament: Doc<'tournaments'> = {
  //       _id: '12345' as any,
  //       _creationTime: 12345,
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'test@test.com',
  //       phone: '1234567890',
  //       street: '123 Test St',
  //       city: 'Test City',
  //       stateId: '12345' as any,
  //       zip: '12345',
  //       avgMonthlyPowerBill: 100,
  //       roofTypeId: '12345' as any,
  //     };
  //     spyOn(convexService, 'insert').and.returnValue(of(tournament));
  //     service.createTournament(tournament).subscribe((res) => {
  //       expect(res).toEqual(tournament);
  //     });
  //   });
  // });
});
