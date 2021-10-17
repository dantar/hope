import { TestBed } from '@angular/core/testing';

import { ChallengeCommonsService } from './challenge-commons.service';

describe('ChallengeCommonsService', () => {
  let service: ChallengeCommonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeCommonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
