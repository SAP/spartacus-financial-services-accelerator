import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FSPaymentMethodComponent } from './payment-method.component';
import {
  Address,
  GlobalMessageService,
  I18nTestingModule,
  QueryState,
  RoutingService,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { ActiveCartFacade, PaymentDetails } from '@spartacus/cart/base/root';
import { Cart } from '@spartacus/cart/base/root';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutDeliveryAddressFacade, CheckoutPaymentFacade } from '@spartacus/checkout/base/root';
import { CheckoutAdapter, CheckoutPaymentService } from '@spartacus/checkout/base/core';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;
import { FSCheckoutConfigService, FSCheckoutService } from '../../../../core';
import { FSPaymentTypeEnum, FSSteps } from '../../../../occ';
import { CheckoutPaymentTypeAdapter } from '@spartacus/checkout/b2b/core';
import { CardComponent, ICON_TYPE } from '@spartacus/storefront';
import { Component, Input } from '@angular/core';

const mockPaymentTypes = [
  {
    code: 'CARD',
  },
  {
    code: 'INVOICE',
  },
];
const mockPaymentDetails: PaymentDetails = {
  id: 'mock payment id',
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: {
    code: 'Visa',
    name: 'Visa',
  },
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123',
};

const mockPaymentDetailsState: QueryState<PaymentDetails | undefined> = {
  loading: false,
  error: false,
  data: {
    id: 'mock payment id',
    accountHolderName: 'Name',
    cardNumber: '123456789',
    cardType: {
      code: 'Visa',
      name: 'Visa',
    },
    expiryMonth: '01',
    expiryYear: '2022',
    cvn: '123',
  },
};

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_auto',
  step: 'category',
};

class MockCheckoutDeliveryAddressFacade {
  getDeliveryAddressState(): Observable<QueryState<Address | undefined>> {
    return of(null);
  }
}

class MockGlobalMessageService {
  add = createSpy();
}

class MockCheckoutPaymentService {
  setPaymentDetails = createSpy().and.returnValue(of());
  createPaymentDetails(_paymentDetails: PaymentDetails): Observable<unknown> {
    return of();
  }
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
  paymentProcessSuccess() {}
  getPaymentDetailsState(): Observable<QueryState<PaymentDetails | undefined>> {
    return of(mockPaymentDetailsState);
  }
}

class MockUserPaymentService {
  loadPaymentMethods(): void {}
  getPaymentMethods(): Observable<PaymentDetails[]> {
    return of();
  }
  getPaymentMethodsLoading(): Observable<boolean> {
    return of();
  }
}

class MockCheckoutService {
  loadPaymentTypes = createSpy();
  clearCheckoutStep = createSpy();
  setPaymentType = createSpy();
  getPaymentType(): Observable<string> {
    return of('invoice');
  }
  loadCheckoutDetails() {}
}

const mockCart: Cart = {
  code: 'test001',
};

class MockActiveCartService implements Partial<ActiveCartFacade> {
  isGuestCart(): Observable<boolean> {
    return of(false);
  }

  getActive() {
    return of(mockCart);
  }
}

class MockCheckoutPaymentTypeAdapter implements Partial<CheckoutPaymentTypeAdapter> {
  getPaymentTypes = createSpy().and.returnValue(of([]));
  setPaymentType = createSpy().and.returnValue(of({}));
}

class MockCheckoutStepService {
  next = createSpy();
  back = createSpy();
  getBackBntText(): string {
    return 'common.back';
  }
}

class MockFSTranslationService {
  getTranslationValue() {}
  translate() {
    return of('test translation');
  }
}

class MockRoutingService {
  go = createSpy();
}

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-method'],
  },
};

class MockCheckoutConfigService {
  getNextCheckoutStepUrl(): string {
    return '';
  }
}

class MockCheckoutPaymentTypeFacade {
  getSelectedPaymentTypeState() {
    return of({});
  }

  getPaymentTypes() {
    return of(mockPaymentTypes);
  }
}

@Component({
  selector: 'cx-payment-form',
  template: '',
})
class MockPaymentFormComponent {
  @Input()
  paymentMethodsCount: number;
  @Input()
  setAsDefaultField: boolean;
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockOrderAdapter implements Partial<CheckoutAdapter> {
  placeOrder = createSpy('CheckoutAdapter.placeOrder').and.callFake(
    (userId: string, cartId: string, termsChecked: boolean) =>
      of(`placedOrder-${userId}-${cartId}-${termsChecked}`)
  );
  getCheckoutDetails = createSpy(
    'CheckoutAdapter.loadCheckoutDetails'
  ).and.callFake((userId: string, cartId: string) =>
    of(`loadCheckoutDetails-${userId}-${cartId}`)
  );
}

describe('FSPaymentMethodComponent', () => {
  let component: FSPaymentMethodComponent;
  let fixture: ComponentFixture<FSPaymentMethodComponent>;
  let routingService: RoutingService;
  let checkoutService: FSCheckoutService;
  let paymentService: CheckoutPaymentTypeFacade;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [FSPaymentMethodComponent, MockPaymentFormComponent, CardComponent, MockSpinnerComponent, MockCxIconComponent],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        { provide: FSCheckoutService, useClass: MockCheckoutService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressFacade,
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
          provide: ActiveCartService,
          useClass: MockActiveCartService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: CheckoutPaymentTypeFacade,
          useClass: MockCheckoutPaymentTypeFacade,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: TranslationService,
          useClass: MockFSTranslationService,
        },
        {
          provide: CheckoutAdapter,
          useClass: MockOrderAdapter
        },
        {
          provide: CheckoutPaymentTypeAdapter,
          useClass: MockCheckoutPaymentTypeAdapter,
        },
      ],
    }).compileComponents();
    routingService = TestBed.inject(RoutingService);
    checkoutService = TestBed.inject(FSCheckoutService);
    paymentService = TestBed.inject(CheckoutPaymentTypeFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    expect(routingService.go).toHaveBeenCalled();
  });

  it('should changeType to INVOICE', () => {
    component.changeType('INVOICE');
    expect(checkoutService.setPaymentType).toHaveBeenCalled();
  });

  it('should not select payment method to invoice when code is invalid', () => {
    spyOn(component, 'selectPaymentMethod').and.callThrough();
    component.changeType('invalid');
    expect(component.selectPaymentMethod).not.toHaveBeenCalled();
  });

  it('test show navigation when payment cards do not exist', () => {
    const emptyPayment = {
      paymentDetails: {},
      paymentType: '',
    };
    expect(component.showNavigation([], false, emptyPayment)).toBe(true);
  });

  it('test show navigation when payment exist', () => {
    component.creditCard = FSPaymentTypeEnum.CARD;
    const existingPaymentCard = {
      content: {
        text: ['************5555', 'Expires 5/2025'],
      },
    };
    const newPayment = {
      paymentDetails: {
        accountHolderName: 'Test User',
        cardNumber: '************1111',
        cardType: {
          code: 'visa',
        },
      },
      paymentType: FSPaymentTypeEnum.CARD,
    };
    expect(
      component.showNavigation([existingPaymentCard], true, newPayment)
    ).toBe(false);
  });
});
