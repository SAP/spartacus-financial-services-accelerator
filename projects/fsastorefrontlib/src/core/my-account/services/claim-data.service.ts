import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService, OCC_USER_ID_ANONYMOUS } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { Claim } from '../../../occ/occ-models';
import { StateWithMyAccount } from '../store/my-account-state';
import * as fromClaimStore from '../store/selectors';

export interface SelectedPolicy {
  userId: string;
  policyId: string;
  contractId: string;
}

@Injectable()
export class ClaimDataService {
  private _userId = OCC_USER_ID_ANONYMOUS;
  private _claims: Claim[];
  private _claimData: Claim;

  constructor(
    protected store: Store<StateWithMyAccount>,
    protected auth: AuthService
  ) {
    this.auth
      .getUserToken()
      .pipe(filter(userToken => this.userId !== userToken.userId))
      .subscribe(userToken => {
        if (Object.keys(userToken).length !== 0) {
          this.userId = userToken.userId;
        } else {
          this.userId = OCC_USER_ID_ANONYMOUS;
        }
      });
    this.store
      .pipe(select(fromClaimStore.getClaimContent))
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
