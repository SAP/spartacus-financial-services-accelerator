import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Address,
  CmsService,
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { UserProfileService } from '@spartacus/user/profile/core';
import { Observable, of } from 'rxjs';
import { ClaimService } from '../../core/my-account/facade/claim.service';
import { ConsentService } from '../../core/my-account/facade/consent.service';
import { PolicyService } from '../../core/my-account/facade/policy.service';
import { QuoteService } from '../../core/my-account/facade/quote.service';
import { CMSUserProfileComponent } from '../../occ';
import {
  AssetTableType,
  FSUserRole,
  ProductOverviewCategory,
} from '../../occ/occ-models/occ.models';
import { UserProfileComponent } from './user-profile.component';
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
  id: 'addressMockId',
  line1: 'line1',
  line2: 'line2',
  region: { isocode: 'JP-27' },
  country: { isocode: 'JP' },
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
  name: firstName + ' ' + lastName,
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

const componentData: CMSUserProfileComponent = {
  uid: 'test',
  typeCode: 'test11',
  name: 'test222',
  children: 'test1, test2',
};

const mockCmsComponentData: CmsComponentData<CMSUserProfileComponent> = {
  data$: of(componentData),
  uid: 'test',
};

const MockCmsService = {
  getComponentData: () => of(componentData),
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

class MockUserProfileService {
  get() {
    return of(mockUser as any);
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

class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userAccountFacade: UserAccountFacade;
  let fsConsentService: ConsentService;
  let routingService: RoutingService;
  let userProfileService: UserProfileService;
  let userIdService: UserIdService;
  let quoteService: QuoteService;
  let policyService: PolicyService;
  let claimService: ClaimService;
  let globalMessageService: GlobalMessageService;

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
            provide: UserProfileService,
            useClass: MockUserProfileService,
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
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
          {
            provide: CmsComponentData,
            useValue: mockCmsComponentData,
          },
          {
            provide: CmsService,
            useValue: MockCmsService,
          },
        ],
        declarations: [UserProfileComponent, MockParseDatePipe],
      }).compileComponents();
      fsConsentService = TestBed.inject(ConsentService);
      userIdService = TestBed.inject(UserIdService);
      claimService = TestBed.inject(ClaimService);
      routingService = TestBed.inject(RoutingService);
      userProfileService = TestBed.inject(UserProfileService);
      userAccountFacade = TestBed.inject(UserAccountFacade);
      quoteService = TestBed.inject(QuoteService);
      policyService = TestBed.inject(PolicyService);
      globalMessageService = TestBed.inject(GlobalMessageService);
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

  it('should get Seller assets if customerId is undefined', () => {
    mockRouterState = null;
    spyOn(routingService, 'getRouterState').and.callThrough();
    spyOn(component, 'loadCustomerDetails').and.callThrough();
    component.ngOnInit();
    expect(component.loadCustomerDetails).toHaveBeenCalled();
  });

  it('should pick asset', () => {
    component.showAssetList({
      assetsChosen: [mockUser],
      activeClass: AssetTableType.CLAIMS,
    });
    expect(component.assets).toEqual([mockUser]);
  });

  it('should show user address form', () => {
    component.showUserAddressForm();
    expect(component.showUserAddressForm).toBeTruthy();
  });

  it('should display message when adress is changed', () => {
    spyOn(globalMessageService, 'add').and.callThrough();
    component.changedAddress('Add');
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'addressForm.successfullyAddAddress' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should toggle products overview', () => {
    spyOn(component, 'toggleProductsOverview').and.callThrough();
    component.toggleProductsOverview();
    expect(component.toggleProductsOverview).toHaveBeenCalled();
  });

  it('should call productsSelected', () => {
    spyOn(component, 'productsSelected').and.callThrough();
    component.productsSelected(ProductOverviewCategory.ALL);
    expect(component.productsSelected).toHaveBeenCalled();
  });
});
