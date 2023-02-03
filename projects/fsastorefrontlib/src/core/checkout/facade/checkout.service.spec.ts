import { inject, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  OCC_USER_ID_CURRENT,
  RoutingService,
  UserIdService,
} from '@spartacus/core';
import { ActiveCartService } from '@spartacus/cart/base/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import * as fromFSAction from '../store/actions/index';
import * as fromAction from '../store/actions';
import * as fromReducers from './../store/reducers/index';
import { FSCheckoutService } from './checkout.service';
import { FSCheckoutStep } from '../../../occ/occ-models/occ.models';
import { FSCheckoutConfigService } from '../../../core/checkout/services/checkout-config.service';

import createSpy = jasmine.createSpy;
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { StateWithFSCheckout } from '../store/checkout-state';
import { OccOrderAdapter } from '@spartacus/order/occ';
import { OrderAdapter } from '@spartacus/order/core';
import { Order } from '@spartacus/order/root';

const activeCartCode = 'testCartCode';
const fsCheckout = 'fscheckout';
const identificationType = 'idType';
const paymentType = 'paymentCode';
const mockInitialStep: FSCheckoutStep = {
  id: 'chooseCoverStep',
  routeName: 'generalInformation',
  name: 'Mock initial step',
  type: [],
};
const mockProduct = {
  code: 'testProduct',
  defaultCategory: {
    code: 'testCategory',
  },
};

const mockOrder = {
  code: 'testOrder',
  entries: [
    {
      entryNumber: 1,
      product: mockProduct,
    },
  ],
};

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
class MockCheckoutConfigService {
  getInitialStepForCategory(): FSCheckoutStep {
    return mockInitialStep;
  }
}
class MockRoutingService {
  go = createSpy();
}

class MockOrderAdapter {
  placeOrder(): Observable<Order> {
    return of(mockOrder);
  }
}

describe('FSCheckoutService', () => {
  let service: FSCheckoutService;
  let store: Store<StateWithFSCheckout>;
  let checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
  let userIdService: UserIdService;
  let activeCartService: ActiveCartService;
  let checkoutConfigService: FSCheckoutConfigService;
  let routingService: RoutingService;
  let orderAdapter: OrderAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(fsCheckout, fromReducers.getReducers()),
      ],
      providers: [
        FSCheckoutService,
        {
          provide: CheckoutDeliveryModesFacade,
          useClass: CheckoutDeliveryServiceStub,
        },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: FSCheckoutConfigService,
          useClass: MockCheckoutConfigService,
        },
        {
          provide: OrderAdapter,
          useClass: MockOrderAdapter,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });
    service = TestBed.inject(FSCheckoutService);
    checkoutDeliveryModesFacade = TestBed.inject(CheckoutDeliveryModesFacade);
    store = TestBed.inject(Store);
    userIdService = TestBed.inject(UserIdService);
    activeCartService = TestBed.inject(ActiveCartService);
    checkoutConfigService = TestBed.inject(FSCheckoutConfigService);
    routingService = TestBed.inject(RoutingService);
    orderAdapter = TestBed.inject(OrderAdapter);
    spyOn(checkoutDeliveryModesFacade, 'setDeliveryMode').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should check if FSCheckoutService is injected', inject(
    [FSCheckoutService],
    (fsCheckoutService: FSCheckoutService) => {
      expect(fsCheckoutService).toBeTruthy();
    }
  ));

  it('should set identification type', () => {
    service.setIdentificationType(
      activeCartCode,
      OCC_USER_ID_CURRENT,
      identificationType
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromFSAction.SetIdentificationType({
        identificationType: identificationType,
        cartId: activeCartCode,
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
    expect(checkoutDeliveryModesFacade.setDeliveryMode).toHaveBeenCalled();
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

  it('should set legal information', () => {
    service.setLegalInformation();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SetLegalInformationSuccess({
        legalInformation: true,
      })
    );
  });

  it('should be able to get the legal information', () => {
    store.dispatch(
      new fromFSAction.SetLegalInformationSuccess({
        legalInformation: true,
      })
    );

    let isLegalInformationSet: boolean;
    service
      .getLegalInformation()
      .subscribe(data => {
        isLegalInformationSet = data;
      })
      .unsubscribe();
    expect(isLegalInformationSet).toBe(true);
  });

  it('should get legal information', () => {
    service.setLegalInformation();

    expect(store.dispatch).toHaveBeenCalledWith(
      new fromAction.SetLegalInformationSuccess({
        legalInformation: true,
      })
    );
  });

  it('should start checkout for product when initial step is category based', () => {
    service.startCheckoutForProduct(mockProduct);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: mockInitialStep.routeName,
      params: { code: mockProduct.defaultCategory.code },
    });
  });

  it('should start checkout for product', () => {
    const productConfigureStep = {
      id: 'productConfigureStep',
      routeName: 'productConfigure',
      name: 'Mock product configuration step',
      type: [],
    };
    spyOn(checkoutConfigService, 'getInitialStepForCategory').and.returnValue(
      productConfigureStep
    );
    service.startCheckoutForProduct(mockProduct);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: productConfigureStep.routeName,
      params: { code: mockProduct.code },
    });
  });

  it('should place order', () => {
    spyOn(orderAdapter, 'placeOrder').and.callThrough();
    service.placeOrder(true);
    service.placedOrder
      .subscribe(_ => {
        expect(orderAdapter.placeOrder).toHaveBeenCalled();
      })
      .unsubscribe();
  });
});
