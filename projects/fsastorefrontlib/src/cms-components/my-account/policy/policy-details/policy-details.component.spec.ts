import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { AccordionModule } from '../../../../shared/accordion/accordion.module';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import {
  AllowedFSRequestType,
  RequestType,
} from './../../../../occ/occ-models';
import { PolicyDetailsComponent } from './policy-details.component';

class MockPolicyService {
  loadPolicyDetails() {}
  getPolicyDetails() {}
}

class MockRoutingService {
  go = jasmine.createSpy();

  getRouterState(): Observable<any> {
    return of({
      state: {
        params: {
          policyId: '0000002',
          contractId: '0000002',
        },
      },
    });
  }
}
const mockAllowedFSRequestTypes: AllowedFSRequestType[] = [
  {
    requestType: {
      code: RequestType.FSCLAIM,
    },
  },
  {
    requestType: {
      code: RequestType.COVERAGE_CHANGE,
    },
  },
  {
    requestType: {
      code: RequestType.INSURED_OBJECT_CHANGE,
    },
  },
];

class MockChangeRequestService {
  getChangeRequest(): Observable<any> {
    return of({
      requestId: 'requestId',
      configurationSteps: [
        {
          pageLabelOrId: 'testStep',
        },
      ],
    });
  }
  createChangeRequest(policy, contract, changeRequest) {}
}

const mockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [''],
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

const policyId = 'policyId';
const contractId = 'contractId';

describe('PolicyDetailsComponent', () => {
  let component: PolicyDetailsComponent;
  let fixture: ComponentFixture<PolicyDetailsComponent>;
  let changeRequestService: MockChangeRequestService;
  let routingService: MockRoutingService;
  let policyService: PolicyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule, I18nTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PolicyService, useClass: MockPolicyService },
        { provide: OccConfig, useValue: mockOccModuleConfig },
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
      ],
      declarations: [PolicyDetailsComponent],
    }).compileComponents();

    changeRequestService = TestBed.get(ChangeRequestService as Type<
      ChangeRequestService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    policyService = TestBed.get(PolicyService as Type<PolicyService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should check', () => {
    expect(component).toBeTruthy();
  });

  it('should check if policyId and contractId are not provided', () => {
    spyOn(policyService, 'loadPolicyDetails').and.stub();
    spyOn(routingService, 'getRouterState').and.returnValue(
      of({
        state: {
          params: {},
        },
      })
    );
    component.ngOnInit();
    expect(policyService.loadPolicyDetails).not.toHaveBeenCalled();
  });

  it('should return baseUrl', () => {
    expect(component.getBaseUrl()).toEqual('');
  });

  it('should create change request for policy', () => {
    spyOn(changeRequestService, 'createChangeRequest').and.stub();
    component.changePolicyDetails(
      policyId,
      contractId,
      RequestType.INSURED_OBJECT_CHANGE
    );
    expect(changeRequestService.createChangeRequest).toHaveBeenCalledWith(
      policyId,
      contractId,
      RequestType.INSURED_OBJECT_CHANGE
    );
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should not redirect if change request is not created', () => {
    spyOn(changeRequestService, 'createChangeRequest').and.stub();
    spyOn(changeRequestService, 'getChangeRequest').and.returnValue(of(null));
    component.changePolicyDetails(
      policyId,
      contractId,
      RequestType.INSURED_OBJECT_CHANGE
    );
    expect(routingService.go).not.toHaveBeenCalledWith();
  });

  it('should checkk if request type is allowed', () => {
    expect(
      component.isChangeAllowed(
        mockAllowedFSRequestTypes,
        RequestType.COVERAGE_CHANGE
      )
    ).toEqual(true);
  });

  it('should check if request type is not allowed', () => {
    expect(
      component.isChangeAllowed(mockAllowedFSRequestTypes, 'NOT_EXISTING_TYPE')
    ).toEqual(false);
  });

  it('should check if request type is not allowed when allowed request types are not defined', () => {
    expect(component.isChangeAllowed(null, 'NOT_EXISTING_TYPE')).toEqual(false);
  });
});
