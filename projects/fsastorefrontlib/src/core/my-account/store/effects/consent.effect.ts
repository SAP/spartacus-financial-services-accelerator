import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  CartActions,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import {
  ClaimConnector,
  ConsentConnector,
  PolicyConnector,
  QuoteConnector,
} from '../../connectors';
import { ConsentService } from '../../facade/consent.service';
import * as fromActions from '../actions';

@Injectable()
export class ConsentEffects {
  constructor(
    private actions$: Actions,
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService,
    private consentConnector: ConsentConnector,
    private quoteConnector: QuoteConnector,
    private policyConnector: PolicyConnector,
    private claimConnector: ClaimConnector,
    private fsConsentService: ConsentService
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

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CUSTOMER),
      map((action: fromActions.LoadCustomer) => action.payload),
      switchMap(payload => {
        return this.consentConnector
          .getOBOCustomer(payload.userId, payload.customerId)
          .pipe(
            map((customer: any) => {
              return new fromActions.LoadCustomerSuccess(customer);
            }),
            catchError(error =>
              of(new fromActions.LoadCustomerFail(JSON.stringify(error)))
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
              this.fsConsentService.setUserAddressAdded(true);
              return new fromActions.CreateAddressSuccess(data);
            }),
            catchError(error =>
              of(new fromActions.CreateAddressFail(JSON.stringify(error)))
            )
          );
      })
    )
  );

  loadCustomerQuotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CUSTOMER_QUOTES),
      map((action: fromActions.LoadCustomerQuotes) => action.payload),
      switchMap(payload => {
        return this.quoteConnector.getQuotes(payload.customerId).pipe(
          map((customerQuotes: any) => {
            return new fromActions.LoadCustomerQuotesSuccess(customerQuotes);
          }),
          catchError(error =>
            of(new fromActions.LoadCustomerQuotesFail(JSON.stringify(error)))
          )
        );
      })
    )
  );

  loadCustomerPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CUSTOMER_POLICIES),
      map((action: fromActions.LoadCustomerPolicies) => action.payload),
      switchMap(payload => {
        return this.policyConnector.getPolicies(payload.customerId).pipe(
          map((customerPolicies: any) => {
            return new fromActions.LoadCustomerPoliciesSuccess(
              customerPolicies
            );
          }),
          catchError(error =>
            of(new fromActions.LoadCustomerPoliciesFail(JSON.stringify(error)))
          )
        );
      })
    )
  );

  loadCustomerClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CUSTOMER_CLAIMS),
      map((action: fromActions.LoadCustomerClaims) => action.payload),
      switchMap(payload => {
        return this.claimConnector.getClaims(payload.customerId).pipe(
          map((customerClaims: any) => {
            return new fromActions.LoadCustomerClaimsSuccess(customerClaims);
          }),
          catchError(error =>
            of(new fromActions.LoadCustomerClaimsFail(JSON.stringify(error)))
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
            payload.oboCustomer
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
                    customer: payload.oboCustomer,
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
