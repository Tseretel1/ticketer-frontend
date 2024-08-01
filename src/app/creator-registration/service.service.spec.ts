import { TestBed } from '@angular/core/testing';

import { CreatorService } from './service.service';

describe('ServiceService', () => {
  let service: CreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
