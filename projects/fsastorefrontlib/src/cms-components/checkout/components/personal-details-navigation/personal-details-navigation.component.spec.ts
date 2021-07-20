import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@spartacus/dynamicforms';
import {
  Address,
  Cart,
  I18nTestingModule,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { FSCartService } from './../../../../core/cart/facade/cart.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { QuoteService } from './../../../../core/my-account/facade/quote.service';
import { PersonalDetailsNavigationComponent } from './personal-details-navigation.component';
import { FSSteps } from '../../../../occ/occ-models';

import { PricingService } from './../../../../core/product-pricing/facade/pricing.service';
import createSpy = jasmine.createSpy;
import { FSAddressService } from './../../../../core/user/facade/address.service';
import { UserAccountFacade } from '@spartacus/user/account/root';

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

class MockActivatedRoute {
  params = of();
}
class MockRoutingService {
  go() {}
}

class MockQuoteService {
  underwriteQuote = createSpy();
  updateQuote = createSpy();
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
  createAddressData() {}
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
    component.navigateNext(mockCategoryAndStep);
    expect(quoteService.underwriteQuote).toHaveBeenCalledWith(mockCart.code);
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
    spyOn(addressService, 'createAddressData').and.callThrough();
    const testFormData: YFormData = {
      id: 'test-formData',
      type: 'DATA',
    };
    spyOn(formService, 'getSubmittedForm').and.returnValue(of(testFormData));
    component.navigateNext(mockCategoryAndStep);
    expect(addressService.createAddressData).not.toHaveBeenCalled();
  });

  it('should set delivery address when main product in cart is configurable', () => {
    spyOn(addressService, 'createAddressData').and.callThrough();
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
    expect(addressService.createAddressData).toHaveBeenCalled();
  });
});
