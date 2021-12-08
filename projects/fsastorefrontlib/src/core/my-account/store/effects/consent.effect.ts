import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { ConsentConnector } from '../../connectors/consent.connector';

@Injectable()
export class ConsentEffects {
  constructor(
    private actions$: Actions,
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

  loadCustomerQuotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_CUSTOMER_QUOTES),
      map((action: fromActions.LoadCustomerQuotes) => action.payload),
      switchMap(payload => {
        return this.consentConnector
          .getQuotesForOBOCustomer(payload.userId, payload.customerId)
          .pipe(
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
        return this.consentConnector
          .getPoliciesForOBOCustomer(payload.userId, payload.customerId)
          .pipe(
            map((customerPolicies: any) => {
              return new fromActions.LoadCustomerPoliciesSuccess(
                customerPolicies
              );
            }),
            catchError(error =>
              of(
                new fromActions.LoadCustomerPoliciesFail(JSON.stringify(error))
              )
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
        return this.consentConnector
          .getClaimsForOBOCustomer(payload.userId, payload.customerId)
          .pipe(
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
}
