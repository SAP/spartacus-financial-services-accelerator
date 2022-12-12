import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFacade } from '@spartacus/order/root';
import { OrderConfirmationMessageComponent } from './order-confirmation-message.component';

class MockCheckoutFacade {
  getOrderDetails() {}
}

describe('OrderConfirmationMessageComponent', () => {
  let component: OrderConfirmationMessageComponent;
  let fixture: ComponentFixture<OrderConfirmationMessageComponent>;
  let orderFacade: OrderFacade;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderConfirmationMessageComponent],
        providers: [
          {
            provide: OrderFacade,
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
    orderFacade = TestBed.inject(OrderFacade);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
