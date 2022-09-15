import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutFacade } from '@spartacus/checkout/root';
import { OrderConfirmationMessageComponent } from './order-confirmation-message.component';

class MockCheckoutFacade {
  getOrderDetails() {}
}

describe('OrderConfirmationMessageComponent', () => {
  let component: OrderConfirmationMessageComponent;
  let fixture: ComponentFixture<OrderConfirmationMessageComponent>;
  let checkoutService: CheckoutFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderConfirmationMessageComponent],
        providers: [
          {
            provide: CheckoutFacade,
            useClass: MockCheckoutFacade,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    checkoutService = TestBed.inject(CheckoutFacade);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
