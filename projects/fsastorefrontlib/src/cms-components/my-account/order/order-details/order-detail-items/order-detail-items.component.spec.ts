import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { OrderDetailsService } from '@spartacus/order/components'
import { of } from 'rxjs';
import { FSOrderDetailItemsComponent } from './order-detail-items.component';

const mockProduct = { product: { code: 'test' } };

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
  consignments: [
    {
      code: 'a00000341',
      status: 'READY',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: {}, quantity: 1, shippedQuantity: 1 }],
    },
    {
      code: 'a00000343',
      status: 'DELIVERY_COMPLETED',
      statusDate: new Date('2019-02-11T13:05:12+0000'),
      entries: [{ orderEntry: mockProduct, quantity: 1, shippedQuantity: 4 }],
    },
  ],
};

describe('FSOrderDetailItemsComponent', () => {
  let component: FSOrderDetailItemsComponent;
  let fixture: ComponentFixture<FSOrderDetailItemsComponent>;
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
        declarations: [FSOrderDetailItemsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSOrderDetailItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize order ', () => {
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
