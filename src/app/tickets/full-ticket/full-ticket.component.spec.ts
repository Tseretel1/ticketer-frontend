import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTicketComponent } from './full-ticket.component';

describe('FullTicketComponent', () => {
  let component: FullTicketComponent;
  let fixture: ComponentFixture<FullTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
