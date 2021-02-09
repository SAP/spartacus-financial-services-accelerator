import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';
import { ChangePolicyService } from '../../../core/change-request/services/change-policy.service';
import { UserRequestNavigationService } from '../../../core/user-request/facade';
import { ChangeCarDetailsNavigationComponent } from './change-car-details-navigation.component';
import createSpy = jasmine.createSpy;
import {
  FormDataService,
  YFormData,
  FormDataStorageService,
} from '@spartacus/dynamicforms';

const requestId = 'request1';

const changeRequest = {
  requestId: requestId,
};

const addedInsuredObject = {
  insuredObjectItems: [
    {
      label: 'firstName',
      value: 'Mock name',
    },
    {
      label: 'lastName',
      value: 'Mock surname',
    },
  ],
};

const changedInsuredObject = {
  insuredObjectItems: [
    {
      label: 'vehicleAnnualMileage',
      value: '3000',
      changeable: true,
    },
  ],
};

let mockSubmittedFormData;

class MockFormDataService {
  submit() {}
  getSubmittedForm(): Observable<YFormData> {
    return of(mockSubmittedFormData);
  }
}

class MockChangeRequestService {
  simulateChangeRequest = createSpy();

  getChangeRequestError() {
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

class MockChangePolicyService {
  createInsuredObject() {
    return addedInsuredObject;
  }
  getChangedInsuredObject() {
    return changedInsuredObject;
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

class MockFormDataStorageService {
  clearFormDataIdFromLocalStorage() {}
}

describe('ChangeCarDetailsNavigationComponent', () => {
  let component: ChangeCarDetailsNavigationComponent;
  let fixture: ComponentFixture<ChangeCarDetailsNavigationComponent>;
  let mockChangeRequestService: ChangeRequestService;
  let mockUserRequestNavigationService: UserRequestNavigationService;
  let mockRoutingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let mockFormDataStorageService: FormDataStorageService;

  beforeEach(
    waitForAsync(() => {
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
            provide: ChangePolicyService,
            useClass: MockChangePolicyService,
          },
          {
            provide: FormDataService,
            useClass: MockFormDataService,
          },
          {
            provide: FormDataStorageService,
            useClass: MockFormDataStorageService,
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
        declarations: [ChangeCarDetailsNavigationComponent],
      }).compileComponents();

      mockRoutingService = TestBed.inject(RoutingService);
      mockChangeRequestService = TestBed.inject(ChangeRequestService);
      globalMessageService = TestBed.inject(GlobalMessageService);
      mockUserRequestNavigationService = TestBed.inject(
        UserRequestNavigationService
      );
      mockFormDataStorageService = TestBed.inject(FormDataStorageService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarDetailsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute simulation request for changing existing insured object', () => {
    mockSubmittedFormData = {
      content: '{ "vehicleAnnualMileage":"2323"}',
    };
    component.ngOnInit();
    const changedRequestData = {
      requestId: requestId,
      fsStepGroupDefinition: {
        requestType: {
          code: 'FSINSUREDOBJECT_CHANGE',
        },
      },
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [changedInsuredObject],
        },
      },
    };
    component.simulateChanges(changedRequestData);
    expect(mockChangeRequestService.simulateChangeRequest).toHaveBeenCalled();
  });

  it('should not execute simulation request when insuredObjectItems length is 0', () => {
    mockSubmittedFormData = {
      content: '{ "vehicleAnnualMileage":"2323"}',
    };
    const changedRequestData = {
      requestId: requestId,
      fsStepGroupDefinition: {
        requestType: {
          code: 'FSINSUREDOBJECT_CHANGE',
        },
      },
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [],
        },
      },
    };
    component.ngOnInit();

    component.simulateChanges(changedRequestData);
    expect(
      mockChangeRequestService.simulateChangeRequest
    ).not.toHaveBeenCalled();
  });

  it('should not execute simulation request when submittedFormData.content is not defined', () => {
    mockSubmittedFormData = {};
    const changedRequestData = {
      requestId: requestId,
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [changedInsuredObject],
        },
      },
    };
    component.ngOnInit();

    component.simulateChanges(changedRequestData);
    expect(
      mockChangeRequestService.simulateChangeRequest
    ).not.toHaveBeenCalled();
  });

  it('should execute simulation request for adding new insured object', () => {
    mockSubmittedFormData = {
      content: '{ "firstName":"Mock Name", "lastName":"Mock Surname"}',
    };
    component.ngOnInit();
    const changedRequestData = {
      requestId: requestId,
      fsStepGroupDefinition: {
        requestType: {
          code: 'FSINSUREDOBJECT_ADD',
        },
      },
      insurancePolicy: {
        insuredObjectList: {
          insuredObjects: [addedInsuredObject],
        },
      },
    };
    component.simulateChanges(changedRequestData);
    expect(mockChangeRequestService.simulateChangeRequest).toHaveBeenCalled();
  });
});
