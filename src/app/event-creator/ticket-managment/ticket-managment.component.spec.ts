import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ticketmanagmentComponent } from './ticket-managment.component';

describe('CreateTicketComponent', () => {
  let component: ticketmanagmentComponent;
  let fixture: ComponentFixture<ticketmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ticketmanagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ticketmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
