import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions/fs-checkout.action';
import { OccFSCheckoutService } from '../../../../occ/checkout/fs-checkout.service';

@Injectable()
export class FSCheckoutEffects {

  @Effect()
  setIdentificationType$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.SET_IDENTIFICATION_TYPE),
    map((action: fromActions.SetIdentificationType) => action.payload),
    switchMap(payload => {
      return this.occCheckoutService
        .setIdentificationType(payload.identificationType, payload.cartId, payload.userId)
        .pipe(
          map((cart: any) => {
            return new fromActions.SetIdentificationTypeSuccess(cart);
          })
          , catchError(error => of(new fromActions.SetIdentificationTypeFail(JSON.stringify(error))))
        );
    })
  );

constructor(
  private actions$: Actions,
  private occCheckoutService: OccFSCheckoutService,
) { }

}
