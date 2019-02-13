import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartDataService, ProductImageConverterService } from '@spartacus/core';
import { OccFSCartService } from 'projects/fsastorefrontlib/src/lib/occ/cart/fscart.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from './../actions';

@Injectable()
export class FSCartEffects {
  @Effect()
  addOptionalProduct$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ADD_OPTIONAL_PRODUCT),
    map((action: fromActions.AddOptionalProduct) => action.payload),
    switchMap(payload => {
      return this.occCartService
        .addToCart(payload.userId, payload.cartId, payload.productCode, payload.quantity)
        .pipe(
          map((entry: any) => {
            return new fromActions.AddOptionalProductSuccess(entry);
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
