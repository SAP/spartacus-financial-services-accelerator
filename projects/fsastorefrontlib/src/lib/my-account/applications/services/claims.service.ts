import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAction from '../store/actions';
import * as fromReducer from '../store/reducers';
import { ClaimDataService, ANONYMOUS_USERID } from './claim-data.service';
import * as fromSelector from '../store/selectors';
import { AuthService } from '@spartacus/storefront';


@Injectable()
export class ClaimsService {
  callback: Function;

  constructor(
    private store: Store<fromReducer.ClaimState>,
    private claimData: ClaimDataService,
    protected auth: AuthService
  ) {
    this.initClaims();
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
      if(claims)
      this.claimData.claims = claims;
      if (this.callback) {
        this.callback();
        this.callback = null;
      }
    });

    this.auth.userToken$.subscribe(userData => {
      if (this.claimData.userId !== userData.userId) {
        this.claimData.userId = userData.userId;
        this.store.dispatch(
          new fromAction.LoadClaims({
            userId: this.claimData.userId,
          })
        );
      }
    });

    this.store.pipe(select(fromSelector.getRefresh)).subscribe(refresh => {
      console.log('refresh');
      if (refresh) {
        this.store.dispatch(
          new fromAction.LoadClaims({
            userId: this.claimData.userId
          })
        );
      }
    });
  }

  loadClaims() {
      this.store.dispatch(
        new fromAction.LoadClaims({
          userId: this.claimData.userId,
        })
      );
    }
}
