import { PolicyDetailsComponent } from './policy-details.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RoutingService, OccConfig, I18nTestingModule } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { AccordionModule } from '../../../../shared/accordion/accordion.module';
import { PolicyService } from '../../../../core/my-account/facade';

class MockPolicyService {
  loadPolicyDetails(policyId: string, contractId: string): void {}

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
const mockAllowedFSRequestTypes = [
  {
    code: 'fsclaim_request_type',
    requestType: {
      code: 'FSCLAIM',
    },
  },
  {
    code: 'fscoverage_change_request_type',
    requestType: {
      code: 'FSCOVERAGE_CHANGE',
    },
  },
  {
    code: 'fsinsuredobject_change_request_type',
    requestType: {
      code: 'FSINSUREDOBJECT_CHANGE',
    },
  },
];
const mockFaultyFSRequestTypes = [
  {
    code: 'fscoverage_change_request_type',
  },
];

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

describe('PolicyDetailsComponent', () => {
  let component: PolicyDetailsComponent;
  let fixture: ComponentFixture<PolicyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule, I18nTestingModule],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PolicyService, useClass: MockPolicyService },
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
      declarations: [PolicyDetailsComponent],
    }).compileComponents();
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

  it('should checkk if request type is allowed', () => {
    expect(
      component.isChangeAllowed(mockAllowedFSRequestTypes, 'FSCOVERAGE_CHANGE')
    ).toEqual(true);
  });

  it('should check if request type is not allowed', () => {
    expect(
      component.isChangeAllowed(mockAllowedFSRequestTypes, 'NOT_EXISTING_TYPE')
    ).toEqual(false);
  });

  it('should check if isChangeAllowed returns false with missing requestType', () => {
    expect(
      component.isChangeAllowed(mockFaultyFSRequestTypes, 'NOT_EXISTING_TYPE')
    ).toEqual(false);
  });
});
