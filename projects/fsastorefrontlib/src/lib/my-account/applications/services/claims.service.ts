import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, filter } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Store, select } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { ClaimDataService, ANONYMOUS_USERID } from './claim-data.service';
import * as fromSelector from '../store/selectors';
import { OccConfig } from '@spartacus/core';
import { AuthService } from '@spartacus/storefront';

const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class ClaimsService {
  callback: Function;

  constructor(
    protected http: HttpClient,
    protected config: OccConfig,
    private store: Store<fromReducer.ClaimState>,
    private claimData: ClaimDataService,
    protected auth: AuthService
  ) {
    this.initClaims();
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

  initClaims() {
    this.store.pipe(select(fromSelector.getActiveClaims)).subscribe(claims => {
      this.claimData.claims = claims;
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.auth.userToken$.subscribe(userData => {
      this.claimData.userId = userData.userId;
      if (this.claimData.userId !== ANONYMOUS_USERID) {
        this.store.dispatch(
          new fromAction.LoadClaims({
            userId: this.claimData.userId
          })
        );
      }
    });

    this.store.pipe(select(fromSelector.getRefresh)).subscribe(refresh => {
      if (refresh) {
        this.store.dispatch(
          new fromAction.LoadClaims({
            userId: this.claimData.userId
          })
        );
      }
    });
  }
}
