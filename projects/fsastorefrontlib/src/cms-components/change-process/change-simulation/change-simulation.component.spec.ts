import { ChangePolicyService } from './../../../core/change-request/services/change-policy.service';
import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { UserRequestNavigationService } from './../../../core/user-request/facade/user-request-navigation.service';
import { ChangeSimulationComponent } from './change-simulation.component';
import createSpy = jasmine.createSpy;

const mockChangeRequest = {
  requestId: 'testRequestId',
  insurancePolicy: {
    policyNumber: 'testPolicy',
    categoryCode: {
      code: 'testCategory',
    },
  },
};
const requestId = 'request1';
const changeRequest = {
  requestId: requestId,
};

const configurationSteps = [
  {
    code: 'step1',
  },
];

class MockChangeRequestService {
  simulateChangeRequest = createSpy();

  cancelChangeRequest = createSpy();

  getChangeRequestError() {
    return of();
  }
  getChangeRequest() {
    return of(mockChangeRequest);
  }
  getAction() {
    return of({
      requestStatus: 'SUBMITTED',
      fsStepGroupDefinition: 'test',
    });
  }
}

class MockChangePolicyService {
  getChangedPolicyObjects() {}
}

class MockUserRequestNavigationService {
  getConfigurationSteps() {
    return configurationSteps;
  }
  getActiveStep() {}
}

class MockRoutingService {
  go = createSpy();
}

class GlobalMessageServiceMock {}

describe('ChangeSimulationComponent', () => {
  let component: ChangeSimulationComponent;
  let fixture: ComponentFixture<ChangeSimulationComponent>;
  let mockUserRequestNavigationService: MockUserRequestNavigationService;
  let mockChangeRequestService: MockChangeRequestService;
  let mockRoutingService: MockRoutingService;
  let globalMessageService: GlobalMessageService;
  let changePolicyService: ChangePolicyService;

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
          provide: ActivatedRoute,
          useValue: {
            routeConfig: {
              path: 'testPath',
            },
          },
        },
      ],
      declarations: [ChangeSimulationComponent],
    }).compileComponents();
    mockUserRequestNavigationService = TestBed.inject(
      UserRequestNavigationService as Type<UserRequestNavigationService>
    );
    mockRoutingService = TestBed.inject(RoutingService as Type<RoutingService>);
    globalMessageService = TestBed.inject(
      GlobalMessageService as Type<GlobalMessageService>
    );
    mockChangeRequestService = TestBed.inject(
      ChangeRequestService as Type<ChangeRequestService>
    );

    changePolicyService = TestBed.inject(
      ChangePolicyService as Type<ChangePolicyService>
    );
    spyOn(changePolicyService, 'getChangedPolicyObjects').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update change request', () => {
    component.simulateChangeRequest(changeRequest);
    expect(mockChangeRequestService.simulateChangeRequest).toHaveBeenCalledWith(
      changeRequest,
      -1
    );
  });
});
