import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { PolicyDataService } from '../../services/policy-data.service';
import { OccPolicyService } from '../../../../occ/policy/policy.service';
import { CartDataService, OccCartService, ProductImageConverterService } from '@spartacus/core';
import { OccFSCartService } from 'projects/fsastorefrontlib/src/lib/occ/cart/fscart.service';

@Injectable()
export class FSCartEffects {
  @Effect()
  addOptionalProduct$: Observable<any> =
  this.actions$.pipe(
    ofType(fromActions.ADD_OPTIONAL_PRODUCT),
    map((action: fromActions.AddOptionalProduct) => action.payload),
    switchMap(payload => {
      console.log(payload);
      return this.occCartService
        .addToCart(payload.userId, payload.cartId, payload.productCode, payload.quantity)
        .pipe(
            map((cart: any) => {
              return new fromActions.AddOptionalProductSuccess(cart);
            }),
            catchError(error => of(new fromActions.AddOptionalProductFail(error)))
          );
    })
  );
  
  constructor(
    private actions$: Actions,
    private productImageConverter: ProductImageConverterService,
    private occCartService: OccFSCartService,
    private cartData: CartDataService
  ) {}

  private isMissingData(payload) {
    return payload.userId === undefined || payload.cartId === undefined;
  }
}
