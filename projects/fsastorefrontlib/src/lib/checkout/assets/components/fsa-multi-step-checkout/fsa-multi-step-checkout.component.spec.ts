import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsaMultiStepCheckoutComponent } from './fsa-multi-step-checkout.component';

describe('FsaMultiStepCheckoutComponent', () => {
  let component: FsaMultiStepCheckoutComponent;
  let fixture: ComponentFixture<FsaMultiStepCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsaMultiStepCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsaMultiStepCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
