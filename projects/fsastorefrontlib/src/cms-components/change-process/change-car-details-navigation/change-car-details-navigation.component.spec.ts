import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
import { FormDataService, YFormData } from '@fsa/dynamicforms';

const requestId = 'request1';

const changeRequest = {
  requestId: requestId,
};
const mockSubmittedFormData = {
  content: '{ "vehicleAnnualMileage":"2323"}',
};

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

class MockChangePolicyService {}

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

describe('ChangeCarDetailsNavigationComponent', () => {
  let component: ChangeCarDetailsNavigationComponent;
  let fixture: ComponentFixture<ChangeCarDetailsNavigationComponent>;
  let mockChangeRequestService: ChangeRequestService;
  let mockUserRequestNavigationService: UserRequestNavigationService;
  let mockRoutingService: RoutingService;
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
          provide: ChangePolicyService,
          useClass: MockChangePolicyService,
        },
        {
          provide: FormDataService,
          useClass: MockFormDataService,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarDetailsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute simulation request', () => {
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
                  changeable: true,
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
});
