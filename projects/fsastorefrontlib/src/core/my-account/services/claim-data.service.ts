import { Injectable } from '@angular/core';
import { Claim } from '../../../occ/occ-models';
import { AuthService } from '@spartacus/core';

export interface SelectedPolicy {
  userId: string;
  policyId: string;
  contractId: string;
}

@Injectable()
export class ClaimDataService {
  private _userId;
  private _claims: Claim[];

  constructor(protected auth: AuthService) {
    this.auth.getUserToken().subscribe(userData => {
      if (this.userId !== userData.userId) {
        this.userId = userData.userId;
      }
    });
  }

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  set claims(val: Claim[]) {
    this._claims = val;
  }

  get claims(): Claim[] {
    return this._claims;
  }
}
