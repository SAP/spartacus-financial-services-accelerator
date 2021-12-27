import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { QuoteService } from '../../core/my-account/facade/quote.service';
import { PolicyService } from '../../core/my-account/facade/policy.service';
import { ClaimService } from '../../core/my-account/facade/claim.service';
import {
  Address,
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FSUserRole } from '../../occ/occ-models/occ.models';
import createSpy = jasmine.createSpy;

const customerName = 'customerName';
const customerUid = 'customerUid';

const firstCartCode = 'test001';
const firstCategoryCode = 'testCategory1';
const firstQuoteId = 'test001';
const secondCartCode = 'test002';
const secondCategoryCode = 'testCategory2';
const secondQuoteId = 'test002';

const firstPolicyNumber = 'test001';
const firstContractNumber = 'test001';
const firstPolicyCategoryCode = 'testCategoryCode';
const secondPolicyNumber = 'test002';
const secondContractNumber = 'test002';
const secondPolicyCategoryCode = 'testCategoryCode';

const claimId1 = 'testClaim001';
const claimId2 = 'testClaim002';
const claimId3 = 'testClaim003';
const requestId1 = 'testRequest001';
const requestId2 = 'testRequest002';
const requestId3 = 'testRequest003';

const claimNumber = '000001';

const firstName = 'Donna';
const lastName = 'Moore';
const defaultAddress: Address = {
  firstName: firstName,
  lastName: lastName,
  postalCode: '11000',
  town: 'Belgrade',
  defaultAddress: true,
};

const customer = {
  name: customerName,
  uid: customerUid,
};

const insuranceQuote1: any = {
  cartCode: firstCartCode,
  defaultCategory: {
    code: firstCategoryCode,
  },
  quoteId: firstQuoteId,
};

const insuranceQuote2: any = {
  cartCode: secondCartCode,
  defaultCategory: {
    code: secondCategoryCode,
  },
  quoteId: secondQuoteId,
};

const insuranceQuotes = {
  insuranceQuotes: [insuranceQuote1, insuranceQuote2],
};

const insurancePolicy1: any = {
  policyNumber: firstPolicyNumber,
  contractNumber: firstContractNumber,
  insuredObjectList: {
    insuredObjectItems: [],
  },
  categoryData: {
    code: firstPolicyCategoryCode,
  },
};
const insurancePolicy2: any = {
  policyNumber: secondPolicyNumber,
  contractNumber: secondContractNumber,
  insuredObjectList: {
    insuredObjectItems: [],
  },
  categoryData: {
    code: secondPolicyCategoryCode,
  },
};

const insurancePolicies = {
  insurancePolicies: [insurancePolicy1, insurancePolicy2],
};

const claim1 = {
  claimNumber: claimId1,
  claimStatus: 'OPEN',
  requestId: requestId1,
};
const claim2 = {
  claimNumber: claimId2,
  claimStatus: 'PROCESSING',
  requestId: requestId2,
};
const claim3 = {
  claimNumber: claimId3,
  claimStatus: 'OPEN',
  requestId: requestId3,
  locationOfLoss: {
    code: 'testCode',
  },
};

const claims = [claim1, claim2, claim3];

const roles = [FSUserRole.SELLER];

const mockUser = {
  customerId: 'testuser',
  firstName: firstName,
  lastName: lastName,
  defaultAddress: defaultAddress,
  roles: roles,
};

const mockedClaims = {
  claims: [
    {
      claimNumber: claimNumber,
      claimStatus: 'OPEN',
      incidentType: {
        icon: {
          url: 'testURL',
          alt: 'testALT',
        },
        incidentName: 'Theft',
      },
    },
  ],
};

let mockRouterState = {
  state: {
    params: {
      customerId: 'testId',
    },
  },
};

@Pipe({
  name: 'parseDate',
})
class MockParseDatePipe implements PipeTransform {
  transform() {}
}

class MockConsentService {
  loadCustomer(): void {}
  loadCustomerQuotes(): void {}
  loadCustomerPolicies(): void {}
  loadCustomerClaims(): void {}

  getCustomer() {
    return of(customer);
  }

  getCustomerQuotes() {
    return of(insuranceQuotes);
  }

  getCustomerPolicies() {
    return of(insurancePolicies);
  }

  getCustomerClaims() {
    return of(claims);
  }
}

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockUserAccountFacade {
  get = createSpy('get').and.returnValue(of(mockUser));
}

class MockRoutingService {
  go() {}
  getRouterState() {
    return of(mockRouterState as any);
  }
}

class MockQuoteService {
  getQuotes() {
    return of(insuranceQuotes);
  }
  loadQuotes() {}
}

class MockPolicyService {
  loadPolicies = createSpy();
  getPolicies = createSpy();
}

class MockClaimService {
  loadClaims = createSpy();

  getClaims() {
    return of(mockedClaims);
  }
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userAccountFacade: UserAccountFacade;
  let fsConsentService: ConsentService;
  let routingService: RoutingService;
  let userIdService: UserIdService;
  let quoteService: QuoteService;
  let policyService: PolicyService;
  let claimService: ClaimService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        providers: [
          { provide: ConsentService, useClass: MockConsentService },
          { provide: UserIdService, useClass: MockUserIdService },
          {
            provide: UserAccountFacade,
            useClass: MockUserAccountFacade,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: QuoteService,
            useClass: MockQuoteService,
          },
          {
            provide: PolicyService,
            useClass: MockPolicyService,
          },
          { provide: ClaimService, useClass: MockClaimService },
        ],
        declarations: [UserProfileComponent, MockParseDatePipe],
      }).compileComponents();
      fsConsentService = TestBed.inject(ConsentService);
      userIdService = TestBed.inject(UserIdService);
      claimService = TestBed.inject(ClaimService);
      routingService = TestBed.inject(RoutingService);
      userAccountFacade = TestBed.inject(UserAccountFacade);
      quoteService = TestBed.inject(QuoteService);
      policyService = TestBed.inject(PolicyService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    spyOn(routingService, 'go').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Seller assets', () => {
    mockRouterState = null;
    spyOn(routingService, 'getRouterState').and.callThrough();
    spyOn(component, 'loadCustomerDetails').and.callThrough();
    component.ngOnInit();
    expect(component.loadCustomerDetails).toHaveBeenCalled();
  });

  it('should pick asset', () => {
    component.showAssetList([mockUser], 'test-class');
    expect(component.assets).toEqual([mockUser]);
  });
});
