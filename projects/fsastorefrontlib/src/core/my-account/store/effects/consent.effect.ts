import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import * as fromActions from '../actions';
import { ConsentConnector } from '../../connectors/consent.connector';
import {
  CartActions,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';

@Injectable()
export class ConsentEffects {
  constructor(
    private actions$: Actions,
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService,
    private consentConnector: ConsentConnector
  ) {}

  loadConsents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CONSENTS),
      map((action: fromActions.LoadConsents) => action.payload),
      switchMap(payload => {
        return this.consentConnector.getConsents(payload.userId).pipe(
          map((consents: any) => {
            return new fromActions.LoadConsentsSuccess(consents);
          }),
          catchError(error =>
            of(new fromActions.LoadConsentsFail(JSON.stringify(error)))
          )
        );
      })
    )
  );

  createAddressForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_ADDRESS),
      map((action: fromActions.CreateAddress) => action.payload),
      mergeMap(payload => {
        return this.consentConnector
          .createAddressForUser(
            payload.userId,
            payload.oboCustomerId,
            payload.address
          )
          .pipe(
            map((data: any) => {
              return new fromActions.CreateAddressSuccess(data);
            }),
            catchError(error =>
              of(new fromActions.CreateAddressFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  transferCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.TRANSFER_CART),
      map((action: fromActions.TransferCart) => action.payload),
      concatMap(payload => {
        return this.consentConnector
          .transferCart(
            payload.cart.code,
            payload.consentHolder.uid,
            payload.oboCustomer.uid
          )
          .pipe(
            switchMap(() => {
              this.routingService.go({
                cxRoute: 'home',
              });
              this.globalMessageService.add(
                {
                  key: 'quote.transferCartSuccess',
                  params: {
                    customer: payload.oboCustomer.name,
                  },
                },
                GlobalMessageType.MSG_TYPE_CONFIRMATION
              );
              return [
                new fromActions.TransferCartSuccess(),
                new CartActions.RemoveCart({ cartId: payload.cart.code }),
              ];
            }),
            catchError(error =>
              of(new fromActions.TransferCartFail(JSON.stringify(error)))
            )
          );
      })
    )
  );
}
