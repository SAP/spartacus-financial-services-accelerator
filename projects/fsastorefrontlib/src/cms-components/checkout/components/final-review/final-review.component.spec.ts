import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutPaymentService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { CheckoutConfigService } from '@spartacus/storefront';
import { FSCheckoutService } from './../../../../core/checkout/facade/checkout.service';
import { FSCheckoutConfigService } from './../../../../core/checkout/services/checkout-config.service';
import { FinalReviewComponent } from './final-review.component';

class MockCheckoutService {
  mockDeliveryMode() {}
  placeOrder() {}
}

class MockCheckoutPaymentService {
  getPaymentDetails() {}
}

class MockRoutingService {
  go() {}
}

class MockCheckoutConfigService {
  getNextCheckoutStepUrl() {}
}

class MockActivatedRoute {}

describe('FinalReviewComponent', () => {
  let component: FinalReviewComponent;
  let fixture: ComponentFixture<FinalReviewComponent>;
  let checkoutService: FSCheckoutService;
  let checkoutPaymentService: CheckoutPaymentService;
  let routingService: RoutingService;
  let checkoutConfigService: CheckoutConfigService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [FinalReviewComponent],
      providers: [
        {
          provide: FSCheckoutService,
          useClass: MockCheckoutService,
        },
        {
          provide: CheckoutPaymentService,
          useClass: MockCheckoutPaymentService,
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
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    checkoutService = TestBed.get(FSCheckoutService as Type<FSCheckoutService>);
    spyOn(checkoutService, 'mockDeliveryMode').and.callThrough();
    spyOn(checkoutService, 'placeOrder').and.callThrough();

    checkoutConfigService = TestBed.get(
      FSCheckoutConfigService as Type<FSCheckoutConfigService>
    );
    spyOn(checkoutConfigService, 'getNextCheckoutStepUrl').and.callThrough();

    checkoutPaymentService = TestBed.get(
      CheckoutPaymentService as Type<CheckoutPaymentService>
    );
    spyOn(checkoutPaymentService, 'getPaymentDetails').and.callThrough();

    routingService = TestBed.get(RoutingService as Type<RoutingService>);
    spyOn(routingService, 'go').and.callThrough();

    spyOn(component.goToQuoteReview, 'emit').and.stub();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    component.toggleTAndC();
    expect(component.tAndCToggler).toEqual(true);
  });

  it('should call edit', () => {
    component.edit();
    expect(component.goToQuoteReview.emit).toHaveBeenCalled();
  });

  it('should place order', () => {
    component.placeOrder();
    expect(checkoutService.placeOrder).toHaveBeenCalled();
    expect(checkoutService.orderPlaced).toEqual(true);
    expect(routingService.go).toHaveBeenCalled();
  });
});
