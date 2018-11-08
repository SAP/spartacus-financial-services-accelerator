import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Store } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
//import { ClaimDataService } from './claim-data.service';
// import { ANONYMOUS_USERID } from '../../../cart/services/cart-data.service';
import { OccConfig } from '@spartacus/core';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class ClaimsService {

  constructor(
    protected http: HttpClient,
    protected config: OccConfig,
    private store: Store<fromReducer.ClaimState>,
    //private claimData: ClaimDataService
  ) {
    //this.initClaims();
  }

  protected getClaimsEndpoint(userId: string) {
    const claimsEndpoint = '/users/' + userId + '/claims';
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      claimsEndpoint
    );
  }

  public getClaims(userId: string): Observable<any> {
    const url = this.getClaimsEndpoint(userId);
    const params = new HttpParams({ fromString: FULL_PARAMS });

    return this.http
      .get(url, { params: params })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public deleteClaim(userId: string, claimId: string) {
    const url = this.getClaimsEndpoint(userId) + '/' + claimId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeClaim(userId: string, claimId: string) {
    this.store.dispatch(
      new fromAction.DeleteClaim({
        userId: userId,
        claimId: claimId
      })
    );
  }

  // initClaims() {
  //   if (this.claimData.userId !== ANONYMOUS_USERID) {
  //     this.store.dispatch(
  //       new fromAction.LoadClaims({
  //         userId: this.claimData.userId,
  //         claims: this.claimData.claims
  //       })
  //     );
  //   }
  // }
}
