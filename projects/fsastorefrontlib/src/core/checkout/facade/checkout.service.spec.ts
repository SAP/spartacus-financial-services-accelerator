import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  CheckoutDeliveryService,
  CHECKOUT_FEATURE,
  OCC_USER_ID_CURRENT,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { FSStateWithCheckout } from '../store';
import * as fromFSAction from '../store/actions/index';
import * as fromReducers from './../store/reducers/index';
import { FSCheckoutService } from './checkout.service';

const identificationType = 'idType';

const userId = 'userId';
const paymentType = 'paymentCode';

class CheckoutDeliveryServiceStub {
  setDeliveryMode() {}
}
class MockUserIdService {
  getUserId(): Observable<string> {
    return of(OCC_USER_ID_CURRENT);
  }
}

class MockActiveCartService {
  getActiveCartId(): Observable<string> {
    return of('cartId');
  }
}

describe('FSCheckoutServiceTest', () => {
  let service: FSCheckoutService;
  let store: Store<FSStateWithCheckout>;
  let checkoutDeliveryService: CheckoutDeliveryService;
  let userIdService: UserIdService;
  let cartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(CHECKOUT_FEATURE, fromReducers.getReducers()),
      ],
      providers: [
        FSCheckoutService,
        {
          provide: CheckoutDeliveryService,
          useClass: CheckoutDeliveryServiceStub,
        },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
      ],
    });
    service = TestBed.inject(FSCheckoutService);
    checkoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
    store = TestBed.inject(Store);
    userIdService = TestBed.inject(UserIdService);
    cartService = TestBed.inject(ActiveCartService);
    spyOn(checkoutDeliveryService, 'setDeliveryMode').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if FSCheckoutService is injected', inject(
    [FSCheckoutService],
    (fsCheckoutService: FSCheckoutService) => {
      expect(fsCheckoutService).toBeTruthy();
    }
  ));

  it('should set identification type', () => {
    service.setIdentificationType(identificationType);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFSAction.SetIdentificationType({
        identificationType: identificationType,
        cartId: 'cartId',
        userId: OCC_USER_ID_CURRENT,
      })
    );
  });

  it('should set payment type', () => {
    service.setPaymentType(paymentType);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFSAction.SetPaymentTypeSuccess({
        code: paymentType,
      })
    );
  });

  it('should get payment type', () => {
    service.setPaymentType(paymentType);
    let response;
    service
      .getPaymentType()
      .subscribe(payment => {
        response = payment;
      })
      .unsubscribe();
    expect(response).toEqual(paymentType);
  });

  it('should mock delivery mode', () => {
    service.mockDeliveryMode();
    expect(checkoutDeliveryService.setDeliveryMode).toHaveBeenCalled();
  });

  it('should filter out entries with removeable poperty set to true', () => {
    const mockCart: any = {
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'UNBIND',
        },
        quoteWorkflowStatus: {
          code: 'APPROVED',
        },
      },
      deliveryOrderGroups: [
        {
          entries: [
            {},
            {
              removeable: false,
            },
            {
              removeable: true,
            },
          ],
        },
      ],
    };
    const result = service.filterRemoveableEntries(mockCart);
    expect(result.length).toEqual(1);
  });

  it(' filterRemoveableEntries should not return anything if etries are empty', () => {
    const mockCart: any = {
      code: 'cartCode',
      insuranceQuote: {
        state: {
          code: 'UNBIND',
        },
        quoteWorkflowStatus: {
          code: 'APPROVED',
        },
      },
      deliveryOrderGroups: [
        {
          entries: [],
        },
      ],
    };
    const result = service.filterRemoveableEntries(mockCart);
    expect(result).toEqual(undefined);
  });
});
