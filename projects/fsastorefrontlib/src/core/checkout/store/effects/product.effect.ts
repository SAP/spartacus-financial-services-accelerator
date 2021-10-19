import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  GlobalMessageService,
  GlobalMessageType,
  ProductActions,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, timeout } from 'rxjs/operators';
import { ProductPricingConnector } from '../../../product-pricing/connectors/product-pricing.connector';
import * as fromActions from '../actions/index';

@Injectable()
export class ProductEffect {
  
  getCalculatedProductData$: Observable<any> = createEffect(() => this.actions$.pipe(
    ofType(fromActions.LOAD_CALCULATED_PRODUCT_DATA),
    map((action: fromActions.LoadCalculatedProductData) => action.payload),
    mergeMap(payload => {
      return this.productPricingConnector
        .getCalculatedProductData(payload.productCode, payload.pricingData)
        .pipe(
          timeout(30000),
          map((product: any) => {
            return new ProductActions.LoadProductSuccess(product);
          }),
          catchError(error => {
            this.showGlobalMessage(
              'fscommon.priceCalculationError',
              GlobalMessageType.MSG_TYPE_ERROR
            );
            return of(
              new ProductActions.LoadProductFail(payload.productCode, error)
            );
          })
        );
    })
  ));

  private showGlobalMessage(text: string, messageType: GlobalMessageType) {
    this.globalMessageService.remove(messageType);
    this.globalMessageService.add({ key: text }, messageType);
  }

  constructor(
    private actions$: Actions,
    private productPricingConnector: ProductPricingConnector,
    private globalMessageService: GlobalMessageService
  ) {}
}
