import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeCarDetailsComponent } from './change-carDetails.component';

class MockChangeRequestService {}

const mockChangeCarDetailsForm: any = {
  effectiveDate: '10/10/2020',
  mileage: '10000',
};

describe('ChangeCarDetailsComponent', () => {
  let controls;
  let component: ChangeCarDetailsComponent;
  let fixture: ComponentFixture<ChangeCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
      ],
      declarations: [ChangeCarDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarDetailsComponent);
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
