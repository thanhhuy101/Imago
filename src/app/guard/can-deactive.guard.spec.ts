import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canDeactiveGuard } from './can-deactive.guard';

describe('canDeactiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canDeactiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
