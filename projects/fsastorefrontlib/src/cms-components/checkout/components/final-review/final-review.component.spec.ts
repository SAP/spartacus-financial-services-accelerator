import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  // CheckoutPaymentService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { CheckoutPaymentFacade } from '@spartacus/checkout/root';
import { FSCheckoutService } from './../../../../core/checkout/facade/checkout.service';
import { FinalReviewComponent } from './final-review.component';
import { of } from 'rxjs';

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}
class MockCheckoutService {
  mockDeliveryMode() {}
  placeOrder() {}
}

class MockCheckoutPaymentFacade {
  getPaymentDetails() {
    return of({});
  }
}

class MockRoutingService {
  go() {}
  getRouterState() {}
}

describe('FinalReviewComponent', () => {
  let component: FinalReviewComponent;
  let fixture: ComponentFixture<FinalReviewComponent>;
  let checkoutService: FSCheckoutService;
  let checkoutPaymentService: CheckoutPaymentFacade;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [FinalReviewComponent, MockUrlPipe],
        providers: [
          {
            provide: FSCheckoutService,
            useClass: MockCheckoutService,
          },
          {
            provide: CheckoutPaymentFacade,
            useClass: MockCheckoutPaymentFacade,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    checkoutService = TestBed.inject(FSCheckoutService);
    spyOn(checkoutService, 'mockDeliveryMode').and.callThrough();
    spyOn(checkoutService, 'placeOrder').and.callThrough();

    checkoutPaymentService = TestBed.inject(CheckoutPaymentFacade);
    spyOn(checkoutPaymentService, 'getPaymentDetails').and.callThrough();

    routingService = TestBed.inject(RoutingService);
    spyOn(routingService, 'go').and.callThrough();
    spyOn(routingService, 'getRouterState').and.callThrough();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    component.toggleTAndC();
    expect(component.tAndCToggler).toEqual(true);
  });

  it('should place order', () => {
    component.placeOrder();
    expect(checkoutService.placeOrder).toHaveBeenCalled();
    expect(checkoutService.orderPlaced).toEqual(true);
    expect(routingService.go).toHaveBeenCalled();
  });
});
