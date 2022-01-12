import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutStepService } from '@spartacus/checkout/components';
import { StoreModule } from '@ngrx/store';
import {
  ActivatedRoute,
  RouterModule,
  convertToParamMap,
} from '@angular/router';
import {
  CheckoutService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
} from '@spartacus/checkout/core';
import {
  TranslationService,
  UserPaymentService,
  PaymentDetails,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutPaymentFacade } from '@spartacus/checkout/root';
import { FSDigitalPaymentCreditCardComponent } from './digital-payment-credit-card.component';

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

class MockCheckoutService {}
class MockCheckoutDeliveryService {
  getDeliveryAddress(): Observable<PaymentDetails> {
    return of({});
  }
}
class MockCheckoutPaymentService {
  getPaymentDetails(): Observable<PaymentDetails> {
    return of(mockPaymentDetails);
  }
  setPaymentDetails() {}
}
class MockCheckoutPaymentFacade {}
class MockTranslationService {
  translate(): Observable<string> {
    return of('');
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
class MockCheckoutStepService {
  next() {}
  getBackBntText(): string {
    return '';
  }
}

const mockActivatedRoute = {
  snapshot: {
    queryParamMap: convertToParamMap({
      'x-card-registration-status': 'SUCCESSFUL',
    }),
  },
};

describe('FSDigitalPaymentCreditCardComponent', () => {
  let component: FSDigitalPaymentCreditCardComponent;
  let fixture: ComponentFixture<FSDigitalPaymentCreditCardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSDigitalPaymentCreditCardComponent],
      imports: [StoreModule.forRoot({}), RouterModule.forRoot([])],
      providers: [
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        {
          provide: FSDigitalPaymentCreditCardComponent,
          useClass: FSDigitalPaymentCreditCardComponent,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: CheckoutService,
          useClass: MockCheckoutService,
        },
        {
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentFacade,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FSDigitalPaymentCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call isDpCallback', () => {
    var result = component.isDpCallback();
    expect(result).toEqual(true);
  });
  it('should call paymentDetailsAdded', () => {
    spyOn(component, 'selectPaymentMethod').and.callThrough();
    spyOn(component, 'next').and.callThrough();
    component.paymentDetailsAdded(mockPaymentDetails);
    expect(component.selectPaymentMethod).toHaveBeenCalledWith(
      mockPaymentDetails
    );
    expect(component.next).toHaveBeenCalled();
  });
  it('should call hideCallbackScreen', () => {
    component.hideCallbackScreen();
    expect(component.showCallbackScreen).toBe(false);
  });
});
