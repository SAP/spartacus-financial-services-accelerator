import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as fromCartActions from '@spartacus/core';
import { CartDataService } from '@spartacus/core';
import {OccFSCartService} from '../../../../occ/cart/fscart.service';
import * as fromActions from '../../../../checkout/assets/store/actions/index';

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
            return new fromCartActions.AddEntrySuccess(entry);
          }),
          catchError(error => of(new fromCartActions.AddEntryFail(error)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private occCartService: OccFSCartService,
    private cartData: CartDataService
  ) {}
}

