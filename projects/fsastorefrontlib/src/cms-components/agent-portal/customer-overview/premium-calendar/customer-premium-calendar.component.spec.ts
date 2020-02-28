import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPremiumCalendarComponent } from './customer-premium-calendar.component';

describe('CustomerPremiumCalendarComponent', () => {
  let component: CustomerPremiumCalendarComponent;
  let fixture: ComponentFixture<CustomerPremiumCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPremiumCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPremiumCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
