import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalMessage,
  GlobalMessageService,
  RoutingService
} from '@spartacus/core';
import { of } from 'rxjs';
import { UserRequestNavigationService } from '../../../core/user-request/facade/user-request-navigation.service';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangePolicyService } from './../../../core/change-request/services/change-policy.service';
import { AbstractChangeProcessStepComponent } from './abstract-change-process-step.component';
import createSpy = jasmine.createSpy;

const configurationSteps = [
  {
    code: 'step1',
  },
];

const requestId = 'request1';
const policyId = 'policy1';
const contractId = 'contract1';

const changeRequest = {
  requestId: requestId,
};

class MockUserRequestNavigationService {
  continue = createSpy();

  getConfigurationSteps() {
    return configurationSteps;
  }
  getActiveStep() { }
}

class MockChangeRequestService {
  simulateChangeRequest = createSpy();
  cancelChangeRequest = createSpy();

  getChangeRequestError() {
    return of();
  }
  getChangeRequest() {
    return of(changeRequest);
  }
  getAction() {
    return of({
      configurationSteps: [{}],
      requestStatus: 'SUBMITTED',
      fsStepGroupDefinition: {},
      requestId: '00001012',
    });
  }
}

class MockRoutingService {
  go = createSpy();
}

class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void { }
}

class ChangePolicyServiceMock { }

describe('ChangeProcessStepComponent', () => {
  let component: AbstractChangeProcessStepComponent;
  let fixture: ComponentFixture<AbstractChangeProcessStepComponent>;
  let mockRoutingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let mockUserRequestNavigationService: UserRequestNavigationService;
  let mockChangeRequestService: ChangeRequestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: UserRequestNavigationService,
          useClass: MockUserRequestNavigationService,
        },
        {
          provide: ChangeRequestService,
          useClass: MockChangeRequestService,
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
          useClass: ChangePolicyServiceMock,
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
      declarations: [AbstractChangeProcessStepComponent],
    }).compileComponents();

    mockChangeRequestService = TestBed.inject(ChangeRequestService);
    mockUserRequestNavigationService = TestBed.inject(
      UserRequestNavigationService);
    mockRoutingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractChangeProcessStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue if request is already simulated', () => {
    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of({
        requestId: requestId,
        changedPolicy: {
          policyNumber: policyId,
        },
      })
    );
    component.ngOnInit();
    expect(mockUserRequestNavigationService.continue).toHaveBeenCalled();
  });

  it('should go to policy details in case request is cancelled', () => {
    spyOn(mockChangeRequestService, 'getChangeRequest').and.returnValue(
      of({
        requestId: requestId,
        requestStatus: 'CANCELED',
        insurancePolicy: {
          policyNumber: policyId,
          contractNumber: contractId,
        },
      })
    );
    component.ngOnInit();
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'policyDetails',
      params: { policyId: policyId, contractId: contractId },
    });
  });

  it('should call simulate change request', () => {
    component.simulateChangeRequest(changeRequest);
    expect(mockChangeRequestService.simulateChangeRequest).toHaveBeenCalledWith(
      changeRequest,
      -1
    );
  });

  it('should call cancel change request', () => {
    component.cancelChangeRequest(requestId);
    expect(mockChangeRequestService.cancelChangeRequest).toHaveBeenCalledWith(
      requestId
    );
  });

  it('should call simulate change request', () => {
    component.simulateChangeRequest(changeRequest);
    expect(mockChangeRequestService.simulateChangeRequest).toHaveBeenCalledWith(
      changeRequest,
      -1
    );
  });
});
