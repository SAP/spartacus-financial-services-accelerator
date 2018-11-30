import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RoutingService } from '@spartacus/core';

import { BehaviorSubject } from 'rxjs';

import createSpy = jasmine.createSpy;

import { CheckoutService } from './../../../facade/checkout.service';
import { Address } from '../../../models/address-model';
import { CartDataService } from './../../../../cart/facade/cart-data.service';
import { CartService } from './../../../../cart/facade/cart.service';
import { GlobalMessageService } from '../../../../global-message/facade/global-message.service';

import { MultiStepCheckoutComponent } from './multi-step-checkout.component';

const mockAddress: Address = {
  id: 'mock address id',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' }
};
const mockPaymentDetails = {
  id: 'mock payment id',
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123'
};
const mockDeliveryAddresses = ['address1', 'address2'];
const mockSelectedCode = 'test mode';
const mockOrderDetails = { id: '1234' };

@Component({ selector: 'cx-delivery-mode', template: '' })
class MockDeliveryModeComponent {
  @Input()
  selectedShippingMethod;
}

@Component({ selector: 'cx-payment-method', template: '' })
class MockPaymentMethodComponent {
  @Input()
  selectedPayment;
}

@Component({ selector: 'cx-review-submit', template: '' })
class MockReviewSubmitComponent {
  @Input()
  deliveryAddress;
  @Input()
  shippingMethod;
  @Input()
  paymentDetails;
}

@Component({ selector: 'cx-shipping-address', template: '' })
class MockShippingAddressComponent {
  @Input()
  selectedAddress;
}

@Component({ selector: 'cx-order-summary', template: '' })
class MockOrderSummaryComponent {
  @Input()
  cart: any;
}

