import { TestBed } from '@angular/core/testing';

import { DiceCommonsService } from './dice-commons.service';

describe('DiceCommonsService', () => {
  let service: DiceCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceCommonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
