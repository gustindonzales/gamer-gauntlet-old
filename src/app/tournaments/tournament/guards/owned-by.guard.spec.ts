import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ownedByGuard } from './owned-by.guard';

describe('ownedByGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ownedByGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
