import { Injectable } from '@angular/core';
import { Claim } from '../../../occ-models';

export interface SelectedPolicy {
  userId: string;
  policyId: string;
  contractId: string;
}

@Injectable()
export class ClaimDataService {
  private _userId = 'anonymous';
  private _claims: Claim[];

  constructor() {}

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
