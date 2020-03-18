import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { ChangeCarDetailsFormComponent } from './change-car-details-form.component';
import { UserRequestNavigationService } from './../../../core/user-request/facade';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import createSpy = jasmine.createSpy;

const requestId = 'request1';

const changeRequest = {
  requestId: requestId,
};

class MockChangeRequestService {
  getChangeRequest() {
    return of(changeRequest);
  }
}

const configurationSteps = [
  {
    code: 'step1',
  },
];

class MockUserRequestNavigationService {
  continue = createSpy();

  getConfigurationSteps() {
    return configurationSteps;
  }

  getActiveStep() {}
}

const mockChangeCarDetailsForm: any = {
  effectiveDate: '10/10/2020',
  vehicleAnnualMileage: '10000',
};

describe('ChangeCarDetailsFormComponent', () => {
  let controls;
  let component: ChangeCarDetailsFormComponent;
  let fixture: ComponentFixture<ChangeCarDetailsFormComponent>;
  let mockChangeRequestService: MockChangeRequestService;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
        {
          provide: UserRequestNavigationService,
          useClass: MockUserRequestNavigationService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            routeConfig: {
              path: 'testPath',
            },
          },
        },
      ],
      declarations: [ChangeCarDetailsFormComponent],
    }).compileComponents();

    mockChangeRequestService = TestBed.get(ChangeRequestService as Type<ChangeRequestService>);
    mockUserRequestNavigationService = TestBed.get(UserRequestNavigationService as Type<UserRequestNavigationService>);

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

  it('should redirect if policy is simulated', () => {
    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(of({
      requestId: 'requestId',
      changedPolicy: {
        policyId: 'policyId'
      }
    }));
    component.ngOnInit();
    expect(mockUserRequestNavigationService.continue).toHaveBeenCalled();
  });

  it('form invalid when not all required fields filled', () => {
    const form = mockChangeCarDetailsForm;
    component.ngOnInit();

    controls['effectiveDate'].setValue(form.effectiveDate);
    controls['vehicleAnnualMileage'].setValue('');

    expect(component.changeCarDetailsForm.valid).toBeFalsy();
  });
});
