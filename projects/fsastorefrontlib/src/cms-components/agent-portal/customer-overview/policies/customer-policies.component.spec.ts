import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPoliciesComponent } from './customer-policies.component';

describe('CustomerPoliciesComponent', () => {
  let component: CustomerPoliciesComponent;
  let fixture: ComponentFixture<CustomerPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
