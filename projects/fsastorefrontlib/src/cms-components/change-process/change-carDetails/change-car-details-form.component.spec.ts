import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { ChangeCarDetailsFormComponent } from './change-car-details-form.component';

class MockChangeRequestService {}

const mockChangeCarDetailsForm: any = {
  effectiveDate: '10/10/2020',
  mileage: '10000',
};

describe('ChangeCarDetailsFormComponent', () => {
  let controls;
  let component: ChangeCarDetailsFormComponent;
  let fixture: ComponentFixture<ChangeCarDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
      ],
      declarations: [ChangeCarDetailsFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    controls = component.changeCarDetailsForm.controls;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when not all required fields filled', () => {
    const form = mockChangeCarDetailsForm;
    component.ngOnInit();

    controls['effectiveDate'].setValue(form.effectiveDate);
    controls['mileage'].setValue('');

    expect(component.changeCarDetailsForm.valid).toBeFalsy();
  });
});
