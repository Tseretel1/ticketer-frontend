import { TestBed } from '@angular/core/testing';

import { CreateTicketService } from './ticket-managment.service';

describe('CreateTicketService', () => {
  let service: CreateTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
