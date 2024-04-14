import { TestBed } from '@angular/core/testing';

import { ConvexClient } from 'convex/browser';
import { GenericId } from 'convex/values';
import { of } from 'rxjs';
import { Doc } from '../../../../convex/_generated/dataModel';
import { ConvexService } from './convex.service';
import { api } from '../../../../convex/_generated/api';

class TestConvexService extends ConvexService {
  override client = jasmine.createSpyObj('client', ['onUpdate', 'query']);
}

describe('ConvexService', () => {
  let service: TestConvexService;

  const tournamentTypesResponse: Doc<'tournamentTypes'>[] = [
    {
      _creationTime: 123456,
      _id: '123' as GenericId<'tournamentTypes'>,
      name: 'Single Elimination',
      description: 'A single elimination tournament type',
    },
    {
      _creationTime: 123456,
      _id: '321' as GenericId<'tournamentTypes'>,
      name: 'Double Elimination',
      description: 'A double elimination tournament type',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ConvexClient, useClass: TestConvexService }],
    });
    service = TestBed.inject(ConvexService) as TestConvexService;
    service.client = jasmine.createSpyObj('client', ['onUpdate', 'query']);
    service.client.query.and.returnValue(of(tournamentTypesResponse));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call client.onUpdate when listen is true', () => {
    const func = api['tournamentTypes'].get;
    service.get(func, true).subscribe((result) => {
      expect(result).toEqual(tournamentTypesResponse);
    });
    expect(service.client.onUpdate).toHaveBeenCalled();
  });

  it('should call client.query when listen is false', () => {
    const func = api['tournamentTypes'].get;
    service.get(func, false).subscribe((result) => {
      expect(result).toEqual(tournamentTypesResponse);
    });
    expect(service.client.query).toHaveBeenCalled();
  });
});
