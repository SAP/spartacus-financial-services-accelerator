import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CheckoutConnector } from '../../connectors/checkout.connector';
import * as fromActions from '../actions/checkout.action';

@Injectable()
export class CheckoutEffects {
  setIdentificationType$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.SET_IDENTIFICATION_TYPE),
      map((action: fromActions.SetIdentificationType) => action.payload),
      switchMap(payload => {
        return this.checkoutConnector
          .setIdentificationType(
            payload.identificationType,
            payload.cartId,
            payload.userId
          )
          .pipe(
            map((cart: any) => {
              return new fromActions.SetIdentificationTypeSuccess(cart);
            }),
            catchError(error =>
              of(
                new fromActions.SetIdentificationTypeFail(JSON.stringify(error))
              )
            )
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private checkoutConnector: CheckoutConnector
  ) {}
}
