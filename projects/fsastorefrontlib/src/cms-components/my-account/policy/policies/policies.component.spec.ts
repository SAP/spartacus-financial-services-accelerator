import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  I18nTestingModule,
  OccConfig,
  RoutingService,
} from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { FSCLAIM, PoliciesComponent } from './policies.component';
import { PolicyService } from '../../../../core/my-account/facade';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { AllowedFSRequestType } from './../../../../occ/occ-models/occ.models';
import { Type } from '@angular/core';
import createSpy = jasmine.createSpy;

class MockRoutingService {
  go = createSpy();
}

class MockClaimService {
  createClaim() {}
}

class MockPolicyService {
  loadPolicies = createSpy();
  getPolicies = createSpy();
  getLoaded = createSpy();
  getActive(): Observable<Cart> {
    return of();
  }
}
const MockOccConfig: OccConfig = {
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
const contractNumber = '01';
describe('PoliciesComponent', () => {
  let component: PoliciesComponent;
  let fixture: ComponentFixture<PoliciesComponent>;
  let policyService: MockPolicyService;
  let claimService: MockClaimService;
  let routingService: MockRoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, SpinnerModule],
      declarations: [PoliciesComponent],
      providers: [
        {
          provide: PolicyService,
          useClass: MockPolicyService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: OccConfig,
          useValue: MockOccConfig,
        },
        {
          provide: ClaimService,
          useClass: MockClaimService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    policyService = TestBed.get(PolicyService as Type<PolicyService>);
    claimService = TestBed.get(ClaimService as Type<ClaimService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get base url', () => {
    expect(component.getBaseUrl()).toEqual('');
  });
  it('should call create claim', () => {
    spyOn(claimService, 'createClaim').and.stub();
    component.startClaim('policyId', contractNumber);
    expect(claimService.createClaim).toHaveBeenCalled();
    expect(routingService.go).toHaveBeenCalled();
  });
  it('should not call create claim', () => {
    spyOn(claimService, 'createClaim').and.stub();
    component.startClaim(undefined, contractNumber);
    expect(claimService.createClaim).not.toHaveBeenCalled();
  });
  it('should not get allowed policy category', () => {
    const allowedRequestTypes = component.isPolicyCategoryAllowed([]);
    expect(allowedRequestTypes).toBe(undefined);
  });
  it('should get allowed policy category', () => {
    const requestTypes: AllowedFSRequestType[] = [
      { requestType: { code: FSCLAIM } },
    ];
    const allowedRequestTypes = component.isPolicyCategoryAllowed(requestTypes);
    expect(allowedRequestTypes).toBe(true);
  });
});
