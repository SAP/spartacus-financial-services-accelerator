import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { CheckoutConnector } from '../../connectors';
import * as fromActions from '../actions';
import * as fromEffects from './checkout.effect';

const cartId = 'cartId';
const identificationType = 'videoIdentification';

const cart = {
  cartId: cartId,
};

class MockCheckoutConnector {
  setIdentificationType() {
    return of(cart);
  }
}

describe('Checkout Effects', () => {
  let actions$: Observable<fromActions.SetIdentificationType>;
  let effects: fromEffects.CheckoutEffects;
  let mockCheckoutConnector: MockCheckoutConnector;

  beforeEach(() => {
    mockCheckoutConnector = new MockCheckoutConnector();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: CheckoutConnector, useValue: mockCheckoutConnector },
        fromEffects.CheckoutEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(
      fromEffects.CheckoutEffects as Type<fromEffects.CheckoutEffects>
    );
  });

  describe('setIdentificationType$', () => {
    it('should set user identification type', () => {
      const action = new fromActions.SetIdentificationType({
        cartId: cartId,
        userId: OCC_USER_ID_CURRENT,
        identificationType: identificationType,
      });

      const completion = new fromActions.SetIdentificationTypeSuccess(cart);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.setIdentificationType$).toBeObservable(expected);
    });

    it('should fail to set user identification type', () => {
      spyOn(mockCheckoutConnector, 'setIdentificationType').and.returnValue(
        throwError('Error')
      );
      const action = new fromActions.SetIdentificationType({
        cartId: cartId,
        userId: OCC_USER_ID_CURRENT,
        identificationType: identificationType,
      });

      const completion = new fromActions.SetIdentificationTypeFail(
        JSON.stringify('Error')
      );

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.setIdentificationType$).toBeObservable(expected);
    });
  });
});
