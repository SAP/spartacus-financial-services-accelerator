import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { of } from 'rxjs';
import { OrderDetailsService } from '@spartacus/order/components';
import { FSOrderDetailTotalsComponent } from './order-detail-totals.component';

const mockOrder: Order = {
  code: '1',
  paymentInfo: {
    accountHolderName: 'John Smith',
    cardNumber: '************6206',
    expiryMonth: '12',
    expiryYear: '2026',
    cardType: {
      name: 'Visa',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      line1: 'Buckingham Street 5',
      line2: '1A',
      phone: '(+11) 111 111 111',
      postalCode: 'MA8902',
      town: 'London',
      country: {
        isocode: 'UK',
      },
    },
  },
  created: new Date('2019-02-11T13:02:58+0000'),
};

describe('FSOrderDetailTotalsComponent', () => {
  let component: FSOrderDetailTotalsComponent;
  let fixture: ComponentFixture<FSOrderDetailTotalsComponent>;
  let mockOrderDetailsService: OrderDetailsService;

  beforeEach(
    waitForAsync(() => {
      mockOrderDetailsService = <OrderDetailsService>{
        getOrderDetails() {
          return of(mockOrder);
        },
      };

      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        providers: [
          { provide: OrderDetailsService, useValue: mockOrderDetailsService },
        ],
        declarations: [FSOrderDetailTotalsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSOrderDetailTotalsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ', () => {
    fixture.detectChanges();
    let order: Order;
    component.order$
      .subscribe(value => {
        order = value;
      })
      .unsubscribe();
    expect(order).toEqual(mockOrder);
  });
});
