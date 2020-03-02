import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import * as fromActions from '../actions';
import * as fromEffects from './fs-checkout.effect';
import { FsCheckoutConnector } from '../../connectors';

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

describe('FS Checkout Effects', () => {
  let actions$: Observable<fromActions.SetIdentificationType>;
  let effects: fromEffects.FSCheckoutEffects;
  let mockCheckoutConnector: MockCheckoutConnector;

  beforeEach(() => {
    mockCheckoutConnector = new MockCheckoutConnector();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: FsCheckoutConnector, useValue: mockCheckoutConnector },
        fromEffects.FSCheckoutEffects,
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.get(fromEffects.FSCheckoutEffects as Type<
      fromEffects.FSCheckoutEffects
    >);
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
