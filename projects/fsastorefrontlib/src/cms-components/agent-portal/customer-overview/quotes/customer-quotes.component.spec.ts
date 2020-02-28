import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQuotesComponent } from './customer-quotes.component';

describe('CustomerQuotesComponent', () => {
  let component: CustomerQuotesComponent;
  let fixture: ComponentFixture<CustomerQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
