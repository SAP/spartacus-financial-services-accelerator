import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@spartacus/dynamicforms';
import {
  Address,
  Cart,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PersonalDetailsNavigationComponent } from './personal-details-navigation.component';
import { FSSteps, FSUserRole } from '../../../../occ/occ-models';

import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import createSpy = jasmine.createSpy;
import { FSAddressService } from './../../../../core/user/facade/address.service';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { ConsentService } from '../../../../core/my-account/facade/consent.service';

const firstName = 'Donna';
const lastName = 'Moore';
const defaultAddress: Address = {
  firstName: firstName,
  lastName: lastName,
  postalCode: '11000',
  town: 'Belgrade',
  defaultAddress: true,
};

const mockUser = {
  customerId: 'testuser',
  firstName: firstName,
  lastName: lastName,
  defaultAddress: defaultAddress,
  roles: [],
};

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_travel',
  step: 'category',
};

const mockCart = {
  code: '1234',
  entries: [
    {
      entryNumber: 1,
      formData: [
        {
          id: 'formData1',
        },
      ],
      product: {
        code: 'testProduct',
        configurable: false,
      },
    },
  ],
};

const formData: YFormData = {
  id: 'test-formData',
  type: 'DATA',
  content:
    '{"testContent":{"tripDestination":"Europe","tripStartDate":"2022-02-02"}}',
};

const mockAddress = [defaultAddress];

class MockActivatedRoute {
  params = of();
}
class MockRoutingService {
  go() {}
}

class MockQuoteService {
  underwriteQuoteApplication(cartId): Observable<any> {
    return of(null);
  }
  updateQuoteApplication(
    cartId,
    quoteActionType,
    pricingAttributesData
  ): Observable<any> {
    return of(null);
  }
}

class MockCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return '';
  }
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of(mockCart);
  }
}

class MockFormService {
  submit = createSpy();

  getSubmittedForm() {
    return of(formData);
  }
}

class MockPricingService {
  buildPricingData() {
    return { attribute: 'test' };
  }
}

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
  load() {}
}

class MockFSAddressService {
  populateAddressFromFormData() {}
  createAddress() {}
  getAddresses() {
    return of(mockAddress);
  }
}

class MockConsentService {
  createAddressForUser() {}
}

describe('PersonalDetailsNavigationComponent', () => {
  let component: PersonalDetailsNavigationComponent;
  let fixture: ComponentFixture<PersonalDetailsNavigationComponent>;
  let routingService: RoutingService;
  let quoteService: QuoteService;
  let addressService: FSAddressService;
  let mockedUserAccountFacade: UserAccountFacade;
  let cartService: FSCartService;
  let formService: FormDataService;
  let consentService: ConsentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [PersonalDetailsNavigationComponent],
        providers: [
          {
            provide: FSCartService,
            useClass: MockCartService,
          },
          {
            provide: FormDataService,
            useClass: MockFormService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: FSCheckoutConfigService,
            useClass: MockCheckoutConfigService,
          },
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
          },
          {
            provide: QuoteService,
            useClass: MockQuoteService,
          },
          {
            provide: PricingService,
            useClass: MockPricingService,
          },
          {
            provide: FSAddressService,
            useClass: MockFSAddressService,
          },
          {
            provide: UserAccountFacade,
            useClass: MockUserAccountFacade,
          },
          {
            provide: ConsentService,
            useClass: MockConsentService,
          },
        ],
      }).compileComponents();

      quoteService = TestBed.inject(QuoteService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routingService = TestBed.inject(RoutingService);
    addressService = TestBed.inject(FSAddressService);
    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
    cartService = TestBed.inject(FSCartService);
    formService = TestBed.inject(FormDataService);
    consentService = TestBed.inject(ConsentService);
    spyOn(routingService, 'go').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back to previous step', () => {
    component.navigateBack(mockCategoryAndStep);
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should navigate next', () => {
    spyOn(quoteService, 'underwriteQuoteApplication').and.callThrough();
    component.navigateNext(mockCategoryAndStep);
    expect(quoteService.underwriteQuoteApplication).toHaveBeenCalledWith(
      mockCart.code
    );
  });

  it('should not navigate next when cart is empty', () => {
    const testCart: Cart = {
      code: 'emptyCart',
      entries: [],
    };
    const testFormData: YFormData = {
      id: 'test-formData',
      type: 'DATA',
    };
    spyOn(formService, 'getSubmittedForm').and.returnValue(of(testFormData));
    spyOn(cartService, 'getActive').and.returnValue(of(testCart));
    component.navigateNext(mockCategoryAndStep);
    expect(routingService.go).not.toHaveBeenCalled();
  });

  it('should submit form data that already exist', () => {
    const testCart = {
      code: '1234',
      entries: [
        {
          formData: [],
          entryNumber: 1,
          product: {
            code: 'testProduct',
            configurable: false,
          },
        },
      ],
    };
    spyOn(cartService, 'getActive').and.returnValue(of(testCart));
    component.navigateNext(mockCategoryAndStep);
    expect(formService.submit).toHaveBeenCalled();
  });

  it('should not set delivery address when form content is empty', () => {
    spyOn(addressService, 'createAddress').and.callThrough();
    const testFormData: YFormData = {
      id: 'test-formData',
      type: 'DATA',
    };
    spyOn(formService, 'getSubmittedForm').and.returnValue(of(testFormData));
    component.navigateNext(mockCategoryAndStep);
    expect(addressService.createAddress).not.toHaveBeenCalled();
  });

  it('should set delivery address when main product in cart is configurable', () => {
    spyOn(addressService, 'createAddress').and.callThrough();
    const testCart = {
      code: 'testCart',
      entries: [
        {
          entryNumber: 1,
          formData: [
            {
              id: 'formData1',
            },
          ],
          product: {
            code: 'testProduct',
            configurable: true,
          },
        },
      ],
    };
    spyOn(cartService, 'getActive').and.returnValue(of(testCart));
    component.navigateNext(mockCategoryAndStep);
    expect(addressService.createAddress).toHaveBeenCalled();
  });

  it('should create new address for the customer when currently logged in user is part of seller user group', () => {
    const seller = {
      customerId: 'testuser',
      firstName: firstName,
      lastName: lastName,
      defaultAddress: defaultAddress,
      roles: [FSUserRole.SELLER],
    };
    const personalDetailsFormData: YFormData = {
      id: 'test-formData',
      type: 'DATA',
      content:
        '{"personalDetails":{"title":"mrs","firstName":"test","lastName":"test","email":"test@outlook.com","country":"RS"}}',
    };
    const testCart = {
      code: 'testCart',
      entries: [
        {
          entryNumber: 1,
          formData: [
            {
              id: 'formData1',
            },
          ],
          product: {
            code: 'testProduct',
            configurable: true,
          },
        },
      ],
    };
    spyOn(cartService, 'getActive').and.returnValue(of(testCart));
    spyOn(mockedUserAccountFacade, 'get').and.returnValue(of(seller));
    spyOn(addressService, 'getAddresses').and.returnValue(of(mockAddress));
    spyOn(consentService, 'createAddressForUser').and.callThrough();
    spyOn(formService, 'getSubmittedForm').and.returnValue(
      of(personalDetailsFormData)
    );
    component.navigateNext(mockCategoryAndStep);
    component['createDeliveryAddressForUser'](
      seller,
      personalDetailsFormData,
      mockAddress
    );
    expect(consentService.createAddressForUser).toHaveBeenCalled();
  });
});
