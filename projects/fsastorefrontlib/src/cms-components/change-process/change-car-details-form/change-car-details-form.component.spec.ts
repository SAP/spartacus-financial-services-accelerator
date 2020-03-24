import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from './../../../core/user-request/facade';
import { ChangeCarDetailsFormComponent } from './change-car-details-form.component';
import createSpy = jasmine.createSpy;

const requestId = 'request1';
const policyId = 'policy1';

const changeRequest = {
  requestId: requestId,
};

class MockChangeRequestService {
  simulateChangeRequest = createSpy();

  getSimulateChangeRequestError() {
    return of();
  }
  getChangeRequest() {
    return of(changeRequest);
  }

  getAction() {
    return of({
      requestStatus: 'OPEN',
      fsStepGroupDefinition: 'test',
    });
  }
}

const configurationSteps = [
  {
    code: 'step1',
  },
];

class MockRoutingService {
  go = createSpy();
}

class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

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
  let mockRoutingService: MockRoutingService;
  let globalMessageService: GlobalMessageService;

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
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: GlobalMessageServiceMock,
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

    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
    mockChangeRequestService = TestBed.get(ChangeRequestService as Type<
      ChangeRequestService
    >);
    globalMessageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
    mockUserRequestNavigationService = TestBed.get(
      UserRequestNavigationService as Type<UserRequestNavigationService>
    );
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

  it('should execute simulation request', () => {
    controls['effectiveDate'].setValue(mockChangeCarDetailsForm.effectiveDate);
    controls['vehicleAnnualMileage'].setValue(
      mockChangeCarDetailsForm.vehicleAnnualMileage
    );

    component.ngOnInit();

    const changedRequestData = {
      requestId: requestId,
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [
            {
              insuredObjectItems: [
                {
                  label: 'vehicleAnnualMileage',
                  value: '3000',
                },
              ],
            },
          ],
        },
      },
    };
    component.simulateChanges(changedRequestData);
    expect(mockChangeRequestService.simulateChangeRequest).toHaveBeenCalled();
  });

  it('should not execute simulation if form is not populated', () => {
    component.ngOnInit();

    const changedRequestData = {
      requestId: requestId,
    };
    component.simulateChanges(changedRequestData);
    expect(
      mockChangeRequestService.simulateChangeRequest
    ).not.toHaveBeenCalled();
  });

  it('form invalid when not all required fields filled', () => {
    const form = mockChangeCarDetailsForm;
    component.ngOnInit();

    controls['effectiveDate'].setValue(form.effectiveDate);
    controls['vehicleAnnualMileage'].setValue('');

    expect(component.changeCarDetailsForm.valid).toBeFalsy();
  });
});
