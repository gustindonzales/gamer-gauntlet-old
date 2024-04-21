import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tournamentGuard } from './tournament.guard';

describe('tournamentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tournamentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
