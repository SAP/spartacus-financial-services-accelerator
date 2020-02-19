import { PolicyDetailsComponent } from './policy-details.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RoutingService, OccConfig, I18nTestingModule } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { AccordionModule } from '../../../../shared/accordion/accordion.module';
import { PolicyService } from '../../../../core/my-account/facade/policy.service';
import { ChangeRequestService } from './../../../../core/change-request/facade/change-request.service';
import { Type } from '@angular/core';

class MockPolicyService {
  loadPolicyDetails(): void {}

  getPolicies() {}
}

class MockRoutingService {
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

class MockChangeRequestService {
  getChangeRequest(): Observable<any> {
    return of({
      requestId: 'requestId',
    });
  }
  createChangeRequest(policyId, contractId, changeRequestType) {}
}

const MockOccModuleConfig: OccConfig = {
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
const changeRequestType = 'FSINSUREDOBJECT_CHANGE';

describe('PolicyDetailsComponent', () => {
  let component: PolicyDetailsComponent;
  let fixture: ComponentFixture<PolicyDetailsComponent>;
  let changeRequestService: MockChangeRequestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule, I18nTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PolicyService, useClass: MockPolicyService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
        { provide: ChangeRequestService, useClass: MockChangeRequestService },
      ],
      declarations: [PolicyDetailsComponent],
    }).compileComponents();

    changeRequestService = TestBed.get(ChangeRequestService as Type<
      ChangeRequestService
    >);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create change request for policy', () => {
    spyOn(changeRequestService, 'createChangeRequest').and.stub();
    component.changePolicyDetails(policyId, contractId);
    expect(changeRequestService.createChangeRequest).toHaveBeenCalledWith(
      policyId,
      contractId,
      changeRequestType
    );
  });
});
