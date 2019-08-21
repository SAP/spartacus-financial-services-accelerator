import { Injectable } from '@angular/core';
import { Policy } from '../store/reducers/policy.reducer';

@Injectable()
export class PolicyDataService {
  private _userId = 'anonymous';
  private _claimsCategoryCode: string;
  private _policies: Policy[];

  constructor() { }

  set userId(val) {
    this._userId = val;
  }
  get userId(): string {
    return this._userId;
  }

  set claimsCategoryCode(val) {
    this._claimsCategoryCode = val;
  }
  get claimsCategoryCode(): string {
    return this._claimsCategoryCode;
  }

  set policies(val: Policy[]) {
    this._policies = val;
  }
  get policies(): Policy[] {
    return this._policies;
  }
}
