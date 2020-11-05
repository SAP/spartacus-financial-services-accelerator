import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FSPaymentMethodComponent } from './payment-method.component';
import {
  UserPaymentService,
  CheckoutService,
  CheckoutDeliveryService,
  ActiveCartService,
  CheckoutPaymentService,
  GlobalMessageService,
  PaymentDetails,
  TranslationService,
  RoutingService,
} from '@spartacus/core';
import { CheckoutStepService, ICON_TYPE } from '@spartacus/storefront';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import createSpy = jasmine.createSpy;
import { Observable, of } from 'rxjs';
import { FSCheckoutConfigService, FSSteps } from '@fsa/storefront';

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

class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

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
}

class MockActiveCartService {
  isGuestCart(): boolean {
    return false;
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

describe('FSPaymentMethodComponent', () => {
  let component: FSPaymentMethodComponent;
  let fixture: ComponentFixture<FSPaymentMethodComponent>;
  let routingService: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSPaymentMethodComponent],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        { provide: CheckoutService, useClass: MockCheckoutService },
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
});
