import { TestBed } from '@angular/core/testing';

import { CreatorRegisterService } from './creator-register.service';

describe('CreatorRegisterService', () => {
  let service: CreatorRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatorRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
