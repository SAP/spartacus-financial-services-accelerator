import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Component } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

import { CheckoutService } from '../../../facade/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
import { UserService } from '../../../../user/facade/user.service';
import { ReviewSubmitComponent } from './review-submit.component';

const mockCart = {
  guid: 'test',
  code: 'test',
  totalItems: 123,
  subTotal: { formattedValue: '$999.98' },
  potentialProductPromotions: ['promotion 1', 'promotion 2']
};

const mockDeliveryAddress = {
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

const mockShippingMethod = 'standard-gross';

const mockPaymentDetails = {
  accountHolderName: 'Name',
  cardNumber: '123456789',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '2022',
  cvn: '123'
};

const mockEntries = ['cart entry 1', 'cart entry 2'];

@Component({
  selector: 'cx-cart-item-list',
  template: ''
})
class MockCartItemListComponent {
  @Input()
  items;
  @Input()
  isReadOnly;
  @Input()
  potentialProductPromotions;
}

@Component({
  selector: 'cx-card',
  template: ''
})
class MockCardComponent {
  @Input()
  content;
}

describe('ReviewSubmitComponent', () => {
  let component: ReviewSubmitComponent;
  let fixture: ComponentFixture<ReviewSubmitComponent>;

  let mockCheckoutService: any;
  let mockUserService: any;
  let mockCartService: any;

  beforeEach(async(() => {
    mockUserService = {
      getCountry: createSpy().and.returnValue(of(null)),
      loadDeliveryCountries: createSpy()
    };
    mockCheckoutService = {
      selectedDeliveryMode$: new BehaviorSubject(null),
      loadSupportedDeliveryModes: createSpy()
    };
    mockCartService = {
      activeCart$: new BehaviorSubject(null),
      entries$: new BehaviorSubject(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        ReviewSubmitComponent,
        MockCartItemListComponent,
        MockCardComponent
      ],
      providers: [
        { provide: CheckoutService, useValue: mockCheckoutService },
        { provide: UserService, useValue: mockUserService },
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSubmitComponent);
    component = fixture.componentInstance;

    component.deliveryAddress = mockDeliveryAddress;
    component.shippingMethod = mockShippingMethod;
    component.paymentDetails = mockPaymentDetails;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get cart, entry, delivery mode, country name if they exists', () => {
    mockCartService.activeCart$.next({});
    mockCartService.entries$.next([]);
    mockCheckoutService.selectedDeliveryMode$.next('mockMode');
    mockUserService.getCountry.and.returnValue(of('mockCountryName'));

    component.ngOnInit();
    let mode;
    component.deliveryMode$.subscribe(data => (mode = data));
    expect(mode).toEqual('mockMode');

    let countryName;
    component.countryName$.subscribe(data => (countryName = data));
    expect(countryName).toEqual('mockCountryName');
  });

  it('should call ngOnInit to get delivery mode if it does not exists', done => {
    mockCartService.activeCart$.next({});
    mockCartService.entries$.next([]);
    mockCheckoutService.selectedDeliveryMode$.next(null);
    mockUserService.getCountry.and.returnValue(of(null));

    component.ngOnInit();
    component.deliveryMode$.subscribe(() => {
      expect(mockCheckoutService.loadSupportedDeliveryModes).toHaveBeenCalled();
      done();
    });
    component.countryName$.subscribe(() => {
      expect(mockUserService.loadDeliveryCountries).toHaveBeenCalled();
      done();
    });
  });

  it('should call getShippingAddressCard(countryName) to get address card data', () => {
    const card = component.getShippingAddressCard('Canada');
    expect(card.title).toEqual('Ship To');
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, Canada',
      'zip',
      undefined
    ]);
  });

  it('should call getShippingMethodCard(deliveryMode) to get shipping method card data', () => {
    const selectedMode = {
      code: 'standard-gross',
      description: 'Standard Delivery description'
    };
    const card = component.getShippingMethodCard(selectedMode);
    expect(card.title).toEqual('Shipping Method');
    expect(card.textBold).toEqual('standard-gross');
    expect(card.text).toEqual(['Standard Delivery description']);
  });

  it('should call getPaymentMethodCard() to get payment card data', () => {
    const card = component.getPaymentMethodCard();
    expect(card.title).toEqual('Payment');
    expect(card.textBold).toEqual('Name');
    expect(card.text).toEqual(['123456789', 'Expires: 01/2022']);
  });

  describe('UI cart total section', () => {
    const getCartTotalText = () =>
      fixture.debugElement.query(By.css('.cx-review__cart-total')).nativeElement
        .textContent;

    beforeEach(() => {
      mockCartService.activeCart$.next(mockCart);
      mockCartService.entries$.next([]);
      fixture.detectChanges();
    });

    it('should contain total number of items', () => {
      expect(getCartTotalText()).toContain(123);
    });

    it('should contain total price', () => {
      expect(getCartTotalText()).toContain('$999.98');
    });
  });

  describe('child cx-card component of shipping address', () => {
    const getShippingAddressCardContent = () =>
      fixture.debugElement.query(
        By.css('.cx-review__summary-card__address cx-card')
      ).componentInstance.content;

    it('should receive content attribute with shipping address', () => {
      const mockShippingAdddressCardData = 'test shipping address';
      spyOn(component, 'getShippingAddressCard').and.returnValue(
        mockShippingAdddressCardData
      );
      fixture.detectChanges();
      expect(getShippingAddressCardContent()).toBe(
        mockShippingAdddressCardData
      );
    });
  });

  describe('child cx-card component of shipping method', () => {
    const getShippingMethodCardContent = () =>
      fixture.debugElement.query(
        By.css('.cx-review__summary-card__shipping-method cx-card')
      ).componentInstance.content;

    it('should receive content attribute with shipping method', () => {
      const mockShippingMethodCardData = 'test shipping method';
      spyOn(component, 'getShippingMethodCard').and.returnValue(
        mockShippingMethodCardData
      );
      fixture.detectChanges();
      expect(getShippingMethodCardContent()).toBe(mockShippingMethodCardData);
    });
  });

  describe('child cx-card component of payment method', () => {
    const getPaymentMethodCardContent = () =>
      fixture.debugElement.query(
        By.css('.cx-review__summary-card__payment-method cx-card')
      ).componentInstance;

    it('should receive content attribute with payment method', () => {
      const mockPaymentMethodCardData = 'test payment method';
      spyOn(component, 'getPaymentMethodCard').and.returnValue(
        mockPaymentMethodCardData
      );
      fixture.detectChanges();
      expect(getPaymentMethodCardContent().content).toBe(
        mockPaymentMethodCardData
      );
    });
  });

  describe('child cx-cart-item-list component', () => {
    const getCartItemList = () =>
      fixture.debugElement.query(By.css('cx-cart-item-list')).componentInstance;

    it('should receive items attribute with cart entires', () => {
      mockCartService.activeCart$.next(mockCart);
      mockCartService.entries$.next(mockEntries);
      fixture.detectChanges();
      expect(getCartItemList().items).toEqual(['cart entry 1', 'cart entry 2']);
      expect(getCartItemList().isReadOnly).toBe(true);
    });

    it('should receive potentialProductPromotions attribute with potential product promotions of cart', () => {
      mockCartService.activeCart$.next(mockCart);
      mockCartService.entries$.next(mockEntries);

      fixture.detectChanges();
      expect(getCartItemList().potentialProductPromotions).toEqual([
        'promotion 1',
        'promotion 2'
      ]);
    });
  });
});