describe('MultiStepCheckoutComponent', () => {
  let component: MultiStepCheckoutComponent;
  let fixture: ComponentFixture<MultiStepCheckoutComponent>;

  let mockCheckoutService: any;
  let mockCartService: any;
  let mockCartDataService: any;
  let mockRoutingService: any;
  let mockGlobalMessageService: any;

  const mockAllSteps = () => {
    mockCheckoutService.deliveryAddress$.next(mockDeliveryAddresses);
    mockCheckoutService.selectedDeliveryModeCode$.next(mockSelectedCode);
    mockCheckoutService.paymentDetails$.next(mockPaymentDetails);
    mockCheckoutService.orderDetails$.next(mockOrderDetails);
  };

  beforeEach(async(() => {
    mockCheckoutService = {
      deliveryAddress$: new BehaviorSubject({}),
      selectedDeliveryModeCode$: new BehaviorSubject(''),
      paymentDetails$: new BehaviorSubject({}),
      orderDetails$: new BehaviorSubject({}),
      clearCheckoutData: createSpy(),
      createAndSetAddress: createSpy(),
      setDeliveryAddress: createSpy(),
      setDeliveryMode: createSpy(),
      createPaymentDetails: createSpy(),
      setPaymentDetails: createSpy(),
      placeOrder: createSpy()
    };
    mockCartService = {
      activeCart$: new BehaviorSubject({}),
      loadCartDetails: createSpy()
    };
    mockCartDataService = {
      getDetails: false
    };
    mockRoutingService = {
      go: createSpy()
    };
    mockGlobalMessageService = {
      add: createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [
        MultiStepCheckoutComponent,
        MockDeliveryModeComponent,
        MockPaymentMethodComponent,
        MockReviewSubmitComponent,
        MockShippingAddressComponent,
        MockOrderSummaryComponent
      ],
      providers: [
        { provide: CheckoutService, useValue: mockCheckoutService },
        { provide: CartService, useValue: mockCartService },
        { provide: CartDataService, useValue: mockCartDataService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: RoutingService, useValue: mockRoutingService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepCheckoutComponent);
    component = fixture.componentInstance;

    spyOn(component, 'addAddress').and.callThrough();
    spyOn(component, 'nextStep').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit() before process steps', () => {
    const mockCartData = {};
    mockCartService.activeCart$.next(mockCartData);
    component.ngOnInit();
    expect(component.step).toEqual(1);
    expect(mockCartService.loadCartDetails).toHaveBeenCalled();
  });

  it('should call processSteps() to process step 1: set delivery address', () => {
    mockCheckoutService.deliveryAddress$.next(mockDeliveryAddresses);

    component.processSteps();
    expect(component.nextStep).toHaveBeenCalledWith(2);
  });

  it('should call processSteps() to process step 2: select delivery mode', () => {
    mockCheckoutService.deliveryAddress$.next(mockDeliveryAddresses);
    mockCheckoutService.selectedDeliveryModeCode$.next(mockSelectedCode);

    component.processSteps();
    expect(component.nextStep).toHaveBeenCalledWith(3);
  });

  it('should call processSteps() to process step 3: set payment info', () => {
    mockCheckoutService.deliveryAddress$.next(mockDeliveryAddresses);
    mockCheckoutService.selectedDeliveryModeCode$.next(mockSelectedCode);
    mockCheckoutService.paymentDetails$.next(mockPaymentDetails);

    component.processSteps();
    expect(component.nextStep).toHaveBeenCalledWith(4);
  });

  it('should call processSteps() to process step 4: place order', () => {
    mockCheckoutService.deliveryAddress$.next(mockDeliveryAddresses);
    mockCheckoutService.selectedDeliveryModeCode$.next(mockSelectedCode);
    mockCheckoutService.paymentDetails$.next(mockPaymentDetails);
    mockCheckoutService.orderDetails$.next(mockOrderDetails);

    component.processSteps();
    expect(mockRoutingService.go).toHaveBeenCalledWith(['orderConfirmation']);
  });

  it('should call setStep()', () => {
    component.setStep(2);
    expect(component.nextStep).toHaveBeenCalledWith(2);
  });

  it('should call nextStep()', () => {
    // next step is 3
    component.nextStep(3);
    // previous 2 steps are complete
    expect(component.navs[0].status.completed).toBeTruthy();
    expect(component.navs[1].status.completed).toBeTruthy();
    // step3 is active, and enabled, progress bar is on
    expect(component.navs[2].status.active).toBeTruthy();
    expect(component.navs[2].status.disabled).toBeFalsy();
    expect(component.navs[2].progressBar).toBeTruthy();
    // except step3, other steps are not active
    // step1, progress bar is on
    expect(component.navs[0].status.active).toBeFalsy();
    expect(component.navs[0].progressBar).toBeTruthy();
    // step2, progress bar is on
    expect(component.navs[1].status.active).toBeFalsy();
    expect(component.navs[1].progressBar).toBeTruthy();
    // step4, progress bar is off
    expect(component.navs[3].status.active).toBeFalsy();
    expect(component.navs[3].progressBar).toBeFalsy();
  });

  it('should call addAddress() with new created address', () => {
    component.addAddress({ address: mockAddress, newAddress: true });
    expect(mockCheckoutService.createAndSetAddress).toHaveBeenCalledWith(
      mockAddress
    );
  });

  it('should call addAddress() with address selected from existing addresses', () => {
    component.addAddress({ address: mockAddress, newAddress: false });
    expect(mockCheckoutService.createAndSetAddress).not.toHaveBeenCalledWith(
      mockAddress
    );
    expect(mockCheckoutService.setDeliveryAddress).toHaveBeenCalledWith(
      mockAddress
    );
  });

  it('should call addAddress() with address already set to the cart, then go to next step direclty', () => {
    component.deliveryAddress = mockAddress;
    component.addAddress({ address: mockAddress, newAddress: false });

    expect(component.nextStep).toHaveBeenCalledWith(2);
    expect(mockCheckoutService.setDeliveryAddress).not.toHaveBeenCalledWith(
      mockAddress
    );
  });

  it('should call setDeliveryMode()', () => {
    const deliveryMode: any = {
      deliveryModeId: 'testId'
    };
    component.setDeliveryMode(deliveryMode);
    expect(mockCheckoutService.setDeliveryMode).toHaveBeenCalledWith(
      deliveryMode.deliveryModeId
    );
  });

  it('should call setDeliveryMode() with the delivery mode already set to cart, go to next step directly', () => {
    const deliveryMode: any = {
      deliveryModeId: 'testId'
    };
    component.shippingMethod = 'testId';
    component.setDeliveryMode(deliveryMode);

    expect(component.nextStep).toHaveBeenCalledWith(3);
    expect(mockCheckoutService.setDeliveryMode).not.toHaveBeenCalledWith(
      deliveryMode.deliveryModeId
    );
  });

  it('should call addPaymentInfo() with new created payment info', () => {
    component.deliveryAddress = mockAddress;
    component.addPaymentInfo({ payment: mockPaymentDetails, newPayment: true });
    expect(mockCheckoutService.createPaymentDetails).toHaveBeenCalledWith(
      mockPaymentDetails
    );
  });

  it('should call addPaymentInfo() with paymenent selected from existing ones', () => {
    component.deliveryAddress = mockAddress;
    component.addPaymentInfo({
      payment: mockPaymentDetails,
      newPayment: false
    });
    expect(mockCheckoutService.createPaymentDetails).not.toHaveBeenCalledWith(
      mockPaymentDetails
    );
    expect(mockCheckoutService.setPaymentDetails).toHaveBeenCalledWith(
      mockPaymentDetails
    );
  });

  it('should call addPaymentInfo() with paymenent already set to cart, then go to next step direclty', () => {
    component.paymentDetails = mockPaymentDetails;
    component.deliveryAddress = mockAddress;
    component.addPaymentInfo({
      payment: mockPaymentDetails,
      newPayment: false
    });
    expect(component.nextStep).toHaveBeenCalledWith(4);
    expect(mockCheckoutService.setPaymentDetails).not.toHaveBeenCalledWith(
      mockPaymentDetails
    );
  });

  it('should call placeOrder()', () => {
    component.placeOrder();
    expect(mockCheckoutService.placeOrder).toHaveBeenCalled();
  });

  it('should call toggleTAndC(toggle)', () => {
    expect(component.tAndCToggler).toBeFalsy();
    component.toggleTAndC();
    expect(component.tAndCToggler).toBeTruthy();
    component.toggleTAndC();
    expect(component.tAndCToggler).toBeFalsy();
  });

  it('should contain proper total value and total items', () => {
    const mockCartData = {
      totalItems: 5141,
      subTotal: { formattedValue: 11119 }
    };

    mockCartService.activeCart$.next(mockCartData);
    fixture.detectChanges();

    const pageTitle = fixture.debugElement.query(By.css('.cx-page__title'))
      .nativeElement.textContent;
    const values = fixture.debugElement.query(
      By.css('.cx-multi-step-checkout__nav-list--media')
    ).nativeElement.textContent;

    expect(pageTitle).toContain('5141');
    expect(values).toContain('5141');
    expect(values).toContain('11119');
  });

  it('should highlight proper step', () => {
    fixture.detectChanges();
    const steps = fixture.debugElement.queryAll(
      By.css('.cx-multi-step-checkout__nav-item a')
    );
    steps[0].nativeElement.click();
    fixture.detectChanges();

    expect(steps[0].nativeElement.getAttribute('class')).toContain('is-active');
    expect(steps[1].nativeElement.getAttribute('class')).not.toContain(
      'is-active'
    );
  });

  it('should show terms and conditions only on step 4', () => {
    component.ngOnInit();

    const getPlaceOrderForm = () =>
      fixture.debugElement.query(
        By.css('.cx-multi-step-checkout__place-order-form')
      );

    expect(getPlaceOrderForm()).toBeFalsy();

    mockAllSteps();
    expect(getPlaceOrderForm()).toBeTruthy();
  });

  it('should call setStep(3) when back button clicked', () => {
    spyOn(component, 'setStep').and.callThrough();
    mockAllSteps();
    fixture.detectChanges();

    const getBackBtn = () =>
      fixture.debugElement.query(
        By.css('.cx-multi-step-checkout__place-order .btn-action')
      ).nativeElement;
    getBackBtn().click();
    expect(component.setStep).toHaveBeenCalledWith(3);
  });

  it('should contain disabled place order button if terms not accepted', () => {
    mockAllSteps();
    fixture.detectChanges();

    const getPlaceOrderBtn = () =>
      fixture.debugElement.query(
        By.css('.cx-multi-step-checkout__place-order .btn-primary')
      ).nativeElement;
    expect(getPlaceOrderBtn().disabled).toBe(true);
  });

  it('should contain enabled place order button if terms accepted', () => {
    mockAllSteps();
    component.ngOnInit();

    const inputCheckbox = fixture.debugElement.query(
      By.css('.cx-multi-step-checkout__place-order-form .form-check-input')
    ).nativeElement;
    inputCheckbox.click();
    fixture.detectChanges();

    const getPlaceOrderBtn = () =>
      fixture.debugElement.query(
        By.css('.cx-multi-step-checkout__place-order .btn-primary')
      ).nativeElement;
    expect(getPlaceOrderBtn().disabled).toBe(false);
  });
});
