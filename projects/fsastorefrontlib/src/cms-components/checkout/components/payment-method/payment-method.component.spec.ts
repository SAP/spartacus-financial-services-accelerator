import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FSPaymentMethodComponent } from './payment-method.component';
import {
  ActiveCartService,
  Cart,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  GlobalMessageService,
  PaymentDetails,
  PaymentTypeService,
  RoutingService,
  TranslationService,
  UserPaymentService,
} from '@spartacus/core';
import { CheckoutStepService } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;
import { FSCheckoutConfigService, FSCheckoutService } from '../../../../core';
import { FSSteps } from '../../../../occ';

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

const mockCategoryAndStep: FSSteps = {
  stepParameter: 'insurances_auto',
  step: 'category',
};

class MockCheckoutDeliveryService {
  getDeliveryAddress(): Observable<PaymentDetails> {
    return of(null);
  }
}

class MockGlobalMessageService {
  add = createSpy();
}

class MockCheckoutPaymentService {
  setPaymentDetails = createSpy();
  createPaymentDetails = createSpy();
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
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

class MockActiveCartService {
  isGuestCart(): boolean {
    return false;
  }
  getActive() {
    return of(mockCart);
  }
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

class MockPaymentTypeService {
  loadPaymentTypes = createSpy();
  getSelectedPaymentType() {
    return of({});
  }

  getPaymentTypes() {
    return of([{}]);
  }
}

describe('FSPaymentMethodComponent', () => {
  let component: FSPaymentMethodComponent;
  let fixture: ComponentFixture<FSPaymentMethodComponent>;
  let routingService: RoutingService;
  let checkoutService: FSCheckoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSPaymentMethodComponent],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        { provide: FSCheckoutService, useClass: MockCheckoutService },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
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
          provide: PaymentTypeService,
          useClass: MockPaymentTypeService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: CheckoutStepService, useClass: MockCheckoutStepService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: TranslationService,
          useClass: MockFSTranslationService,
        },
      ],
    }).compileComponents();
    routingService = TestBed.inject(RoutingService);
    checkoutService = TestBed.inject(FSCheckoutService);
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

  it('should changeType', () => {
    component.changeType('invoice');
    expect(checkoutService.setPaymentType).toHaveBeenCalled();
  });
});
