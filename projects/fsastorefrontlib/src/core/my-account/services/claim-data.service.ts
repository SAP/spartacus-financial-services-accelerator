import { Injectable } from '@angular/core';
import { Claim } from '../../../occ/occ-models';
import { AuthService } from '@spartacus/core';
import { Store, select } from '@ngrx/store';
import * as fromReducer from '../store/reducers';
import * as fromClaimStore from '../../../core/my-account/store/selectors';

export interface SelectedPolicy {
  userId: string;
  policyId: string;
  contractId: string;
}

@Injectable()
export class ClaimDataService {
  private _userId;
  private _claims: Claim[];
  private _claimData: Claim;

  constructor(
    protected store: Store<fromReducer.UserState>,
    protected auth: AuthService
  ) {
    this.auth.getUserToken().subscribe(userData => {
      if (this.userId !== userData.userId) {
        this.userId = userData.userId;
      }
    });
    this.store
      .pipe(select(fromClaimStore.getClaimsContent))
      .subscribe(claimData => {
        this._claimData = claimData;
      });
  }

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  get claimData(): Claim {
    return this._claimData;
  }

  set claims(val: Claim[]) {
    this._claims = val;
  }

  get claims(): Claim[] {
    return this._claims;
  }
}
