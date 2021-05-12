import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutService } from '@spartacus/core';
import { OrderConfirmationMessageComponent } from './order-confirmation-message.component';

class MockCheckoutService {
  getOrderDetails() {}
}

describe('OrderConfirmationMessageComponent', () => {
  let component: OrderConfirmationMessageComponent;
  let fixture: ComponentFixture<OrderConfirmationMessageComponent>;
  let checkoutService: CheckoutService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderConfirmationMessageComponent],
        providers: [
          {
            provide: CheckoutService,
            useClass: MockCheckoutService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    checkoutService = TestBed.inject(CheckoutService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
