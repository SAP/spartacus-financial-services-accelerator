import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FileService } from '@spartacus/dynamicforms';
import { I18nTestingModule, OccConfig, RoutingService } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { PolicyService } from '../../../../core/my-account/facade';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import {
  AllowedFSRequestType,
  RequestType,
} from './../../../../occ/occ-models/occ.models';
import { PoliciesComponent } from './policies.component';
import createSpy = jasmine.createSpy;

const policy1 = {
  categoryData: {
    name: 'Test1 isurance',
  },
  paymentFrequency: 'Test1 frequency',
  policyPremium: {
    currencyIso: 'EUR',
    value: '49',
  },
};

const policy2 = {
  categoryData: {
    name: 'Test2 isurance',
  },
  paymentFrequency: 'Test2 frequency',
  policyPremium: {
    currencyIso: 'EUR',
    value: '55',
  },
};

const mockPolicies = {
  insurancePolicies: [policy1, policy2],
};

class MockRoutingService {
  go = createSpy();
}

const claimNumber = '0000001';

class MockClaimService {
  createClaim() {}

  getCurrentClaim(): Observable<any> {
    return of({
      claimNumber: claimNumber,
      configurationSteps: [
        {
          pageLabelOrId: 'testPage',
        },
      ],
    });
  }
}

class MockPolicyService {
  loadPolicies = createSpy();
  getPolicies = createSpy().and.returnValue(of(mockPolicies));
  getLoaded = createSpy();
  setPolicies = createSpy();
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

class MockFileService {
  uploadFile(file: File): Observable<any> {
    return of();
  }
  resetFiles(): void {}
  setFileInStore(body: any) {}
  getUploadedDocuments(): Observable<any> {
    return of();
  }
}

const contractNumber = '01';
describe('PoliciesComponent', () => {
  let component: PoliciesComponent;
  let fixture: ComponentFixture<PoliciesComponent>;
  let policyService: PolicyService;
  let claimService: ClaimService;
  let routingService: RoutingService;
  let mockFileService: FileService;

  beforeEach(
    waitForAsync(() => {
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
          { provide: FileService, useClass: MockFileService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    policyService = TestBed.inject(PolicyService);
    claimService = TestBed.inject(ClaimService);
    mockFileService = TestBed.inject(FileService);
    routingService = TestBed.inject(RoutingService);
    // spyOn(policyService, 'getPolicies').and.returnValue(of(mockPolicies));
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get base url', () => {
    expect(component.baseUrl).toEqual('');
  });
  it('should call create claim', () => {
    spyOn(claimService, 'createClaim').and.stub();
    component.startClaim('policyId', contractNumber);
    expect(routingService.go).toHaveBeenCalled();
  });
  it('should call create claim without redirection', () => {
    spyOn(claimService, 'createClaim').and.stub();
    spyOn(claimService, 'getCurrentClaim').and.returnValue(
      of({
        claimNumber: claimNumber,
      })
    );
    component.startClaim('policyId', contractNumber);
    expect(routingService.go).not.toHaveBeenCalled();
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
      { requestType: { code: RequestType.FSCLAIM } },
    ];
    const allowedRequestTypes = component.isPolicyCategoryAllowed(requestTypes);
    expect(allowedRequestTypes).toBe(true);
  });
});
