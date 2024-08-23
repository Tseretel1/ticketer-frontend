import { TestBed } from '@angular/core/testing';

import { FullTicketService } from './full-ticket.service';

describe('FullTicketService', () => {
  let service: FullTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
